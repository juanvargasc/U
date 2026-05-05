# DerivaLearn - Plataforma Educativa de Cálculo Diferencial

## 1. Project Overview

**Project Name:** DerivaLearn - Aprende Derivadas
**Type:** Educational Web Application (SPA)
**Core Functionality:** Plataforma interactiva para aprender cálculo diferencial, con contenido educativo, calculadora de derivadas, ejercicios y gráficas dinámicas
**Target Users:** Estudiantes de bachillerato y primeros semestres universitarios

---

## 2. UI/UX Specification

### Layout Structure

**Desktop (≥1024px):**
- Sidebar navegación: 280px fixed left
- Main content: fluid, con padding 40px
- Header: sticky top, height 64px

**Tablet (768px - 1023px):**
- Navigation: hamburger menu
- Full width content

**Mobile (<768px):**
- Bottom navigation bar
- Full width content, padding 16px

### Visual Design

**Color Palette - Light Mode:**
- Primary: #4F46E5 (Indigo)
- Primary Light: #818CF8
- Primary Dark: #3730A3
- Secondary: #0EA5E9 (Sky Blue)
- Accent: #8B5CF6 (Purple)
- Background: #F8FAFC
- Surface: #FFFFFF
- Text Primary: #1E293B
- Text Secondary: #64748B
- Border: #E2E8F0
- Success: #10B981
- Error: #EF4444
- Warning: #F59E0B

**Color Palette - Dark Mode:**
- Primary: #818CF8
- Primary Light: #A5B4FC
- Primary Dark: #6366F1
- Secondary: #38BDF8
- Accent: #A78BFA
- Background: #0F172A
- Surface: #1E293B
- Text Primary: #F1F5F9
- Text Secondary: #94A3B8
- Border: #334155

**Typography:**
- Font Family Headings: "Outfit", sans-serif
- Font Family Body: "DM Sans", sans-serif
- Font Family Code: "JetBrains Mono", monospace
- H1: 2.5rem (40px), weight 700
- H2: 2rem (32px), weight 600
- H3: 1.5rem (24px), weight 600
- H4: 1.25rem (20px), weight 500
- Body: 1rem (16px), weight 400
- Small: 0.875rem (14px)
- Code: 0.9rem

**Spacing System:**
- Base unit: 4px
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px

**Border Radius:**
- sm: 6px
- md: 12px
- lg: 16px
- xl: 24px
- full: 9999px

**Shadows:**
- sm: 0 1px 2px rgba(0,0,0,0.05)
- md: 0 4px 6px -1px rgba(0,0,0,0.1)
- lg: 0 10px 15px -3px rgba(0,0,0,0.1)
- xl: 0 20px 25px -5px rgba(0,0,0,0.1)

### Components

**Sidebar Navigation:**
- Logo/title al inicio
- Secciones con iconos
- Indicador de sección activa
- Collapse en tablet/mobile

**Cards:**
- Fondo surface
- Border radius lg
- Shadow md
- Padding lg
- Hover: shadow lg, translateY(-2px)

**Buttons:**
- Primary: background primary, texto white
- Secondary: background transparent, border primary
- Ghost: sin border, texto primary
- Border radius md
- Padding vertical sm, horizontal lg
- Hover: opacity 0.9, scale 1.02
- Transition: 200ms ease

**Input Fields:**
- Height: 48px
- Border: 1px solid border
- Border radius md
- Padding horizontal md
- Focus: border primary, ring

**Code Blocks:**
- Background: #1E293B (dark)
- Border radius md
- Padding md
- Font family: JetBrains Mono
- Syntax highlighting

**Progress Bar:**
- Height: 8px
- Background: border
- Fill: primary gradient
- Border radius full

---

## 3. Functionality Specification

### Navigation Structure

1. **Introducción**
   - ¿Qué es una derivada?
   - Definición intuitiva (velocidad instantánea)
   - Definición formal (límite)
   - Interpretación geométrica

2. **Reglas de Derivación**
   - Constante
   - Potencia
   - Suma/Resta
   - Producto
   - Cociente
   - Cadena

3. **Funciones Trigonométricas**
   - sin(x), cos(x), tan(x)
   - Ejemplos
   - Derivadas inversas (arcsin, arccos, arctan)

4. **Diferenciación Implícita**
   - Concepto
   - Ejercicios guiados

5. **Diferenciación Logarítmica**
   - Cuándo usarla
   - Ejemplos paso a paso

### Calculator Section

**Input:**
- Campo de texto para función f(x)
- Variable: x
- Soporta: polinomios, trig, exponenciales, logaritmos
- Notación: sin(x), cos(x), tan(x), exp(x), log(x), sqrt(x), x^n

**Output:**
- Resultado de derivada
- Paso a paso (expandible)
- Gráfica de f(x) y f'(x)

**Technology:**
- math.js para parseo y derivación simbólica

### Interactive Exercises

**Types:**
1. Multiple choice
2. Fill in the blank
3. Match the pairs
4. Derivative calculation

**Flow:**
- Usuario selecciona/ingresa respuesta
- Validación inmediata
- Feedback visual (correcto/incorrecto)
- Explicación del error

### Graph Section

**Features:**
- Plot de función original
- Plot de derivada
- Puntos interactivos
- Animación de pendiente

**Library:**
- Function Plot (D3-based)

### Additional Features

1. **Progress Tracking:**
   - Porcentaje de secciones completadas
   - Guardado en localStorage

2. **Mini Quizzes:**
   - 3-5 preguntas por sección
   - Score final

3. **Dark/Light Mode:**
   - Toggle en header
   - Preference saved

---

## 4. Technical Architecture

### Technology Stack

- React 18+ con Vite
- React Router DOM
- math.js (derivación simbólica)
- function-plot (gráficas)
- localStorage (persistencia)
- CSS Modules o Styled Components

### File Structure

```
/src
  /components
    /Layout (Sidebar, Header, etc.)
    /UI (Button, Card, Input, etc.)
    /Content (secciones educativas)
    /Calculator
    /Exercises
    /Graph
  /hooks
  /context (Theme, Progress)
  /data (contenido educativo)
  /utils
  App.jsx
  main.jsx
  index.css
```

---

## 5. Acceptance Criteria

### Visual Checkpoints

- [ ] Sidebar navegación visible en desktop
- [ ] Menú responsive en mobile
- [ ] Modo oscuro aplicado correctamente
- [ ] Cards con hover effects
- [ ] Gráficas renderizando funciones
- [ ] Código con syntax highlighting

### Functional Checkpoints

- [ ] Navegación entre todas las secciones
- [ ] Calculadora deriva correctamente polinomios
- [ ] Calculadora deriva funciones trigonométricas
- [ ] Ejercicios geben feedback correcto
- [ ] Progreso se guarda en localStorage
- [ ] Modo oscuro se persiste
- [ ] Responsive en mobile 375px

### Content Checkpoints

- [ ] Todas las secciones con contenido
- [ ] Ejemplos paso a paso
- [ ] Gráficas para interpretacion geométrica