#!/usr/bin/env python3
"""
Organizador de Finanzas Personal
===============================
Sistema completo para gestión de ingresos, gastos, presupuestos y análisis de gastos.
"""

import json
import csv
from datetime import datetime, timedelta
from pathlib import Path
from typing import Optional
from dataclasses import dataclass, field, asdict
from enum import Enum
from collections import defaultdict


class TransactionType(Enum):
    """Tipos de transacciones"""
    INCOME = "income"
    EXPENSE = "expense"
    TRANSFER = "transfer"
    INVESTMENT = "investment"
    INVESTMENT_RETURN = "investment_return"
    SAVING = "saving"


@dataclass
class Transaction:
    """Modelo de transacción"""
    id: str
    type: TransactionType
    amount: float
    category: str
    description: str
    date: datetime
    account: str = "general"

    def to_dict(self) -> dict:
        """Convertir a diccionario para serialización JSON"""
        return {
            "id": self.id,
            "type": self.type.value,
            "amount": self.amount,
            "category": self.category,
            "description": self.description,
            "date": self.date.strftime("%Y-%m-%d %H:%M:%S"),
            "account": self.account
        }


class Budget:
    """Gestión de presupuesto"""

    def __init__(self):
        self.budgets = {}
        self.category_limits = {}

    def set_limit(self, category: str, limit: float, period: str = "monthly") -> None:
        """Establecer límite para una categoría"""
        self.category_limits[category] = {
            "limit": limit,
            "period": period,
            "period_start": datetime.now()
        }

    def add_budget(self, name: str, amount: float, categories: list[str]) -> None:
        """Agregar presupuesto para múltiples categorías"""
        self.budgets[name] = {
            "amount": amount,
            "categories": categories
        }

    def get_remaining(self, category: str) -> float:
        """Calcular presupuesto restante"""
        if category not in self.category_limits:
            return 0.0

        limit_info = self.category_limits[category]
        spent = sum(
            t.amount for t in TransactionList.transactions
            if t.category == category and t.type == TransactionType.EXPENSE
        )
        return limit_info["limit"] - spent

    def get_progress(self, category: str) -> float:
        """Obtener progreso de gasto (porcentaje)"""
        limit = self.category_limits.get(category, {}).get("limit", 0)
        if limit == 0:
            return 0.0
        spent = sum(
            t.amount for t in TransactionList.transactions
            if t.category == category and t.type == TransactionType.EXPENSE
        )
        return (spent / limit) * 100


class TransactionList:
    """Lista y gestión de transacciones"""

    transactions = []

    @staticmethod
    def add_transaction(t: Transaction) -> None:
        TransactionList.transactions.append(t)
        TransactionList.transaction_counter += 1

    @staticmethod
    def get_by_date_range(start: datetime, end: datetime) -> list[Transaction]:
        """Obtener transacciones en rango de fechas"""
        return [
            t for t in TransactionList.transactions
            if start <= t.date <= end
        ]

    @staticmethod
    def get_by_category(category: str) -> list[Transaction]:
        """Obtener transacciones por categoría"""
        return [
            t for t in TransactionList.transactions
            if t.category.lower() == category.lower()
        ]

    @staticmethod
    def get_monthly_summary() -> dict[str, dict]:
        """Obtener resumen mensual de transacciones"""
        monthly = defaultdict(lambda: {"income": 0, "expenses": 0, "transactions": []})

        for t in TransactionList.transactions:
            month_key = t.date.strftime("%Y-%m")
            if t.type == TransactionType.INCOME:
                monthly[month_key]["income"] += t.amount
            elif t.type == TransactionType.EXPENSE:
                monthly[month_key]["expenses"] += t.amount
                monthly[month_key]["transactions"].append(t.category)

        return dict(monthly)

    @staticmethod
    def get_total() -> tuple[float, float]:
        """Obtener totales de ingresos y gastos"""
        income = sum(
            t.amount for t in TransactionList.transactions
            if t.type in [TransactionType.INCOME, TransactionType.INVESTMENT_RETURN]
        )
        expenses = sum(
            t.amount for t in TransactionList.transactions
            if t.type == TransactionType.EXPENSE
        )
        return income, expenses


# --- GENERADOR DE INFORMES ---

class ReportGenerator:
    """Generador de informes financieros"""

    @staticmethod
    def generate_summary_report() -> str:
        """Generar informe de resumen"""
        income, expenses = TransactionList.get_total()
        balance = income - expenses

        report = []
        report.append("=" * 60)
        report.append("              INFORME FINANCIERO - RESUMEN")
        report.append("=" * 60)
        report.append(f"Fecha de reporte: {datetime.now().strftime('%d/%m/%Y %H:%M')}")
        report.append("=" * 60)
        report.append("")
        report.append("RESUMEN GENERAL")
        report.append("-" * 40)
        report.append(f"  Ingresos totales:     ${income:,.2f}")
        report.append(f"  Gastos totales:       ${expenses:,.2f}")
        report.append(f"  Balance neto:         ${balance:,.2f}")
        report.append("")
        report.append("=" * 60)

        return "\n".join(report)

    @staticmethod
    def generate_category_breakdown() -> str:
        """Generar informe de desglose por categorías"""
        income, expenses = TransactionList.get_total()

        report = []
        report.append("=" * 60)
        report.append("            INFORME - DESGLOSE POR CATEGORÍAS")
        report.append("=" * 60)
        report.append(f"Fecha: {datetime.now().strftime('%d/%m/%Y')}")
        report.append("=" * 60)
        report.append("")
        report.append("CATEGORÍAS DE GASTO")
        report.append("-" * 40)

        categories = defaultdict(float)
        for t in TransactionList.transactions:
            if t.type == TransactionType.EXPENSE:
                categories[t.category] += t.amount

        total_expenses = sum(categories.values())

        for category, amount in sorted(categories.items(), key=lambda x: x[1], reverse=True):
            percentage = (amount / total_expenses * 100) if total_expenses > 0 else 0
            bar = "█" * int(percentage / 2)
            report.append(f"  {category:20} ${amount:10,.2f} ({percentage:5.1f}%) {bar}")

        report.append("")
        report.append(f"  TOTAL GASTOS:                    ${total_expenses:,.2f}")
        report.append("")
        report.append(f"INGRESOS POR CATEGORÍA")
        report.append("-" * 40)

        income_categories = defaultdict(float)
        for t in TransactionList.transactions:
            if t.type in [TransactionType.INCOME, TransactionType.INVESTMENT_RETURN]:
                income_categories[t.category] += t.amount

        for category, amount in sorted(income_categories.items(), key=lambda x: x[1], reverse=True):
            report.append(f"  {category:20} ${amount:10,.2f}")

        return "\n".join(report)

    @staticmethod
    def generate_cashflow_report() -> str:
        """Generar informe de flujo de caja"""
        report = []
        report.append("=" * 60)
        report.append("              INFORME - FLUJO DE CAJA")
        report.append("=" * 60)
        report.append(f"Fecha: {datetime.now().strftime('%d/%m/%Y')}")
        report.append("=" * 60)
        report.append("")
        report.append("MENSUALIDAD")
        report.append("-" * 40)
        report.append(f"  Periodo: Ene - {datetime.now().strftime('%Y-%m')}")

        monthly = TransactionList.get_monthly_summary()

        sorted_months = sorted(monthly.keys())

        for month in sorted_months:
            data = monthly[month]
            report.append(f"\n  {month}")
            report.append(f"    Ingresos:  ${data['income']:,.2f}")
            report.append(f"    Gastos:    ${data['expenses']:,.2f}")
            report.append(f"    Net:       ${data['income'] - data['expenses']:,.2f}")

        report.append("")
        report.append("=" * 60)
        report.append("DETALLE DE TRANSACCIONES RECENTES")
        report.append("-" * 40)

        recent = TransactionList.transactions[-20:]
        for t in reversed(recent):
            report.append(f"\n  [{t.date.strftime('%d/%m')} - {t.account}]")
            if t.type == TransactionType.INCOME:
                report.append(f"    +${t.amount:,.2f} | {t.description} | {t.category}")
            elif t.type == TransactionType.EXPENSE:
                report.append(f"    -${t.amount:,.2f} | {t.description} | {t.category}")

        return "\n".join(report)

    @staticmethod
    def generate_budget_status_report() -> str:
        """Generar informe de estado del presupuesto"""
        budget = Budget()

        report = []
        report.append("=" * 60)
        report.append("         INFORME - ESTADO DEL PRESUPUESTO")
        report.append("=" * 60)
        report.append(f"Fecha: {datetime.now().strftime('%d/%m/%Y')}")
        report.append("=" * 60)
        report.append("")
        report.append("CATEGORÍAS Y ESTADO")
        report.append("-" * 40)

        # Agregar límites por defecto
        budget.set_limit("Alimentación", 1000)
        budget.set_limit("Transporte", 500)
        budget.set_limit("Entretenimiento", 300)
        budget.set_limit("Salud", 200)
        budget.set_limit("Servicios", 300)
        budget.set_limit("Otros", 500)

        total_spent = 0
        total_limit = 0

        for category, limit_info in budget.category_limits.items():
            remaining = budget.get_remaining(category)
            progress = budget.get_progress(category)
            total_spent += limit_info["limit"]

            if progress >= 100:
                status = "⚠ SOBRE PRESUPUESTO"
                bar = "▓" * int(100 / 2)
            elif progress >= 80:
                status = "⚠ ALERTA"
                bar = "░" * int(80 / 2)
            elif progress >= 60:
                status = "✓ EN RANGO"
                bar = "▒" * int(60 / 2)
            else:
                status = "✓ BIEN"
                bar = "░" * int(progress / 2)

            report.append(f"\n  {category}")
            report.append(f"    Límite: ${limit_info['limit']:,.2f}")
            report.append(f"    Gasto:  ${limit_info['limit'] - remaining:,.2f} ({progress:.1f}%)")
            report.append(f"    Restante: ${remaining:,.2f}")
            report.append(f"    Estado: {status}")
            report.append(f"    Progreso: [{bar}]")

        report.append("")
        report.append("=" * 60)
        report.append(f"Total Límite: ${total_spent:,.2f}")
        report.append(f"Total Gasto:  ${total_spent - sum(budget.get_remaining(c) for c in budget.category_limits):,.2f}")
        report.append("=" * 60)

        return "\n".join(report)


# --- CLASE PRINCIPAL ---

class FinanceManager:
    """Clase principal para gestión de finanzas"""

    def __init__(self, data_file: str = "finanzas.json"):
        self.data_file = Path(data_file)
        self.report_generator = ReportGenerator()
        self._load_data()

    def _load_data(self) -> None:
        """Cargar datos del archivo"""
        TransactionList.transactions = []
        if self.data_file.exists():
            try:
                with open(self.data_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    for t_data in data.get('transactions', []):
                        t = Transaction(
                            id=t_data['id'],
                            type=TransactionType(t_data['type']),
                            amount=t_data['amount'],
                            category=t_data['category'],
                            description=t_data['description'],
                            date=datetime.fromisoformat(t_data['date'].replace('Z', '+00:00')),
                            account=t_data.get('account', 'general')
                        )
                        TransactionList.add_transaction(t)
            except Exception as e:
                print(f"Error al cargar datos: {e}")

    def add_income(self, amount: float, category: str, description: str, date: datetime = None) -> Transaction:
        """Agregar ingreso"""
        if date is None:
            date = datetime.now()
        t = Transaction(
            id=f"inc_{date.strftime('%Y%m%d')}_{len(TransactionList.transactions) + 1}",
            type=TransactionType.INCOME,
            amount=amount,
            category=category,
            description=description,
            date=date
        )
        TransactionList.add_transaction(t)
        self.save_data()
        return t

    def add_expense(self, amount: float, category: str, description: str, date: datetime = None) -> Transaction:
        """Agregar gasto"""
        if date is None:
            date = datetime.now()
        t = Transaction(
            id=f"exp_{date.strftime('%Y%m%d')}_{len(TransactionList.transactions) + 1}",
            type=TransactionType.EXPENSE,
            amount=amount,
            category=category,
            description=description,
            date=date
        )
        TransactionList.add_transaction(t)
        self.save_data()
        return t

    def save_data(self) -> None:
        """Guardar datos en archivo"""
        data = {
            "transactions": [t.to_dict() for t in TransactionList.transactions]
        }
        with open(self.data_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

    def generate_reports(self) -> dict[str, str]:
        """Generar todos los informes"""
        return {
            "resumen": self.report_generator.generate_summary_report(),
            "categorias": self.report_generator.generate_category_breakdown(),
            "flujo_caja": self.report_generator.generate_cashflow_report(),
            "presupuesto": self.report_generator.generate_budget_status_report()
        }


def export_to_csv(manager: FinanceManager) -> str:
    """Exportar transacciones a CSV"""
    filename = "transacciones.csv"

    with open(filename, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(["ID", "Tipo", "Cantidad", "Categoría", "Descripción", "Fecha", "Cuenta"])

        for t in TransactionList.transactions:
            writer.writerow([
                t.id,
                t.type.value,
                t.amount,
                t.category,
                t.description,
                t.date.strftime("%d/%m/%Y %H:%M:%S"),
                t.account
            ])

    return filename


def print_report(manager: FinanceManager) -> None:
    """Imprimir todos los informes"""
    reports = manager.generate_reports()
    for name, report in reports.items():
        print(report)
        print("")


def main():
    """Función principal"""
    print("=" * 60)
    print("  ORGANIZADOR DE FINANZAS PERSONAL")
    print("=" * 60)
    print("")
    print("Bienvenido al sistema de gestión de finanzas.")
    print("")

    manager = FinanceManager()

    while True:
        print("\n" + "=" * 60)
        print("MENÚ PRINCIPAL")
        print("=" * 60)
        print("1. Agregar Ingreso")
        print("2. Agregar Gasto")
        print("3. Ver Informes de Resumen")
        print("4. Ver Desglose por Categorías")
        print("5. Ver Flujo de Caja Mensual")
        print("6. Ver Estado del Presupuesto")
        print("7. Exportar a CSV")
        print("8. Ver Transacciones")
        print("9. Salir")
        print("=" * 60)

        choice = input("\nSeleccione una opción (1-9): ").strip()

        if choice == "1":
            amount = float(input("Monto del ingreso: $"))
            category = input("Categoría (ej. Salario, Inversión, Otro): ").strip()
            description = input("Descripción: ").strip()
            date_str = input("Fecha (YYYY-MM-DD, dejar vacío para hoy): ").strip()

            if date_str:
                date = datetime.strptime(date_str, "%Y-%m-%d")
            else:
                date = datetime.now()

            manager.add_income(amount, category, description, date)
            print(f"\n✓ Ingreso de ${amount:,.2f} agregado correctamente")

        elif choice == "2":
            amount = float(input("Monto del gasto: $"))
            category = input("Categoría (ej. Comida, Transporte, Salud): ").strip()
            description = input("Descripción: ").strip()
            date_str = input("Fecha (YYYY-MM-DD, dejar vacío para hoy): ").strip()

            if date_str:
                date = datetime.strptime(date_str, "%Y-%m-%d")
            else:
                date = datetime.now()

            manager.add_expense(amount, category, description, date)
            print(f"\n✓ Gasto de ${amount:,.2f} agregado correctamente")

        elif choice == "3":
            print("\n" + manager.generate_reports()["resumen"])

        elif choice == "4":
            print("\n" + manager.generate_reports()["categorias"])

        elif choice == "5":
            print("\n" + manager.generate_reports()["flujo_caja"])

        elif choice == "6":
            print("\n" + manager.generate_reports()["presupuesto"])

        elif choice == "7":
            filename = export_to_csv(manager)
            print(f"\n✓ Transacciones exportadas a: {filename}")

        elif choice == "8":
            print("\n" + "=" * 60)
            print("TRANSACCIONES")
            print("=" * 60)
            for i, t in enumerate(TransactionList.transactions[-50:], 1):
                type_str = "↑" if t.type.value in ["income", "investment_return"] else "↓"
                arrow = "+" if t.type.value in ["income", "investment_return"] else "-"
                print(f"{i}. {type_str} [{t.date.strftime('%d/%m/%Y')}] {t.description}")
                print(f"   {arrow}${t.amount:,.2f} | {t.category} | {t.account}")
            print("=" * 60)

        elif choice == "9":
            print("\n👋 ¡Hasta pronto! Sus finanzas están organizadas.")
            print("=" * 60)
            break


if __name__ == "__main__":
    main()
