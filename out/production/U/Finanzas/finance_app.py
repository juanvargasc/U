"""Aplicación de gestión de finanzas personales."""
import json
from pathlib import Path

from auth import AuthManager, _load_users

REPORTING_MODULE = "ReportGenerator"


class Transaction:
    """Representa una transacción financiera."""

    def __init__(self, description: str, amount: float, date: str):
        self.description = description
        self.amount = amount
        self.date = date

    def to_dict(self) -> dict:
        """Convierte la transacción a diccionario."""
        return {
            "description": self.description,
            "amount": self.amount,
            "date": self.date
        }

    @classmethod
    def from_dict(cls, data: dict) -> "Transaction":
        """Crea una transacción desde un diccionario."""
        return cls(
            description=data["description"],
            amount=data["amount"],
            date=data["date"]
        )


class FinanceApp:
    """Aplicación principal de gestión de finanzas."""

    def __init__(self):
        """Inicializa la aplicación de finanzas."""
        self.auth = AuthManager()
        self.data_file = Path(__file__).parent / "finanzas.json"
        self._load_transactions()

        # Categorías por defecto
        self.categories = [
            "Alimentos",
            "Transporte",
            "Vivienda",
            "Salud",
            "Entretenimiento",
            "Educción",
            "Salarios",
            "Inversiones",
            "Otros Ingresos",
            "Otros Gastos"
        ]

        # Estado de transacciones
        self.operations = []

    def _load_transactions(self):
        """Carga las transacciones desde el archivo."""
        if self.data_file.exists():
            try:
                with open(self.data_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    self.operations = [
                        Transaction.from_dict(op) for op in data.get("operations", [])
                    ]
            except (json.JSONDecodeError, IOError):
                self.operations = []

    def _save_transactions(self):
        """Guarda las transacciones en el archivo."""
        data = {"operations": [op.to_dict() for op in self.operations]}
        with open(self.data_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

    def add_transaction(self, description: str, amount: float, date: str):
        """
        Agrega una nueva transacción.

        Args:
            description: Descripción de la transacción
            amount: Monto (positivo para ingresos, negativo para gastos)
            date: Fecha de la transacción (formato YYYY-MM-DD)
        """
        self.operations.append(Transaction(description, amount, date))
        self._save_transactions()

    def delete_transaction(self, index: int):
        """Elimina una transacción por su índice."""
        if 0 <= index < len(self.operations):
            deleted = self.operations.pop(index)
            self._save_transactions()
            return deleted
        return None

    def get_total_balance(self) -> float:
        """Calcula el saldo total."""
        return sum(op.amount for op in self.operations)

    def get_income(self) -> float:
        """Calcula los ingresos totales."""
        return sum(op.amount for op in self.operations if op.amount > 0)

    def get_expenses(self) -> float:
        """Calcula los gastos totales."""
        return sum(op.amount for op in self.operations if op.amount < 0)

    def get_transactions_by_category(self, category: str) -> list:
        """
        Obtiene transacciones por categoría.

        Args:
            category: Nombre de la categoría

        Returns:
            Lista de transacciones en esa categoría
        """
        return [op for op in self.operations if category.lower() in description.lower()]


def show_login_screen(auth_manager: AuthManager) -> None:
    """Muestra la pantalla de login."""
    print("\n" + "=" * 40)
    print("  SISTEMA DE GESTIÓN DE FINANZAS")
    print("=" * 40)
    print("\n  Opciones:")
    print("  1. Login")
    print("  2. Registrarse como nuevo usuario")
    print("  3. S盐ir (si ya estás logueado)")
    print("-" * 40)

    choice = input("Elige una opción (1-3): ").strip()

    if choice == "1":
        username = input("\nNombre de usuario: ").strip()
        password = input("Contraseña: ").strip()

        success, message, user = auth_manager.login(username, password)

        if success:
            print(f"\n  {message}")
            print(f"  Usuario: {user['username']}")
            print(f"  Nombre: {user['name']}")
            return user
        else:
            print(f"\n  {message}")
            return None

    elif choice == "2":
        username = input("\nNombre de usuario: ").strip()
        if not username:
            return None

        name = input("Nombre completo: ").strip()
        if not name:
            return None

        password = input("Contraseña (mínimo 6 caracteres): ").strip()
        if len(password) < 6:
            print("La contraseña debe tener al menos 6 caracteres")
            return None

        success, message = auth_manager.register_user(username, password, name)

        if success:
            print(f"\n  {message}")
            print(f"\n  Ahora inicia sesión con tu nuevo usuario: {username}")
            print("  Presiona Enter para continuar...")
            input()
        else:
            print(f"\n  {message}")

        # Volver al login
        return show_login_screen(auth_manager)

    elif choice == "3":
        auth_manager.logout()
        print("\n  Has cerrado sesión.")
        print("  Presiona Enter para continuar...")
        input()
        return None

    print("\n  Opción no válida")
    return None


def show_user_menu(user: dict) -> None:
    """Muestra el menú principal para el usuario logueado."""
    print("\n" + "=" * 50)
    print(f"  MENÚ PRINCIPAL - {user['name']}")
    print("=" * 50)
    print("\n  1. Agregar transacción")
    print("  2. Ver transacciones")
    print("  3. Ver resumen (ingresos, gastos, saldo)")
    print("  4. Categorías de gastos")
    print("  5. Exportar reportes (PDF/Excel)")
    print("  6. Cerrar sesión")
    print("=" * 50)


def main():
    """Función principal de la aplicación."""
    app = FinanceApp()

    # Mostrar pantalla de login si no hay sesión
    if not app.auth.check_session():
        current_user = show_login_screen(app.auth)
        if not current_user:
            return  # Usuario cerró sesión o salió

        # Cargar sesión actual
        app.auth.session = app.auth.get_current_user()

    # Usuario logueado
    print(f"\n  Bienvenido/a de nuevo, {app.auth.get_current_user()['name']}!")
    print("=" * 50)

    while True:
        # Mostrar menú
        if app.auth.check_session():
            show_user_menu(app.auth.get_current_user())

        try:
            choice = input("\nElige una opción (1-6 o q para salir): ").strip().lower()

            if choice == "q":
                app.auth.logout()
                print("\n  ¡Hasta pronto!")
                break

            elif choice == "1":
                # Agregar transacción
                print("\n" + "-" * 40)
                print("  AGREGAR TRANSACCIÓN")
                print("-" * 40)

                desc = input("Descripción: ").strip()
                if not desc:
                    continue

                amount_input = input("Monto (positivo=ingreso, negativo=gasto): ").strip()
                try:
                    amount = float(amount_input)
                except ValueError:
                    print("Por favor, ingresa un número válido")
                    continue

                date = input("Fecha (YYYY-MM-DD, dejar vacío para hoy): ").strip()
                if not date:
                    from datetime import datetime
                    date = datetime.now().strftime("%Y-%m-%d")

                app.add_transaction(desc, amount, date)
                print(f"\n  ✓ Transacción agregada: {desc} (${abs(amount):.2f})")

            elif choice == "2":
                # Ver transacciones
                print("\n" + "-" * 40)
                print("  TRANSACCIONES REGISTRADAS")
                print("-" * 40)

                if not app.operations:
                    print("\n  No hay transacciones registradas.")
                else:
                    # Mostrar resumen
                    print(f"\n  Resumen:")
                    print(f"  Ingresos: ${app.get_income():.2f}")
                    print(f"  Gastos: ${app.get_expenses():.2f}")
                    print(f"  Saldo: ${app.get_total_balance():.2f}")

                    print(f"\n  Detalle ({len(app.operations)} transacciones):")
                    print("-" * 40)
                    for i, op in enumerate(app.operations, 1):
                        sign = "+" if op.amount > 0 else ""
                        print(f"  {i}. {op.date} | {op.description:.<40} | {sign}${op.amount:8.2f}")
                    print("-" * 40)

                input("\nPresiona Enter para continuar...")

            elif choice == "3":
                # Ver resumen
                print("\n" + "-" * 40)
                print("  RESUMEN FINANCIERO")
                print("-" * 40)
                print(f"\n  Ingresos: ${app.get_income():.2f}")
                print(f"  Gastos:   ${app.get_expenses():.2f}")
                print(f"  Saldo:    ${app.get_total_balance():.2f}")
                print("-" * 40)
                print(f"\n  Total transacciones: {len(app.operations)}")

                input("\nPresiona Enter para continuar...")

            elif choice == "4":
                # Mostrar categorías
                print("\n" + "-" * 40)
                print("  CATEGORÍAS DESPENDIDAS")
                print("-" * 40)

                print("\n  Categorías disponibles:")
                for cat in app.categories:
                    print(f"    • {cat}")

                print("-" * 40)

                input("\nPresiona Enter para continuar...")

            elif choice == "5":
                # Exportar reportes (usando ReportGenerator)
                from ReportGenerator import generate_reports
                print("\n" + "-" * 40)
                print("  EXPORTAR REPORTES")
                print("-" * 40)
                print("\n  Opciones de exportación:")
                print("    1. PDF")
                print("    2. Excel")
                print("    3. Ambos")
                choice_report = input("Elige una opción (1-3): ").strip()

                if choice_report == "1":
                    generate_reports(app.operations, format="pdf")
                elif choice_report == "2":
                    generate_reports(app.operations, format="excel")
                elif choice_report == "3":
                    generate_reports(app.operations, format="pdf")
                    generate_reports(app.operations, format="excel")

                input("\nPresiona Enter para continuar...")

            elif choice == "6":
                # Cerrar sesión
                app.auth.logout()
                print("\n  Has cerrado sesión.")
                break

            else:
                print("\n  Opción no válida")

        except KeyboardInterrupt:
            print("\n\n  Interrumpido por el usuario.")
            break
        except Exception as e:
            print(f"\n  Error: {e}")

    print("\n  ¡Hasta pronto!")


if __name__ == "__main__":
    main()