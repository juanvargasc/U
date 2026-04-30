document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle');
    const htmlElement = document.documentElement;
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const sidebar = document.querySelector('.sidebar');

    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemDark ? 'dark' : 'light');

    htmlElement.setAttribute('data-theme', initialTheme);
    updateThemeIcon(initialTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggle) {
            return;
        }

        const svg = themeToggle.querySelector('svg');
        if (!svg) {
            return;
        }

        if (theme === 'dark') {
            svg.innerHTML = '<circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>';
        } else {
            svg.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
        }
    }

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-active');
            if (sidebar) {
                sidebar.classList.toggle('open');
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            const target = href && href !== '#' ? document.querySelector(href) : null;

            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });

            if (navLinks) {
                navLinks.classList.remove('mobile-active');
            }

            if (sidebar) {
                sidebar.classList.remove('open');
            }
        });
    });

    const sections = document.querySelectorAll('main section[id]');
    const menuLinks = document.querySelectorAll('.nav-link, .sidebar-link');

    function updateActiveLinks() {
        const scrollTop = window.scrollY;
        const current = Array.from(sections).reverse().find(section => scrollTop >= section.offsetTop - 100);

        if (!current) {
            return;
        }

        menuLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current.id}`);
        });
    }

    window.addEventListener('scroll', updateActiveLinks);
    updateActiveLinks();
});

function normalizeAnswer(value) {
    return value.toLowerCase().replace(/\s+/g, '');
}

function setExerciseResult(resultId, isCorrect, correctText, incorrectText) {
    const result = document.getElementById(resultId);

    if (!result) {
        return;
    }

    result.textContent = isCorrect ? correctText : incorrectText;
    result.className = isCorrect ? 'result correct' : 'result';
}

function checkPowerEx1() {
    const input = document.getElementById('powerEx1');
    const answer = input ? normalizeAnswer(input.value) : '';
    const validAnswers = ['20x^3', '20x³'];

    setExerciseResult(
        'powerEx1Result',
        validAnswers.includes(answer),
        'Correcto. La derivada de 5x^4 es 20x^3.',
        'Incorrecto. Recuerda usar la regla de la potencia.'
    );
}

function checkTrigEx2() {
    const input = document.getElementById('trigEx2');
    const answer = input ? normalizeAnswer(input.value) : '';
    const validAnswers = ['6cos(3x)', '6*cos(3x)'];

    setExerciseResult(
        'trigEx2Result',
        validAnswers.includes(answer),
        'Correcto. La derivada de 2sin(3x) es 6cos(3x).',
        'Incorrecto. Aplica la regla de la cadena.'
    );
}

function checkImplicitEx3() {
    const input = document.getElementById('implicitEx3');
    const answer = input ? normalizeAnswer(input.value) : '';
    const validAnswers = ['-x/y', '-x÷y'];

    setExerciseResult(
        'implicitEx3Result',
        validAnswers.includes(answer),
        'Correcto. dy/dx = -x/y.',
        'Incorrecto. Deriva ambos lados y despeja dy/dx.'
    );
}

function checkPolyEx4() {
    const input = document.getElementById('polyEx4');
    const answer = input ? normalizeAnswer(input.value) : '';
    const validAnswers = ['12x^2-4x+5', '12x²-4x+5'];

    setExerciseResult(
        'polyEx4Result',
        validAnswers.includes(answer),
        'Correcto. f\'(x) = 12x^2 - 4x + 5.',
        'Incorrecto. Deriva termino por termino.'
    );
}

function checkProductEx5() {
    const input = document.getElementById('productEx5');
    const answer = input ? normalizeAnswer(input.value) : '';
    const validAnswers = ['9x^2-6x+2', '9x²-6x+2'];

    setExerciseResult(
        'productEx5Result',
        validAnswers.includes(answer),
        'Correcto. Al simplificar, f\'(x) = 9x^2 - 6x + 2.',
        'Incorrecto. Usa (uv)\' = u\'v + uv\'.'
    );
}

function checkQuotientEx6() {
    const input = document.getElementById('quotientEx6');
    const answer = input ? normalizeAnswer(input.value) : '';
    const validAnswers = ['1-1/x^2', '1-x^-2', '1-1/x²'];

    setExerciseResult(
        'quotientEx6Result',
        validAnswers.includes(answer),
        'Correcto. f(x)=x+1/x, entonces f\'(x)=1-1/x^2.',
        'Incorrecto. Primero puedes simplificar como x + 1/x.'
    );
}

function checkExpEx7() {
    const input = document.getElementById('expEx7');
    const answer = input ? normalizeAnswer(input.value) : '';
    const validAnswers = ['6xe^(3x^2)', '6xe^{3x^2}', '6x*e^(3x^2)', '6x*e^{3x^2}', '6xe^(3x²)', '6xe^{3x²}'];

    setExerciseResult(
        'expEx7Result',
        validAnswers.includes(answer),
        'Correcto. La cadena interna deriva a 6x.',
        'Incorrecto. Recuerda multiplicar por la derivada de 3x^2.'
    );
}

function checkLogEx8() {
    const input = document.getElementById('logEx8');
    const answer = input ? normalizeAnswer(input.value) : '';
    const validAnswers = ['1/x', 'x^-1'];

    setExerciseResult(
        'logEx8Result',
        validAnswers.includes(answer),
        'Correcto. ln(5x) deriva a 1/x.',
        'Incorrecto. Usa la regla: d/dx ln(u) = u\'/u.'
    );
}
