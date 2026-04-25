# DEMO: SISTEMA DE AUTENTICACION
# Ejecuta: python demo_auth.py

from finance_app import FinanceApp
from auth import AuthManager


def demo():
    print("=" * 60)
    print("DEMO: SISTEMA DE AUTENTICACION")
    print("=" * 60)

    auth = AuthManager()
    app = FinanceApp()

    # 1. Login como admin
    print("\n1. INICIO DE SESION (admin / admin123):")
    print("-" * 40)
    success, message, user = auth.login("admin", "admin123")
    print(f"  Estado: {success}")
    print(f"  Mensaje: {message}")
    print(f"  Usuario: {user['username']}")
    print(f"  Nombre: {user['name']}")

    # 2. Registro de nuevo usuario
    print("\n2. REGISTRO DE NUEVO USUARIO:")
    print("-" * 40)

    new_username = "juan_prueba"
    new_password = "Prueba123"
    new_name = "Juan Perez Prueba"

    auth.users = [u for u in auth.users if u["username"] != new_username]

    success, message = auth.register_user(new_username, new_password, new_name)
    print(f"  Usuario: {new_username}")
    print(f"  Nombre: {new_name}")
    print(f"  Estado: {success}")
    print(f"  Mensaje: {message}")

    # 3. Agregar transacciones
    print("\n3. AGREGAR TRANSACCIONES:")
    print("-" * 40)

    transacciones = [
        ("Salario mensual", 3500, "2026-02-01"),
        ("Supermercado", -800, "2026-02-03"),
        ("Gasolina", -200, "2026-02-05"),
        ("Internet", -150, "2026-02-01"),
        ("Alquiler", -900, "2026-02-01"),
        ("Comida restaurante", -120, "2026-02-08"),
        ("Bono", 500, "2026-02-10"),
        ("Pelicula", -80, "2026-02-12"),
    ]

    for desc, amount, date in transacciones:
        app.add_transaction(desc, amount, date)

    print(f"  Agregadas {len(transacciones)} transacciones")

    # 4. Resumen financiero
    print("\n4. RESUMEN FINANCIERO:")
    print("-" * 40)

    app = FinanceApp()

    print(f"  Ingresos:    ${app.get_income():>8.2f}")
    print(f"  Gastos:      ${app.get_expenses():>8.2f}")
    print(f"  Saldo:       ${app.get_total_balance():>8.2f}")
    print(f"  Total:       {len(app.operations)} transacciones")

    # 5. Mostrar usuarios
    print("\n5. USUARIOS REGISTRADOS:")
    print("-" * 40)

    users = _load_users()
    print(f"  Total: {len(users)} usuarios")
    for user in users:
        print(f"  - {user['username']}: {user['name']}")

    print("\n" + "=" * 60)
    print("DEMOSTRACION COMPLETA FINALIZADA")
    print("=" * 60)
    print("\nEl sistema de autenticacion funciona correctamente!")
    print("Puedes iniciar sesion con:")
    print("  Usuario: admin")
    print("  Contraseina: admin123")


def _load_users():
    """Carga la lista de usuarios."""
    from auth import _load_users as lu
    return lu()


if __name__ == "__main__":
    demo()
