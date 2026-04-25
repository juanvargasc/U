# Documentación del Sistema de Finanzas Personales

## Índice

- [Introducción](#introduccion)
- [Instalación](#instalacion)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Uso Básico](#uso-basico)
- [Sistema de Autenticación](#sistema-de-autenticacion)
- [Módulos del Sistema](#modulos-del-sistema)
- [Configuración](#configuracion)
- [Ejemplos](#ejemplos)
- [Solución de Problemas](#solucion-de-problemas)

---

## Introducción

Este sistema es una aplicación de consola en Python para gestión de finanzas personales. Permite registrar transacciones (ingresos y gastos), generar reportes, y administrar usuarios.

### Características Principales

- ✅ Autenticación de usuarios
- ✅ Registro de transacciones (ingresos y gastos)
- ✅ Cálculo automático de balances
- ✅ Categorización de gastos
- ✅ Reportes en texto y JSON
- ✅ Sistema de sesiones
- ✅ Exportación de datos

---

## Instalación

### Requisitos

- Python 3.8 o superior
- `requests` (instalar con `pip install requests`)

### Pasos

1. Clona o descarga el repositorio
2. Asegúrate de tener Python instalado:
   ```bash
   python --version
   ```
3. Instala las dependencias:
   ```bash
   pip install requests
   ```
4. Ejecuta el script de demostración:
   ```bash
   python demo_auth.py
   ```

---

## Estructura del Proyecto

```
Finanzas/
├── auth.py              # Módulo de autenticación (login, registro, logout)
├── finance_app.py       # Lógica principal de finanzas
├── utils.py             # Funciones de utilidad
├── users.json           # Base de datos de usuarios
├── .current_user        # Sesión actual
├── demo_auth.py         # Script de demostración
├── DOCUMENTACION.md     # Esta documentación
└── README.md            # README del proyecto
```

### Explicación de Archivos

| Archivo | Descripción |
|---------|-------------|
| `auth.py` | Módulo de autenticación (login, registro, logout, sesiones) |
| `finance_app.py` | Lógica principal: operaciones, reportes, categorías |
| `utils.py` | Funciones auxiliares: formateo, fechas, validación |
| `users.json` | Persistencia de usuarios (formato JSON) |
| `.current_user` | Archivo de sesión actual |
| `demo_auth.py` | Script para demostrar el sistema |

---

## Uso Básico

### Iniciar Sesión

```bash
python main.py login admin admin123
```

### Registrar Nuevo Usuario

```bash
python main.py register juanjuan Juan Juan
```

### Agregar Transacción

```bash
python main.py add_transaction Salario 3500 2026-02-01
```

### Ver Resumen Financiero

```bash
python main.py report
```

### Ver Todas las Transacciones

```bash
python main.py list
```

### Exportar Datos

```bash
python main.py export datos_export.csv
```

---

## Sistema de Autenticación

El módulo `auth.py` maneja la autenticación de usuarios con las siguientes funciones:

### Funciones de `auth.py`

| Función | Descripción | Retorno |
|---------|-------------|---------|
| `register_user()` | Registra un nuevo usuario | `(True/False, mensaje)` |
| `login()` | Inicia sesión un usuario | `(True/False, mensaje, user)` |
| `logout()` | Cierra sesión actual | `True/False` |
| `check_session()` | Verifica sesión activa | `True/False` |
| `get_current_user()` | Obtener datos de sesión | `dict` o `None` |
| `get_all_users()` | Lista todos los usuarios | `list` |
| `is_authorized()` | Verifica autorización | `True/False` |

### Flujo de Autenticación

```
1. Usuario se registra → auth.register_user()
   ↓
2. Usuario hace login → auth.login()
   ↓
3. App guarda sesión → _save_current_session()
   ↓
4. Usuario usa el sistema con permisos
   ↓
5. Usuario hace logout → auth.logout()
```

### Seguridad

- Contraseñas hashadas con SHA-256
- No se guardan contraseñas en texto plano
- Validación de longitud mínima de contraseña (6 caracteres)

---

## Módulos del Sistema

### 1. `finance_app.py`

Este módulo contiene la lógica principal del sistema financiero.

#### Funciones Principales

| Función | Descripción |
|---------|-------------|
| `add_transaction()` | Agrega una transacción |
| `get_balance()` | Obtiene el balance actual |
| `get_income()` | Obtiene total de ingresos |
| `get_expenses()` | Obtiene total de gastos |
| `get_category_expenses()` | Gastos por categoría |
| `get_summary()` | Obtiene resumen financiero |
| `get_transactions()` | Lista todas las transacciones |
| `get_transactions_by_date()` | Transacciones por rango de fechas |
| `get_transactions_by_category()` | Transacciones por categoría |

#### Estructura de Transacción

```python
{
    "id": 1,
    "description": "Salario mensual",
    "amount": 3500.00,
    "date": "2026-02-01",
    "category": "ingreso"
}
```

#### Uso del Objeto `FinanceApp`

```python
from finance_app import FinanceApp

app = FinanceApp()

# Agregar transacción
app.add_transaction("Salario", 5000, "2026-02-01")

# Agregar gasto
app.add_transaction("Supermercado", -300, "2026-02-03")

# Obtener resumen
resumen = app.get_summary()
print(f"Balance: ${resumen['balance']}")
```

### 2. `auth.py`

Módulo de autenticación con sistema de usuarios.

#### Estructura de Usuario

```python
{
    "user_id": 1,
    "username": "admin",
    "password_hash": "hash_sha256",
    "name": "Administrador"
}
```

#### Ejemplo de Uso

```python
from auth import AuthManager

auth = AuthManager()

# Registrar usuario
success, message = auth.register_user("juan", "Contraseña123", "Juan Perez")

# Login
success, message, user = auth.login("juan", "Contraseña123")

# Verificar sesión
if auth.check_session():
    print(f"Bienvenido: {auth.get_current_user()['name']}")

# Logout
auth.logout()
```

### 3. `utils.py`

Funciones de utilidad para formateo y validación.

#### Funciones Disponibles

- `format_currency(amount)` - Formatea monedas (ej: $1,234.56)
- `format_date(date_str)` - Formatea fechas
- `validate_date(date_str)` - Valida formato de fecha YYYY-MM-DD
- `validate_email(email)` - Valida formato de email
- `validate_name(name)` - Valida nombres (máx 50 caracteres)

---

## Configuración

### Archivos de Configuración

#### `users.json`

Contiene la lista de usuarios registrados.

```json
{
  "users": [
    {
      "user_id": 1,
      "username": "admin",
      "password_hash": "hash...",
      "name": "Administrador"
    }
  ]
}
```

#### `.current_user`

Guarda la sesión actual.

```json
{
  "username": "admin",
  "password_hash": "hash...",
  "name": "Administrador"
}
```

### Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `APP_NAME` | Nombre de la aplicación | "Finanzas Personales" |
| `CURRENCY_SYMBOL` | Símbolo de moneda | "$" |

---

## Ejemplos

### Ejemplo 1: Script de Demostración

```python
from finance_app import FinanceApp

app = FinanceApp()

# Agregar transacciones
app.add_transaction("Salario", 3500, "2026-02-01")
app.add_transaction("Alquiler", -900, "2026-02-01")
app.add_transaction("Supermercado", -500, "2026-02-05")

# Ver resumen
print(app.get_summary())
```

### Ejemplo 2: Exportar a CSV

```python
from finance_app import FinanceApp
from utils import format_currency

app = FinanceApp()

with open("export.csv", "w") as f:
    f.write("Fecha;Descripción;Monto;Tipo\n")
    for t in app.get_transactions():
        f.write(f"{t['date']};{t['description']};{format_currency(abs(t['amount']))};{t['category']}\n")
```

### Ejemplo 3: Reporte de Gastos por Categoría

```python
from finance_app import FinanceApp

app = FinanceApp()
gastos = app.get_category_expenses()

print("Gastos por Categoría:")
for cat, total in gastos.items():
    print(f"  {cat}: ${total:.2f}")
```

---

## Solución de Problemas

### Problema: Login fallido

**Posible causa**: Contraseña incorrecta o usuario no existe.

**Solución**:
```bash
# Ver usuarios registrados
python main.py list

# Registrar nuevo usuario
python main.py register juan Juan Juan
```

### Problema: Error al agregar transacción

**Posible causa**: Formato de fecha inválido.

**Solución**: Usar formato YYYY-MM-DD (ej: `2026-02-01`)

### Problema: Sesión no persiste

**Posible causa**: Archivo `.current_user` corrompido.

**Solución**:
```bash
# Eliminar archivo de sesión
del .current_user

# Iniciar sesión nuevamente
python main.py login admin admin123
```

---

## Referencia Rápida de Comandos

```bash
# Login
python main.py login USUARIO CONTRASENA

# Registro
python main.py register USUARIO NOMBRE APELLIDO

# Agregar transacción
python main.py add_transaction DESCRIPCION MONTANO FECHA

# Ver resumen
python main.py report

# Ver transacciones
python main.py list

# Exportar
python main.py export ARCHIVO.csv

# Logout
python main.py logout
```

---

## Créditos

Desarrollado por Juan Vargas - 2026

---

## Licencia

Propiedad personal. No se permite redistribución sin autorización.
