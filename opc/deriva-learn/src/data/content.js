export const contentData = {
  intro: {
    title: 'Introducción a las Derivadas',
    sections: [
      {
        id: 'intro',
        title: '¿Qué es una derivada?',
        path: '/',
        content: `
## ¿Qué es una derivada?

La **derivada** es uno de los conceptos más fundamentales del cálculo diferencial. Nos permite entender **cómo cambian las cosas** en cada momento específico.

Imagina que estás conduciendo un coche. El velocímetro te indica tu **velocidad instantánea** en ese exacto momento, no la velocidad promedio en un viaje. Eso es exactamente lo que hace una derivada: nos da la tasa de cambio instantánea de una función.

### ¿Por qué es importante?

Las derivadas aparecen en todas partes:

- **Física**: Velocidad, aceleración, fuerza
- **Economía**: Costos marginales,elasticidad
- **Biología**: Tasas de crecimiento poblacional
- **Ingeniería**: Optimización de diseños
- **Ciencia de datos**: Machine learning y redes neuronales

En esencia, la derivada nos responde la pregunta: *"Si cambio un poco la entrada, cuánto cambia la salida?"*
        `
      },
      {
        id: 'definicion-formal',
        title: 'Definición Formal',
        path: '/definicion',
        content: `
## Definición Formal de la Derivada

La derivada de una función f(x) en un punto x se define como:

$$\\displaystyle f'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}$$

Esta definición nos dice que la derivada es el **límite** del cociente incremental cuando h se acerca a 0.

### Notación

Existen varias formas de escribir la derivada:

- **Notación de Lagrange**: f'(x)
- **Notación de Leibniz**: df/dx
- **Notación de Newton**: ẋ (para funciones de tiempo)
- **Notación de Euler**: Df

### Interpretación del límite

El numerador f(x+h) - f(x) representa el **cambio en la función** cuando la entrada cambia de x a x+h.

El denominador h representa el **cambio en la entrada**.

El cociente es la **tasa de cambio promedio** en el intervalo [x, x+h].

Cuando h → 0, obtenemos la tasa de cambio **instantánea**.
        `
      },
      {
        id: 'interpretacion-geometrica',
        title: 'Interpretación Geométrica',
        path: '/geometrica',
        content: `
## Interpretación Geométrica: Pendiente de la Tangente

Geométricamente, la derivada de una función en un punto representa la **pendiente de la recta tangente** a la curva en ese punto.

### La Recta Tangente

Imagina una curva suave. En un punto específico, podemos trazar una **recta que toca la curva** exactamente en ese punto sin cortarla (o cortándola solo en ese punto). Esa es la **recta tangente**.

La pendiente de esta recta es exactamente la derivada de la función en ese punto.

### Relación con la Secante

Sitomamos dos puntos cercanos en la curva y los uniómos, obtains una **recta secante**. Su pendiente es:

$$m = \\frac{f(x + h) - f(x)}{h}$$

Cuando el segundo punto se acerca infinitamente al primero (h → 0), la recta secante **se convierte** en la recta tangente, y su pendiente se convierte en la derivada.

### Visualización

- Si la derivada es **positiva**: La función crece en ese punto (pendiente hacia arriba)
- Si la derivada es **negativa**: La función decrece en ese punto (pendiente hacia abajo)
- Si la derivada es **cero**: La función tiene un punto crítico (máximo, mínimo o punto de inflexión)
        `
      }
    ]
  },
  reglas: {
    title: 'Reglas de Derivación',
    sections: [
      {
        id: 'reglas',
        title: 'Reglas Básicas',
        path: '/reglas',
        content: `
## Reglas Básicas de Derivación

### 1. Derivada de una Constante

$$\\frac{d}{dx}[c] = 0$$

Una constante no cambia, donceni derivada.

**Ejemplo**: d/dx[5] = 0

### 2. Derivada de xⁿ

$$\\frac{d}{dx}[x^n] = nx^{n-1}$$

**Ejemplo**: d/dx[x³] = 3x²

### 3. Derivada de Constante por Función

$$\\frac{d}{dx}[c \\cdot f(x)] = c \\cdot f'(x)$$

**Ejemplo**: d/dx[3x²] = 3 · 2x = 6x

### 4. Regla de la Suma

$$\\frac{d}{dx}[f(x) + g(x)] = f'(x) + g'(x)$$

**Ejemplo**: d/dx[x² + x] = 2x + 1

### 5. Regla de la Diferencia

$$\\frac{d}{dx}[f(x) - g(x)] = f'(x) - g'(x)$$

**Ejemplo**: d/dx[x³ - x²] = 3x² - 2x
        `
      },
      {
        id: 'regla-producto',
        title: 'Regla del Producto',
        path: '/producto',
        content: `
## Regla del Producto

Cuandotenemos el producto de dos funciones, no podemos simplemente multiplicar las derivadas. Necesitamos la **regla del producto**.

### Fórmula

$$\\frac{d}{dx}[f(x) \\cdot g(x)] = f'(x)g(x) + f(x)g'(x)$$

En palabras: *"La derivada del producto es: derivada del primero por el segundo, más el primero por derivada del segundo"*

### Ejemplo Paso a Paso

Derivada: f(x) = x² · sin(x)

**Paso 1**: Identificar las funciones
- f(x) = x²
- g(x) = sin(x)

**Paso 2**: Calcular derivadas individuales
- f'(x) = 2x
- g'(x) = cos(x)

**Paso 3**: Aplicar la fórmula
- f'(x)g(x) + f(x)g'(x)
- = (2x)(sin(x)) + (x²)(cos(x))
- = 2x·sin(x) + x²·cos(x)

### Ejemplo Numérico

f(x) = (x³ + 2x) · ln(x)

= (3x² + 2)·ln(x) + (x³ + 2x)·(1/x)
= (3x² + 2)ln(x) + x² + 2
        `
      },
      {
        id: 'regla-cociente',
        title: 'Regla del Cociente',
        path: '/cociente',
        content: `
## Regla del Cociente

Paradividir dos funciones, usamos la **regla del cociente**.

### Fórmula

$$\\frac{d}{dx}\\left[\\frac{f(x)}{g(x)}\\right] = \\frac{f'(x)g(x) - f(x)g'(x)}{[g(x)]^2}$$

En palabras: *"Derivada del numerador por denominador, menos numerador por derivada del denominador, todo dividido entre el denominador al cuadrado"*

### Ejemplo Paso a Paso

Derivada: f(x) = x² / sin(x)

**Paso 1**: Identificar las funciones
- f(x) = x² → f'(x) = 2x
- g(x) = sin(x) → g'(x) = cos(x)

**Paso 2**: Aplicar la fórmula
$$\\frac{2x \\cdot sin(x) - x^2 \\cdot cos(x)}{[sin(x)]^2}$$

Simplificando:
$$\\frac{x(2sin(x) - x \\cdot cos(x))}{sin^2(x)}$$

### Ejemplo Numérico

f(x) = x³ / (x² + 1)

= (3x²)(x²+1) - x³(2x) / (x²+1)²
= (3x⁴ + 3x² - 2x⁴) / (x²+1)²
= (x⁴ + 3x²) / (x²+1)²
        `
      },
      {
        id: 'regla-cadena',
        title: 'Regla de la Cadena',
        path: '/cadena',
        content: `
## Regla de la Cadena

La **regla de la cadena** se usa cuando tenemos una **función compuesta**, es decir, una función de una función.

### Fórmula

$$\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)$$

En palabras: *"La derivada de la composición es la derivada de la función externa evaluada en la función interna, multiplicada por la derivada de la función interna"*

### Ejemplo Paso a Paso

Derivada: f(x) = sin(x²)

**Paso 1**: Identificar las funciones
- Función externa: f(u) = sin(u)
- Función interna: u = x²

**Paso 2**: Calcular derivadas
- f'(u) = cos(u)
- u' = 2x

**Paso 3**: Aplicar la fórmula
- f'(g(x)) · g'(x)
- = cos(x²) · 2x
- = 2x·cos(x²)

### Notación de Leibniz

Si y = f(u) y u = g(x), entonces:

$$\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$$

### Más Ejemplos

1. (x³ + 1)⁵ → 5(x³ + 1)⁴ · 3x² = 15x²(x³ + 1)⁴
2. e^(x²) → e^(x²) · 2x = 2xe^(x²)
3. ln(sin(x)) → (1/sin(x)) · cos(x) = cot(x)
        `
      }
    ]
  },
  trigonometricas: {
    title: 'Funciones Trigonométricas',
    sections: [
      {
        id: 'trigonométricas',
        title: 'Trigonométricas',
        path: '/trig',
        content: `
## Derivadas de Funciones Trigonométricas

### Funciones Básicas

| Función | Derivada |
|--------|----------|
| sin(x) | cos(x) |
| cos(x) | -sin(x) |
| tan(x) | sec²(x) |
| cot(x) | -csc²(x) |
| sec(x) | sec(x)tan(x) |
| csc(x) | -csc(x)cot(x) |

### Ejemplos Paso a Paso

**1. Derivada de sin(x)**

$$\\frac{d}{dx}[sin(x)] = cos(x)$$

**2. Derivada de cos(x)**

$$\\frac{d}{dx}[cos(x)] = -sin(x)$$

Observa el patrón: cada derivada "avanza" en el ciclo trigonométrico.

**3. Derivada de tan(x)**

$$\\frac{d}{dx}[tan(x)] = sec^2(x) = \\frac{1}{cos^2(x)}$$

Esto viene de: sin(x)/cos(x) y aplicando la regla del cociente.

### Ejemplos Combinados

**Derivada de x·sin(x):**

Usando la regla del producto:
- f(x) = x → f'(x) = 1
- g(x) = sin(x) → g'(x) = cos(x)

Resultado: 1·sin(x) + x·cos(x) = sin(x) + x·cos(x)

**Derivada de sin(x)·cos(x):**

= cos(x)·cos(x) + sin(x)·(-sin(x))
= cos²(x) - sin²(x)
= cos(2x)
        `
      },
      {
        id: 'trig-inversas',
        title: 'Trigonométricas Inversas',
        path: '/trig-inversas',
        content: `
## Derivadas de Funciones Trigonométricas Inversas

### Funciones Inversas

| Función | Dominio | Derivada |
|---------|---------|----------|
| arcsin(x) | (-1, 1) | 1/√(1-x²) |
| arccos(x) | (-1, 1) | -1/√(1-x²) |
| arctan(x) | (-∞, ∞) | 1/(1+x²) |

### Demostración de arctan(x)

Partimos de: y = arctan(x) → x = tan(y)

Derivando implícitamente:
1 = sec²(y) · dy/dx

Como sec²(y) = 1 + tan²(y) = 1 + x²

∴ dy/dx = 1/(1+x²)

### Ejemplos Paso a Paso

**1. Derivada de arcsin(x)**

$$\\frac{d}{dx}[arcsin(x)] = \\frac{1}{\\sqrt{1-x^2}}$$

**2. Derivada de arccos(x)**

$$\\frac{d}{dx}[arccos(x)] = -\\frac{1}{\\sqrt{1-x^2}}$$

**3. Derivada de arctan(x²)**

Usando la regla de la cadena:
- u = x²
- d/dx[arctan(u)] = 1/(1+u²) · u'
- = 1/(1+x⁴) · 2x
- = 2x/(1+x⁴)

### Relación entre funciones inversas

$$\\frac{d}{dx}[arccos(x)] = -\\frac{d}{dx}[arcsin(x)]$$

porque arccos(x) + arcsin(x) = π/2
        `
      }
    ]
  },
  implícita: {
    title: 'Diferenciación Implícita',
    sections: [
      {
        id: 'implícita',
        title: 'Diferenciación Implícita',
        path: '/implicita',
        content: `
## Diferenciación Implícita

### ¿Qué es?

En las funciones que hemos visto, la variable dependiente y está **explícitamente** resuelta: y = f(x).

En la **diferenciación implícita**, y no está despejada. La relación entre x y y se da de forma **implícita** mediante una ecuación.

### Método

1. Derivar ambos lados de la ecuación respecto a x
2. Tratar a y como función de x: d/dx[y] = y'
3. Agrupar términos con y' a un lado
4. Despejar y'

### Ejemplo Paso a Paso

**Encontrar dy/dx dado: x² + y² = 25**

**Paso 1**: Derivar ambos lados
- Lado izquierdo: d/dx[x² + y²]
- = 2x + 2y·y' (usando regla de cadena para y²)
- Lado derecho: d/dx[25] = 0

**Paso 2**: Agrupar términos
2x + 2y·y' = 0
2y·y' = -2x

**Paso 3**: Despejar y'
y' = -x/y

### Ejemplo更重要

**Ecuación: x³ + y³ = 3xy**

**Paso 1**: Derivar
3x² + 3y²·y' = 3y + 3x·y'

**Paso 2**: Agrupar términos con y'
3y²·y' - 3x·y' = 3y - 3x²
3y'(y² - x) = 3(y - x²)

**Paso 3**: Despejar
y' = (y - x²)/(y² - x)

### Aplicación: Recta Tangente

Para encontrar la recta tangente a una curva implícita en un punto:
1. Encontrar los puntos (x, y) que satisfy la ecuación
2. Calcular dy/dx usando diferenciación implícita
3. Evaluar dy/dx en el punto para obtener la pendiente
        `
      }
    ]
  },
  logarítmica: {
    title: 'Diferenciación Logarítmica',
    sections: [
      {
        id: 'logarítmica',
        title: 'Diferenciación Logarítmica',
        path: '/logaritmica',
        content: `
## Diferenciación Logarítmica

### ¿Cuándo usarla?

La diferenciación logarítmica es útil para:

1. **Productos grandes**: Funciones con muchos factores
2. **Potencias complejas**: Funciones donde la variable está en el exponente
3. **Funciones exponenciales**: de la forma f(x)^g(x)

### Método

1. Tomar logaritmo natural de ambos lados: ln(y) = ln(f(x))
2. Derivar implícitamente (recordando que y es función de x)
3. Despejar y'

### Ejemplo 1: Producto de funciones

**Derivar: y = x³ · sin(x) · eˣ**

**Paso 1**: Tomar ln
ln(y) = ln(x³) + ln(sin(x)) + ln(eˣ)
ln(y) = 3ln(x) + ln(sin(x)) + x

**Paso 2**: Derivar
y'/y = 3/x + cos(x)/sin(x) + 1
y'/y = 3/x + cot(x) + 1

**Paso 3**: Despejar y'
y' = y(3/x + cot(x) + 1)
y' = x³·sin(x)·eˣ(3/x + cot(x) + 1)

### Ejemplo 2: Potencia variable

**Derivar: y = xˣ**

**Paso 1**: Tomar ln
ln(y) = x·ln(x)

**Paso 2**: Derivar
y'/y = 1·ln(x) + x·(1/x)
y'/y = ln(x) + 1

**Paso 3**: Despejar
y' = y(ln(x) + 1)
y' = xˣ(ln(x) + 1)

### Ejemplo 3: Función potencial-exponencial

**Derivar: y = x^(2x+1)**

**Paso 1**: Tomar ln
ln(y) = (2x+1)·ln(x)

**Paso 2**: Derivar
y'/y = 2·ln(x) + (2x+1)·(1/x)
y'/y = 2ln(x) + (2x+1)/x

**Paso 3**: Despejar
y' = x^(2x+1)[2ln(x) + (2x+1)/x]
        `
      }
    ]
  }
};

export const exerciseData = {
  intro: [
    {
      id: 'q1',
      question: 'La derivada representa:',
      options: [
        { id: 'a', text: 'El área bajo la curva', correct: false },
        { id: 'b', text: 'La tasa de cambio instantánea', correct: true },
        { id: 'c', text: 'La suma de todos los valores', correct: false },
        { id: 'd', text: 'El valor máximo de la función', correct: false }
      ],
      explanation: 'La derivada nos da la tasa de cambio instantánea, es decir, cómo cambia la función en cada punto específico.'
    },
    {
      id: 'q2',
      question: 'Si f(x) = x², ¿cuál es f(2)?',
      options: [
        { id: 'a', text: '2', correct: false },
        { id: 'b', text: '4', correct: true },
        { id: 'c', text: '8', correct: false },
        { id: 'd', text: '1', correct: false }
      ],
      explanation: 'f(2) = 2² = 4, evaluamos la función en x=2.'
    }
  ],
  reglas: [
    {
      id: 'r1',
      question: '¿Cuál es la derivada de x⁵?',
      options: [
        { id: 'a', text: '5x⁴', correct: true },
        { id: 'b', text: '5x⁵', correct: false },
        { id: 'c', text: 'x⁴', correct: false },
        { id: 'd', text: '5x⁶', correct: false }
      ],
      explanation: 'Usando la regla de la potencia: d/dx[xⁿ] = nxⁿ⁻¹, entonces d/dx[x⁵] = 5x⁴.'
    },
    {
      id: 'r2',
      question: 'La derivada de sin(x) es:',
      options: [
        { id: 'a', text: 'sin(x)', correct: false },
        { id: 'b', text: '-sin(x)', correct: false },
        { id: 'c', text: 'cos(x)', correct: true },
        { id: 'd', text: '-cos(x)', correct: false }
      ],
      explanation: 'La derivada de sin(x) es cos(x). Este es uno de los resultados fundamentales.'
    }
  ],
  trigonometricas: [
    {
      id: 't1',
      question: '¿Cuál es la derivada de cos(x)?',
      options: [
        { id: 'a', text: 'cos(x)', correct: false },
        { id: 'b', text: '-cos(x)', correct: false },
        { id: 'c', text: 'sin(x)', correct: false },
        { id: 'd', text: '-sin(x)', correct: true }
      ],
      explanation: 'La derivada de cos(x) es -sin(x). Observa el ciclo trigonométrico.'
    },
    {
      id: 't2',
      question: 'La derivada de tan(x) es:',
      options: [
        { id: 'a', text: 'tan(x)', correct: false },
        { id: 'b', text: 'cot(x)', correct: false },
        { id: 'c', text: 'sec��(x)', correct: true },
        { id: 'd', text: 'csc²(x)', correct: false }
      ],
      explanation: 'La derivada de tan(x) es sec²(x) = 1/cos²(x).'
    }
  ],
  implícita: [
    {
      id: 'i1',
      question: 'En diferenciación implícita, ¿cómo tratamos a y?',
      options: [
        { id: 'a', text: 'Como constante', correct: false },
        { id: 'b', text: 'Como función de x', correct: true },
        { id: 'c', text: 'Como exponente', correct: false },
        { id: 'd', text: 'Como variable independiente', correct: false }
      ],
      explanation: 'En diferenciación implícita, tratamos y como función de x, donceni d/dx[y] = y·.'
    }
  ]
};