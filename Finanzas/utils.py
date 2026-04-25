"""
utils.py - Funciones de utilidad para el sistema de finanzas

Este módulo proporciona funciones auxiliares para formateo,
validación y operaciones comunes en el sistema.
"""


def format_currency(amount, currency_symbol="$"):
    """
    Formatea un monto como moneda.

    Args:
        amount: El monto a formatear (puede ser positivo o negativo)
        currency_symbol: Símbolo de la moneda (default: "$")

    Returns:
        String con el monto formateado
    """
    if amount >= 0:
        return f"{currency_symbol}{amount:,.2f}"
    else:
        return f"-{currency_symbol}{abs(amount):,.2f}"


def format_date(date_str):
    """
    Formatea una fecha de diferentes formatos.

    Args:
        date_str: Cadena con la fecha (varios formatos soportados)

    Returns:
        Fecha formateada como YYYY-MM-DD
    """
    from datetime import datetime

    if not date_str:
        return ""

    # Intentar formatos comunes
    for fmt in ("%Y-%m-%d", "%d/%m/%Y", "%m/%d/%Y", "%Y/%m/%d"):
        try:
            dt = datetime.strptime(date_str, fmt)
            return dt.strftime("%Y-%m-%d")
        except ValueError:
            continue

    return date_str


def validate_date(date_str):
    """
    Valida que una cadena es una fecha válida.

    Args:
        date_str: Cadena con la fecha (formato YYYY-MM-DD)

    Returns:
        True si es válida, False si no
    """
    import re
    from datetime import datetime

    if not date_str or not isinstance(date_str, str):
        return False

    # Verificar formato básico con regex
    pattern = r"^\d{4}-\d{2}-\d{2}$"
    if not re.match(pattern, date_str):
        return False

    # Verificar que es una fecha real
    try:
        datetime.strptime(date_str, "%Y-%m-%d")
        return True
    except ValueError:
        return False


def validate_email(email):
    """
    Valida formato de email básico.

    Args:
        email: El email a validar

    Returns:
        True si tiene formato válido, False si no
    """
    if not email or not isinstance(email, str):
        return False

    # Patrón básico de email
    pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    return bool(re.match(pattern, email))


def validate_name(name, max_length=50):
    """
    Valida un nombre.

    Args:
        name: El nombre a validar
        max_length: Longitud máxima (default: 50)

    Returns:
        True si es válido, False si no
    """
    if not name or not isinstance(name, str):
        return False

    return len(name) > 0 and len(name) <= max_length


def truncate_string(text, max_length=50, suffix="..."):
    """
    Corta un texto a una longitud máxima.

    Args:
        text: Texto a cortar
        max_length: Longitud máxima
        suffix: Sufijo a añadir (default: "...")

    Returns:
        Texto cortado
    """
    if not text or len(text) <= max_length:
        return text

    return text[:max_length - len(suffix)] + suffix


def parse_amount(amount_str):
    """
    Parsea una cadena a número decimal.

    Args:
        amount_str: Cadena con el monto (puede tener símbolos $, comas, etc.)

    Returns:
        Número flotante o None si no se puede parsear
    """
    import re

    if not amount_str or not isinstance(amount_str, str):
        return None

    # Eliminar símbolos no numéricos
    cleaned = re.sub(r"[^\d.\-]", "", amount_str)

    try:
        return float(cleaned)
    except ValueError:
        return None


def calculate_percentage(part, total):
    """
    Calcula el porcentaje de una parte respecto a un total.

    Args:
        part: La parte
        total: El total

    Returns:
        Porcentaje (0-100) o 0 si total es 0
    """
    if total == 0:
        return 0

    return (part / total) * 100


def get_current_date():
    """
    Obtiene la fecha actual.

    Returns:
        Fecha actual en formato YYYY-MM-DD
    """
    from datetime import datetime
    return datetime.now().strftime("%Y-%m-%d")


def calculate_average(values):
    """
    Calcula el promedio de una lista de valores.

    Args:
        values: Lista de valores numéricos

    Returns:
        Promedio o 0 si la lista está vacía
    """
    if not values:
        return 0

    return sum(values) / len(values)


def get_category_name(category_id_or_name):
    """
    Devuelve el nombre de una categoría.

    Args:
        category_id_or_name: ID o nombre de la categoría

    Returns:
        Nombre de categoría o None
    """
    categories = {
        "alimentos": "Alimentos y Bebidas",
        "transporte": "Transporte",
        "hogar": "Hogar",
        "salud": "Salud",
        "educacion": "Educación",
        "entretenimiento": "Entretenimiento",
        "ropa": "Ropa",
        "servicios": "Servicios Públicos",
        "gastos_varios": "Gastos Varios",
        "ingresos": "Ingresos",
        "bonificaciones": "Bonos y Comisiones",
        "other": "Otro",
    }
    return categories.get(str(category_id_or_name), None)
