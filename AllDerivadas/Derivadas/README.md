# Aprende Derivadas

Pagina web educativa sobre calculo diferencial. El proyecto explica conceptos basicos de derivadas, reglas de derivacion, derivadas trigonometricas, trigonometria inversa, derivacion implicita, derivacion logaritmica y ejercicios interactivos.

## Archivos del proyecto

```text
Derivadas/
|-- index.html   # Estructura principal de la pagina
|-- styles.css   # Estilos visuales de la pagina
|-- script.js    # Interacciones de la pagina
`-- README.md    # Documentacion del proyecto
```

## Como abrir la pagina

1. Abre la carpeta del proyecto:

```text
C:\Users\pcgam\Documents\Code\U\AllDerivadas\Derivadas
```

2. Abre el archivo `index.html` en el navegador.

No necesitas instalar dependencias ni iniciar un servidor local, porque es una pagina HTML estatica.

## Tecnologias usadas

- HTML5 para la estructura del contenido.
- CSS3 para el diseno visual, el responsive y el tema claro/oscuro.
- JavaScript para interacciones simples.
- MathJax desde CDN para renderizar formulas matematicas.
- Chart.js desde CDN, aunque actualmente no se usa de forma visible en el contenido principal.

## Secciones de la pagina

- **Inicio:** portada de la pagina con botones de navegacion.
- **Conceptos:** explicacion de tasa de cambio, limite y pendiente.
- **Reglas:** reglas basicas como potencia, suma, producto y cociente.
- **Trigonometricas:** tabla de derivadas trigonometricas y regla de la cadena.
- **Trigonometria inversa:** formulas de arcsen, arccos y arctan.
- **Implicita:** ejemplo de derivacion implicita.
- **Logaritmica:** ejemplos con logaritmos.
- **Ejercicios:** ocho ejercicios interactivos sobre potencia, cadena, derivacion implicita, polinomios, producto, cociente, exponenciales y logaritmos.

## CSS

El archivo `styles.css` debe estar en la misma carpeta que `index.html`, porque el HTML lo carga asi:

```html
<link rel="stylesheet" href="styles.css">
```

Si cambias el nombre del archivo CSS o lo mueves a otra carpeta, tambien debes actualizar esa ruta.

Ejemplos:

```html
<!-- Si el CSS esta en una carpeta llamada css -->
<link rel="stylesheet" href="css/styles.css">
```

```html
<!-- Si el archivo se llama estilo.css -->
<link rel="stylesheet" href="estilo.css">
```

## JavaScript

Actualmente `index.html` carga el JavaScript desde el archivo externo `script.js`. Ese codigo maneja:

- Menu movil.
- Cambio de tema claro/oscuro.
- Desplazamiento suave entre secciones.
- Marcado de secciones al hacer scroll.
- Validacion de ocho ejercicios interactivos.

El archivo `script.js` esta enlazado desde `index.html` con esta linea antes de `</body>`:

```html
<script src="script.js"></script>
```

Importante: si agregas nuevas interacciones, revisa que los `id` y las clases usados en JavaScript coincidan con los de `index.html`.


## Formulas matematicas

La pagina usa MathJax para mostrar formulas. En `index.html` ya esta configurado para aceptar dos formatos:

```html
<!-- Formula dentro de un parrafo -->
<p>Si $f(x) = x^3$, entonces $f'(x) = 3x^2$</p>

<!-- Formula en bloque -->
<div class="math-block">
    $$f'(x) = 3x^2$$
</div>
```

Si los simbolos `$` aparecen en pantalla, revisa que la configuracion `window.MathJax` este antes del script que carga MathJax desde CDN.

## Dependencias externas

La pagina carga estas librerias desde internet:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
```

Si abres la pagina sin conexion a internet, las formulas de MathJax podrian no renderizarse correctamente.

## Problemas comunes

### El CSS no se ve

Revisa estos puntos:

- `styles.css` debe estar en la misma carpeta que `index.html`.
- El nombre debe coincidir exactamente: `styles.css`.
- El enlace en el HTML debe ser:

```html
<link rel="stylesheet" href="styles.css">
```

- Si ya tenias la pagina abierta, recarga con `Ctrl + F5` para limpiar cache.

### Las formulas no se muestran bien

Verifica que tengas conexion a internet, porque MathJax se carga desde CDN.

### El JavaScript externo no funciona

Revisa que `index.html` tenga esta linea antes de `</body>`:

```html
<script src="script.js"></script>
```

Tambien confirma que `script.js` este en la misma carpeta que `index.html`.


## Nota sobre la restauracion del contenido

La pagina dejo de mostrar todo cuando `index.html` fue reemplazado por una version incompleta que tenia el `main` casi vacio:

```html
<main class="main-content">
    <!-- Secciones del contenido -->
</main>
```

Para que la pagina funcione, `main.main-content` debe conservar las secciones reales:

- `#home`
- `#funciones`
- `#reglas`
- `#ejercicios`

El cambio de tema no debe borrar ni reemplazar esas secciones. Solo debe modificar estilos, variables CSS o el atributo `data-theme` del elemento `<html>`.

## Tema claro/oscuro

El tema se controla con el atributo `data-theme` en `<html>`:

```html
<html lang="es" data-theme="light">
```

JavaScript asigna automaticamente `light` o `dark`, guarda la preferencia en `localStorage` y actualiza el icono del boton `.theme-toggle`.

## Recomendaciones para seguir mejorando

- Usar Chart.js para mostrar graficas de funciones y derivadas.
- Revisar codificacion UTF-8 si aparecen caracteres extranos en el navegador.




