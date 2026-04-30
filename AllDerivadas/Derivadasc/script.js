const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const state = {
  completed: new Set(JSON.parse(localStorage.getItem("derivativeProgress") || "[]")),
  derivativeAst: null,
  derivativeSource: ""
};

const examples = [
  { input: "x^3 - 2*x + sin(x)" },
  { input: "cos(x^2)" },
  { input: "(x^2 + 1)/x" },
  { input: "ln(x)*sqrt(x)" }
];

const quizzes = [
  {
    title: "Regla de potencia",
    question: "¿Cuál es la derivada de x^5?",
    options: ["5*x^4", "x^4", "4*x^5"],
    answer: 0,
    feedback: "Baja el exponente y réstale 1: d/dx[x^n]=n*x^(n-1)."
  },
  {
    title: "Producto",
    question: "Si y=x^2 sin(x), ¿cuál fórmula se usa?",
    options: ["u'v + uv'", "u'/v'", "f'(g(x))"],
    answer: 0,
    feedback: "Es un producto entre x^2 y sin(x)."
  },
  {
    title: "Cadena",
    question: "d/dx[sin(3x)] es:",
    options: ["cos(3x)", "3cos(3x)", "-3sin(3x)"],
    answer: 1,
    feedback: "Deriva la externa y multiplica por la derivada de 3x."
  },
  {
    title: "Trigonometría inversa",
    question: "d/dx[arctan(x)] es:",
    options: ["1/(1+x^2)", "1/sqrt(1-x^2)", "-1/sqrt(1-x^2)"],
    answer: 0,
    feedback: "arctan(x) tiene una derivada definida para todo x real."
  },
  {
    title: "Implícita",
    question: "Al derivar y^2 respecto a x se obtiene:",
    options: ["2y", "2y*y'", "y'"],
    answer: 1,
    feedback: "Como y depende de x, aparece y' por regla de la cadena."
  },
  {
    title: "Logarítmica",
    question: "Para y=x^x, después de tomar ln queda:",
    options: ["ln(y)=x ln(x)", "y'=x", "ln(y)=ln(x)/x"],
    answer: 0,
    feedback: "La propiedad ln(a^b)=b ln(a) simplifica el exponente variable."
  }
];

class Parser {
  constructor(input) {
    this.input = input.replace(/\s+/g, "").replace(/arcsin/g, "asin").replace(/arccos/g, "acos").replace(/arctan/g, "atan").replace(/log/g, "ln");
    this.pos = 0;
  }

  parse() {
    const expression = this.parseExpression();
    if (this.pos < this.input.length) throw new Error(`No se pudo leer desde "${this.input.slice(this.pos)}".`);
    return expression;
  }

  peek() {
    return this.input[this.pos];
  }

  consume(char) {
    if (this.input[this.pos] === char) {
      this.pos += 1;
      return true;
    }
    return false;
  }

  parseExpression() {
    let node = this.parseTerm();
    while (this.peek() === "+" || this.peek() === "-") {
      const op = this.input[this.pos++];
      const right = this.parseTerm();
      node = { type: op === "+" ? "add" : "sub", left: node, right };
    }
    return node;
  }

  parseTerm() {
    let node = this.parsePower();
    while (this.peek() === "*" || this.peek() === "/") {
      const op = this.input[this.pos++];
      const right = this.parsePower();
      node = { type: op === "*" ? "mul" : "div", left: node, right };
    }
    return node;
  }

  parsePower() {
    let node = this.parseUnary();
    if (this.consume("^")) {
      node = { type: "pow", left: node, right: this.parsePower() };
    }
    return node;
  }

  parseUnary() {
    if (this.consume("+")) return this.parseUnary();
    if (this.consume("-")) return { type: "neg", value: this.parseUnary() };
    return this.parsePrimary();
  }

  parsePrimary() {
    if (this.consume("(")) {
      const node = this.parseExpression();
      if (!this.consume(")")) throw new Error("Falta cerrar un paréntesis.");
      return node;
    }

    const number = this.match(/^\d+(\.\d+)?/);
    if (number) return { type: "num", value: Number(number) };

    const name = this.match(/^[a-zA-Z]+/);
    if (name) {
      if (name === "x") return { type: "var" };
      if (name === "pi") return { type: "num", value: Math.PI, label: "pi" };
      if (name === "e") return { type: "num", value: Math.E, label: "e" };
      if (!this.consume("(")) throw new Error(`La función ${name} necesita paréntesis.`);
      const argument = this.parseExpression();
      if (!this.consume(")")) throw new Error(`Falta cerrar ${name}(...).`);
      return { type: "func", name, argument };
    }

    throw new Error("Escribe una función válida, por ejemplo x^2 + sin(x).");
  }

  match(regex) {
    const found = this.input.slice(this.pos).match(regex);
    if (!found) return "";
    this.pos += found[0].length;
    return found[0];
  }
}

const ast = {
  num: (value, label = "") => ({ type: "num", value, label }),
  variable: () => ({ type: "var" }),
  add: (left, right) => simplify({ type: "add", left, right }),
  sub: (left, right) => simplify({ type: "sub", left, right }),
  mul: (left, right) => simplify({ type: "mul", left, right }),
  div: (left, right) => simplify({ type: "div", left, right }),
  pow: (left, right) => simplify({ type: "pow", left, right }),
  neg: (value) => simplify({ type: "neg", value }),
  func: (name, argument) => simplify({ type: "func", name, argument })
};

function isNum(node, value = null) {
  return node.type === "num" && (value === null || Math.abs(node.value - value) < 1e-12);
}

function simplify(node) {
  if (node.type === "add" || node.type === "sub" || node.type === "mul" || node.type === "div" || node.type === "pow") {
    node.left = simplify(node.left);
    node.right = simplify(node.right);
  }
  if (node.type === "neg") node.value = simplify(node.value);
  if (node.type === "func") node.argument = simplify(node.argument);

  if (node.type === "add") {
    if (isNum(node.left, 0)) return node.right;
    if (isNum(node.right, 0)) return node.left;
    if (isNum(node.left) && isNum(node.right)) return ast.num(node.left.value + node.right.value);
  }
  if (node.type === "sub") {
    if (isNum(node.right, 0)) return node.left;
    if (isNum(node.left) && isNum(node.right)) return ast.num(node.left.value - node.right.value);
  }
  if (node.type === "mul") {
    if (isNum(node.left, 0) || isNum(node.right, 0)) return ast.num(0);
    if (isNum(node.left, 1)) return node.right;
    if (isNum(node.right, 1)) return node.left;
    if (isNum(node.left) && isNum(node.right)) return ast.num(node.left.value * node.right.value);
  }
  if (node.type === "div") {
    if (isNum(node.left, 0)) return ast.num(0);
    if (isNum(node.right, 1)) return node.left;
    if (isNum(node.left) && isNum(node.right)) return ast.num(node.left.value / node.right.value);
  }
  if (node.type === "pow") {
    if (isNum(node.right, 0)) return ast.num(1);
    if (isNum(node.right, 1)) return node.left;
    if (isNum(node.left) && isNum(node.right)) return ast.num(Math.pow(node.left.value, node.right.value));
  }
  if (node.type === "neg") {
    if (isNum(node.value)) return ast.num(-node.value.value);
  }
  return node;
}

function derive(node, steps = []) {
  switch (node.type) {
    case "num":
      steps.push("La derivada de una constante es 0.");
      return ast.num(0);
    case "var":
      steps.push("La derivada de x es 1.");
      return ast.num(1);
    case "neg":
      return ast.neg(derive(node.value, steps));
    case "add":
      steps.push("Regla de la suma: se deriva cada término por separado.");
      return ast.add(derive(node.left, steps), derive(node.right, steps));
    case "sub":
      steps.push("Regla de la resta: se deriva cada término por separado.");
      return ast.sub(derive(node.left, steps), derive(node.right, steps));
    case "mul":
      steps.push("Regla del producto: (uv)' = u'v + uv'.");
      return ast.add(ast.mul(derive(node.left, steps), node.right), ast.mul(node.left, derive(node.right, steps)));
    case "div":
      steps.push("Regla del cociente: (u/v)' = (u'v - uv') / v^2.");
      return ast.div(ast.sub(ast.mul(derive(node.left, steps), node.right), ast.mul(node.left, derive(node.right, steps))), ast.pow(node.right, ast.num(2)));
    case "pow":
      return derivePower(node, steps);
    case "func":
      return deriveFunction(node, steps);
    default:
      throw new Error("No se reconoció parte de la expresión.");
  }
}

function derivePower(node, steps) {
  if (node.right.type === "num") {
    steps.push(`Regla de potencia: d/dx[u^n] = n*u^(n-1)*u', con n=${formatNumber(node.right.value)}.`);
    return ast.mul(ast.mul(ast.num(node.right.value), ast.pow(node.left, ast.num(node.right.value - 1))), derive(node.left, steps));
  }
  steps.push("Potencia general: d/dx[u^v] = u^v * (v'ln(u) + v*u'/u).");
  return ast.mul(
    node,
    ast.add(
      ast.mul(derive(node.right, steps), ast.func("ln", node.left)),
      ast.mul(node.right, ast.div(derive(node.left, steps), node.left))
    )
  );
}

function deriveFunction(node, steps) {
  const u = node.argument;
  const du = derive(u, steps);
  const chain = (outer, description) => {
    steps.push(`${description} y regla de la cadena.`);
    return ast.mul(outer, du);
  };

  switch (node.name) {
    case "sin":
      return chain(ast.func("cos", u), "d/dx[sin(u)] = cos(u)u'");
    case "cos":
      return chain(ast.neg(ast.func("sin", u)), "d/dx[cos(u)] = -sin(u)u'");
    case "tan":
      return chain(ast.pow(ast.func("sec", u), ast.num(2)), "d/dx[tan(u)] = sec(u)^2u'");
    case "sec":
      return chain(ast.mul(ast.func("sec", u), ast.func("tan", u)), "d/dx[sec(u)] = sec(u)tan(u)u'");
    case "csc":
      return chain(ast.neg(ast.mul(ast.func("csc", u), ast.func("cot", u))), "d/dx[csc(u)] = -csc(u)cot(u)u'");
    case "cot":
      return chain(ast.neg(ast.pow(ast.func("csc", u), ast.num(2))), "d/dx[cot(u)] = -csc(u)^2u'");
    case "asin":
      return chain(ast.div(ast.num(1), ast.func("sqrt", ast.sub(ast.num(1), ast.pow(u, ast.num(2))))), "d/dx[arcsin(u)] = u'/sqrt(1-u^2)");
    case "acos":
      return chain(ast.neg(ast.div(ast.num(1), ast.func("sqrt", ast.sub(ast.num(1), ast.pow(u, ast.num(2)))))), "d/dx[arccos(u)] = -u'/sqrt(1-u^2)");
    case "atan":
      return chain(ast.div(ast.num(1), ast.add(ast.num(1), ast.pow(u, ast.num(2)))), "d/dx[arctan(u)] = u'/(1+u^2)");
    case "ln":
      return chain(ast.div(ast.num(1), u), "d/dx[ln(u)] = u'/u");
    case "sqrt":
      return chain(ast.div(ast.num(1), ast.mul(ast.num(2), ast.func("sqrt", u))), "d/dx[sqrt(u)] = u'/(2sqrt(u))");
    case "exp":
      return chain(ast.func("exp", u), "d/dx[exp(u)] = exp(u)u'");
    default:
      throw new Error(`La calculadora todavía no deriva ${node.name}(...).`);
  }
}

function evaluate(node, x) {
  switch (node.type) {
    case "num":
      return node.value;
    case "var":
      return x;
    case "neg":
      return -evaluate(node.value, x);
    case "add":
      return evaluate(node.left, x) + evaluate(node.right, x);
    case "sub":
      return evaluate(node.left, x) - evaluate(node.right, x);
    case "mul":
      return evaluate(node.left, x) * evaluate(node.right, x);
    case "div":
      return evaluate(node.left, x) / evaluate(node.right, x);
    case "pow":
      return Math.pow(evaluate(node.left, x), evaluate(node.right, x));
    case "func": {
      const value = evaluate(node.argument, x);
      const fns = {
        sin: Math.sin,
        cos: Math.cos,
        tan: Math.tan,
        asin: Math.asin,
        acos: Math.acos,
        atan: Math.atan,
        ln: Math.log,
        sqrt: Math.sqrt,
        exp: Math.exp,
        sec: (n) => 1 / Math.cos(n),
        csc: (n) => 1 / Math.sin(n),
        cot: (n) => 1 / Math.tan(n)
      };
      return fns[node.name](value);
    }
    default:
      return NaN;
  }
}

function toString(node, parent = "") {
  const wrap = (text, needs) => needs ? `(${text})` : text;
  switch (node.type) {
    case "num":
      return node.label || formatNumber(node.value);
    case "var":
      return "x";
    case "neg":
      return `-${toString(node.value, "neg")}`;
    case "add":
      return wrap(`${toString(node.left, "add")} + ${toString(node.right, "add")}`, parent === "mul" || parent === "div" || parent === "pow");
    case "sub":
      return wrap(`${toString(node.left, "sub")} - ${toString(node.right, "sub")}`, parent === "mul" || parent === "div" || parent === "pow");
    case "mul":
      return wrap(`${toString(node.left, "mul")}*${toString(node.right, "mul")}`, parent === "pow");
    case "div":
      return wrap(`${toString(node.left, "div")}/${toString(node.right, "div")}`, parent === "mul" || parent === "pow");
    case "pow":
      return `${toString(node.left, "pow")}^${toString(node.right, "pow")}`;
    case "func":
      return `${node.name}(${toString(node.argument)})`;
    default:
      return "";
  }
}

function toMathHtml(text) {
  const safe = escapeHtml(text);
  return safe.replace(/\^(\([^()]+\)|-?\d+(\.\d+)?|[a-zA-Z]+)/g, (_, exponent) => {
    const cleanExponent = exponent.startsWith("(") && exponent.endsWith(")")
      ? exponent.slice(1, -1)
      : exponent;
    if (/^[0-9n+\-]+$/.test(cleanExponent)) return toSuperscript(cleanExponent);
    return `<sup>${cleanExponent}</sup>`;
  });
}

function toSuperscript(text) {
  const map = {
    "-": "⁻",
    "+": "⁺",
    "n": "ⁿ",
    "0": "⁰",
    "1": "¹",
    "2": "²",
    "3": "³",
    "4": "⁴",
    "5": "⁵",
    "6": "⁶",
    "7": "⁷",
    "8": "⁸",
    "9": "⁹"
  };
  return [...text].map((char) => map[char] || char).join("");
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatNumber(value) {
  if (Number.isInteger(value)) return String(value);
  return Number(value.toFixed(4)).toString();
}

function drawAxes(ctx, width, height, scaleX, scaleY, originX, originY) {
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = getCss("--line");
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = originX % scaleX; x < width; x += scaleX) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }
  for (let y = originY % scaleY; y < height; y += scaleY) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  ctx.stroke();
  ctx.strokeStyle = getCss("--muted");
  ctx.beginPath();
  ctx.moveTo(0, originY);
  ctx.lineTo(width, originY);
  ctx.moveTo(originX, 0);
  ctx.lineTo(originX, height);
  ctx.stroke();
}

function drawGraph(canvas, callbacks, range = [-5, 5], yRange = [-5, 5]) {
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, rect.width * ratio);
  canvas.height = Math.max(1, rect.height * ratio);
  ctx.scale(ratio, ratio);
  const width = rect.width;
  const height = rect.height;
  const scaleX = width / (range[1] - range[0]);
  const scaleY = height / (yRange[1] - yRange[0]);
  const toScreen = (x, y) => ({
    x: (x - range[0]) * scaleX,
    y: height - (y - yRange[0]) * scaleY
  });

  drawAxes(ctx, width, height, scaleX, scaleY, -range[0] * scaleX, height + yRange[0] * scaleY);

  callbacks.forEach(({ fn, color, width: lineWidth = 3 }) => {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    let active = false;
    for (let px = 0; px <= width; px += 2) {
      const x = range[0] + px / scaleX;
      const y = fn(x);
      const point = toScreen(x, y);
      if (!Number.isFinite(y) || point.y < -height || point.y > height * 2) {
        active = false;
        continue;
      }
      if (!active) {
        ctx.moveTo(point.x, point.y);
        active = true;
      } else {
        ctx.lineTo(point.x, point.y);
      }
    }
    ctx.stroke();
  });
  return { ctx, toScreen };
}

function drawHero() {
  const canvas = $("#heroCanvas");
  const time = Date.now() / 900;
  const pointX = Math.sin(time) * 1.6;
  const graph = drawGraph(canvas, [
    { fn: (x) => 0.18 * x ** 3 - 0.7 * x + 1.1, color: getCss("--blue"), width: 4 }
  ], [-4, 4], [-3, 4]);
  const slope = 0.54 * pointX ** 2 - 0.7;
  const y = 0.18 * pointX ** 3 - 0.7 * pointX + 1.1;
  graph.ctx.strokeStyle = getCss("--rose");
  graph.ctx.lineWidth = 3;
  graph.ctx.beginPath();
  for (let t = -2.2; t <= 2.2; t += 0.1) {
    const x = pointX + t;
    const p = graph.toScreen(x, y + slope * t);
    if (t === -2.2) graph.ctx.moveTo(p.x, p.y);
    else graph.ctx.lineTo(p.x, p.y);
  }
  graph.ctx.stroke();
  const dot = graph.toScreen(pointX, y);
  graph.ctx.fillStyle = getCss("--violet");
  graph.ctx.beginPath();
  graph.ctx.arc(dot.x, dot.y, 7, 0, Math.PI * 2);
  graph.ctx.fill();
  requestAnimationFrame(drawHero);
}

function drawTangent() {
  const slider = $("#tangentSlider");
  const x0 = Number(slider.value);
  $("#tangentOutput").textContent = x0.toFixed(1);
  const graph = drawGraph($("#tangentCanvas"), [
    { fn: (x) => x ** 2, color: getCss("--blue"), width: 4 },
    { fn: (x) => 2 * x0 * (x - x0) + x0 ** 2, color: getCss("--rose"), width: 3 }
  ], [-4, 4], [-2, 10]);
  const dot = graph.toScreen(x0, x0 ** 2);
  graph.ctx.fillStyle = getCss("--violet");
  graph.ctx.beginPath();
  graph.ctx.arc(dot.x, dot.y, 6, 0, Math.PI * 2);
  graph.ctx.fill();
}

function drawFunctionLab() {
  const canvas = $("#functionCanvas");
  if (!state.derivativeAst || !state.derivativeSource) return;
  try {
    const sourceAst = new Parser(state.derivativeSource).parse();
    drawGraph(canvas, [
      { fn: (x) => evaluate(sourceAst, x), color: getCss("--blue"), width: 3 },
      { fn: (x) => evaluate(state.derivativeAst, x), color: getCss("--rose"), width: 3 }
    ], [-6, 6], [-8, 8]);
  } catch {
    drawGraph(canvas, [], [-6, 6], [-8, 8]);
  }
}

function runDerivative() {
  const input = $("#functionInput").value.trim();
  const result = $("#derivativeResult");
  const stepsBox = $("#derivativeSteps");
  try {
    const parsed = new Parser(input).parse();
    const steps = [];
    const derivative = simplify(derive(parsed, steps));
    state.derivativeAst = derivative;
    state.derivativeSource = input;
    result.innerHTML = toMathHtml(toString(derivative));
    stepsBox.innerHTML = steps.slice(0, 8).map((step) => `<li>${toMathHtml(step)}</li>`).join("");
    markComplete("laboratorio");
    drawFunctionLab();
  } catch (error) {
    result.textContent = error.message;
    stepsBox.innerHTML = "<li>Revisa paréntesis, operadores y nombres de funciones.</li>";
    drawGraph($("#functionCanvas"), [], [-6, 6], [-8, 8]);
  }
}

function renderQuizzes() {
  const grid = $("#quizGrid");
  grid.innerHTML = quizzes.map((quiz, quizIndex) => `
    <article class="quiz-card">
      <h3>${quiz.title}</h3>
      <p>${toMathHtml(quiz.question)}</p>
      <div class="quiz-options">
        ${quiz.options.map((option, optionIndex) => `
          <button class="quiz-option" type="button" data-quiz="${quizIndex}" data-option="${optionIndex}">${toMathHtml(option)}</button>
        `).join("")}
      </div>
      <div class="feedback" id="feedback-${quizIndex}" aria-live="polite"></div>
    </article>
  `).join("");
}

function answerQuiz(button) {
  const quizIndex = Number(button.dataset.quiz);
  const optionIndex = Number(button.dataset.option);
  const quiz = quizzes[quizIndex];
  const card = button.closest(".quiz-card");
  card.querySelectorAll(".quiz-option").forEach((item) => {
    item.classList.remove("correct", "incorrect");
    item.disabled = true;
  });
  if (optionIndex === quiz.answer) {
    button.classList.add("correct");
    $(`#feedback-${quizIndex}`).textContent = `Correcto. ${quiz.feedback}`;
    markComplete(`quiz-${quizIndex}`);
  } else {
    button.classList.add("incorrect");
    card.querySelector(`[data-option="${quiz.answer}"]`).classList.add("correct");
    $(`#feedback-${quizIndex}`).textContent = `Casi. ${quiz.feedback}`;
  }
}

function markComplete(id) {
  state.completed.add(id);
  localStorage.setItem("derivativeProgress", JSON.stringify([...state.completed]));
  updateProgress();
}

function updateProgress() {
  const total = $$("[data-progress]").length + quizzes.length;
  const sectionCount = $$("[data-progress]").filter((section) => state.completed.has(section.id)).length;
  const quizCount = quizzes.filter((_, index) => state.completed.has(`quiz-${index}`)).length;
  const percent = Math.round(((sectionCount + quizCount) / total) * 100);
  $("#progressBar").style.width = `${percent}%`;
  $("#progressText").textContent = `${percent}%`;
}

function observeSections() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) markComplete(entry.target.id);
    });
  }, { threshold: 0.45 });
  $$("[data-progress]").forEach((section) => observer.observe(section));
}

function getCss(name) {
  return getComputedStyle(document.body).getPropertyValue(name).trim();
}

function initTheme() {
  const saved = localStorage.getItem("derivativeTheme");
  if (saved === "dark") document.body.classList.add("dark");
  $("#themeIcon").textContent = document.body.classList.contains("dark") ? "☼" : "☾";
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("derivativeTheme", document.body.classList.contains("dark") ? "dark" : "light");
  $("#themeIcon").textContent = document.body.classList.contains("dark") ? "☼" : "☾";
  drawTangent();
  drawFunctionLab();
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderQuizzes();
  updateProgress();
  observeSections();
  drawHero();
  drawTangent();
  runDerivative();

  $("#themeToggle").addEventListener("click", toggleTheme);
  $("#deriveButton").addEventListener("click", runDerivative);
  $("#functionInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") runDerivative();
  });
  $("#tangentSlider").addEventListener("input", drawTangent);
  $$(".solution-button").forEach((button) => {
    button.addEventListener("click", () => $(`#${button.dataset.solution}`).classList.toggle("visible"));
  });
  $("#quizGrid").addEventListener("click", (event) => {
    if (event.target.matches(".quiz-option")) answerQuiz(event.target);
  });
  window.addEventListener("resize", () => {
    drawTangent();
    drawFunctionLab();
  });

  let exampleIndex = 0;
  setInterval(() => {
    const input = $("#functionInput");
    if (document.activeElement !== input) {
      exampleIndex = (exampleIndex + 1) % examples.length;
      input.placeholder = `Prueba: ${examples[exampleIndex].input}`;
    }
  }, 4500);
});
