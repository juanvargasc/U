# 📊 Organizador de Finanzas Personal

Sistema completo para gestión de ingresos, gastos, presupuestos y análisis de gastos.

## ✨ Características

- ✅ Registro de ingresos y gastos
- ✅ Categorización automática de transacciones
- ✅ Control de presupuesto por categorías
- ✅ Informes detallados de flujo de caja
- ✅ Desglose por categorías con gráficos visuales
- ✅ Exportación a CSV
- ✅ Sistema de alertas de presupuesto
- ✅ Historial completo de transacciones

## 🚀 Instalación

```bash
# El sistema ya está listo para usar
# No requiere instalación adicional
```

## 📖 Uso

### Ejecutar la aplicación

```bash
python finance_app.py
```

### Menú de opciones

1. **Agregar Ingreso** - Registrar ingresos (salario, inversiones, regalos, etc.)
2. **Agregar Gasto** - Registrar gastos (comida, transporte, servicios, etc.)
3. **Ver Informes de Resumen** - Obtener vista general de finanzas
4. **Ver Desglose por Categorías** - Análisis detallado de gastos
5. **Ver Flujo de Caja Mensual** - Resúmenes mensuales de ingresos y gastos
6. **Ver Estado del Presupuesto** - Monitoreo de presupuesto por categoría
7. **Exportar a CSV** - Descargar todas las transacciones
8. **Ver Transacciones** - Lista de todas las transacciones recientes

## 📁 Estructura de Datos

La aplicación guarda automáticamente las transacciones en `finanzas.json` con la siguiente estructura:

```json
{
  "transactions": [
    {
      "id": "inc_20240115_1",
      "type": "income",
      "amount": 5000.00,
      "category": "Salario",
      "description": "Nómina enero 2024",
      "date": "2024-01-15T09:00:00",
      "account": "general"
    }
  ]
}
```

## 📊 Tipos de Transacciones

| Tipo | Descripción |
|------|-------------|
| `income` | Ingresos (salarios, ingresos extra) |
| `expense` | Gastos diarios |
| `transfer` | Transferencias entre cuentas |
| `investment` | Inversiones |
| `investment_return` | Devoluciones de inversiones |
| `saving` | Ahorro |

## 🎯 Categorías Recomendadas

### Gastos
- **Alimentación** - Compras, cenas, supermercado
- **Transporte** - Combustible, transporte público
- **Entretenimiento** - Cine, streaming, salidas
- **Salud** - Medicina, farmacia, seguros
- **Servicios** - Luz, agua, internet, teléfono
- **Vestimenta** - Ropa, accesorios
- **Otros** - Gastos miscellaneous

### Ingresos
- **Salario** - Nómina mensual
- **Inversiones** - Dividendos, intereses
- **Liberal** - Freelance, trabajos extra
- **Regalos** - Regalos recibidos, herencias
- **Vventas** - Venta de artículos

## 🔐 Configuración de Presupuesto

El sistema viene con límites de presupuesto por defecto:

| Categoría | Límite Mensual |
|-----------|---------------|
| Alimentación | $1,000 |
| Transporte | $500 |
| Entretenimiento | $300 |
| Salud | $200 |
| Servicios | $300 |
| Otros | $500 |

## 📝 Ejemplo de sesión

```bash
$ python finance_app.py

============================================================
  ORGANIZADOR DE FINANZAS PERSONAL
============================================================

Bienvenido al sistema de gestión de finanzas.

============================================================
MENÚ PRINCIPAL
============================================================
1. Agregar Ingreso
2. Agregar Gasto
3. Ver Informes de Resumen
4. Ver Desglose por Categorías
5. Ver Flujo de Caja Mensual
6. Ver Estado del Presupuesto
7. Exportar a CSV
8. Ver Transacciones
9. Salir
============================================================

Seleccione una opción (1-9): 1

Monto del ingreso: $5000
Categoría: Salario
Descripción: Nómina enero 2024
Fecha (YYYY-MM-DD, dejar vacío para hoy): 

✓ Ingreso de $5,000.00 agregado correctamente

============================================================
MENÚ PRINCIPAL
============================================================

Seleccione una opción (1-9): 3

============================================================
              INFORME FINANCIERO - RESUMEN
============================================================
Fecha de reporte: 15/01/2024 10:30
============================================================

RESUMEN GENERAL
----------------------------------------
  Ingresos totales:     $5,000.00
  Gastos totales:       $0.00
  Balance neto:         $5,000.00

============================================================
```

## 🎨 Visualización de Presupuestos

El sistema muestra indicadores visuales:

- ⚠ **SOBRE PRESUPUESTO** (>100%)
- ⚠ **ALERTA** (80-100%)
- ✓ **EN RANGO** (60-80%)
- ✓ **BIEN** (<60%)

## 💾 Archivo de Datos

Todas las transacciones se guardan en `finanzas.json`. Puedes:

- **Backup manual**: Copia el archivo periódicamente
- **Backup automático**: Configura un script cron/tar
- **Limpieza**: Elimina el archivo si quieres reiniciar

## 🔧 Extensión

La aplicación puede ser extendida para:

- 🌐 Web interface con Flask/FastAPI
- 📱 Integración con API de bancos
- 📊 Gráficos con matplotlib/plotly
- 🤖 Análisis de tendencias con machine learning
- 🌐 Soporte multi-cuenta

## 🐛 Solución de Problemas

### Transacciones no aparecen
- Verifica que `finanzas.json` tenga permisos de escritura
- Revisa que la ruta sea correcta
- Intenta cerrar y volver a abrir la aplicación

### Error al guardar
- Verifica que Python 3.8+ esté instalado
- Comprueba permisos de carpeta
- Reinicia la aplicación

## 📄 Licencia

Este proyecto es de código abierto y libre para uso personal.

## 📞 Soporte

Para reportar bugs o sugerencias, por favor abre un issue.

---

**¡Empieza a organizar tus finanzas hoy!** 🎉
