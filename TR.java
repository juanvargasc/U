package U;
import java.util.Scanner;

public class TR {
public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    // =====================================================
    // PUNTO 1: Uso básico de vectores
    // Contexto: Precios de 10 platos del menú
    // =====================================================
    System.out.println("=== PUNTO 1: Precios del Menú (10 platos) ===");

    double[] precios = new double[10];

    // Solicitar precios al usuario
    for (int i = 0; i < precios.length; i++) {
        System.out.print("Ingrese el precio del plato " + (i + 1) + ": $");
        precios[i] = sc.nextDouble();
    }

    // Mostrar todos los precios
    System.out.println("\n--- Lista de precios del menú ---");
    for (int i = 0; i < precios.length; i++) {
        System.out.println("Plato " + (i + 1) + ": $" + precios[i]);
    }

    // Calcular mayor y menor precio
    double mayor = precios[0];
    double menor = precios[0];
    for (int i = 1; i < precios.length; i++) {
        if (precios[i] > mayor) mayor = precios[i];
        if (precios[i] < menor) menor = precios[i];
    }
    System.out.println("Plato más caro:   $" + mayor);
    System.out.println("Plato más barato: $" + menor);

    // =====================================================
    // PUNTO 2: Suma de elementos en un vector
    // Contexto: Número de clientes atendidos en 8 días
    // =====================================================
    System.out.println("\n=== PUNTO 2: Clientes Atendidos en 8 Días ===");

    int[] clientes = new int[8];
    int sumaClientes = 0;

    // Ingresar clientes por día
    for (int i = 0; i < clientes.length; i++) {
        System.out.print("Clientes atendidos el día " + (i + 1) + ": ");
        clientes[i] = sc.nextInt();
        sumaClientes += clientes[i];
    }

    double promedio = (double) sumaClientes / clientes.length;

    System.out.println("\nTotal de clientes en 8 días: " + sumaClientes);
    System.out.printf("Promedio diario de clientes: %.2f%n", promedio);

    // Extra: días con clientes por encima del promedio
    int diasSobrePromedio = 0;
    for (int i = 0; i < clientes.length; i++) {
        if (clientes[i] > promedio) diasSobrePromedio++;
    }
    System.out.println("Días con clientes por encima del promedio: " + diasSobrePromedio);

    // =====================================================
    // PUNTO 3: Búsqueda en un vector
    // Contexto: Buscar un número de mesa en el restaurante
    // =====================================================
    System.out.println("\n=== PUNTO 3: Búsqueda de Mesa Reservada ===");

    int[] mesas = new int[6];

    System.out.println("Ingrese los números de las 6 mesas reservadas:");
    for (int i = 0; i < mesas.length; i++) {
        System.out.print("Mesa " + (i + 1) + ": ");
        mesas[i] = sc.nextInt();
    }

    System.out.print("\n¿Qué número de mesa desea buscar? ");
    int mesaBuscada = sc.nextInt();

    boolean encontrada = false;
    System.out.println("Resultados de búsqueda para mesa N°" + mesaBuscada + ":");
    for (int i = 0; i < mesas.length; i++) {
        if (mesas[i] == mesaBuscada) {
            System.out.println("  ✔ Encontrada en la posición " + (i + 1));
            encontrada = true;
        }
    }

    if (!encontrada) {
        System.out.println("  ✘ La mesa N°" + mesaBuscada + " no está reservada.");
    }

    // =====================================================
    // PUNTO 4: Uso de matrices
    // Contexto: Ventas (en miles) por 3 zonas y 3 turnos
    // =====================================================
    System.out.println("\n=== PUNTO 4: Ventas por Zona y Turno (3x3) ===");
    System.out.println("Filas = Zonas (Norte, Centro, Sur)");
    System.out.println("Columnas = Turnos (Mañana, Tarde, Noche)");

    double[][] ventas = new double[3][3];
    String[] zonas   = {"Norte", "Centro", "Sur"};
    String[] turnos  = {"Mañana", "Tarde", "Noche"};
    double sumaVentas = 0;

    // Ingresar ventas
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            System.out.print("Ventas Zona " + zonas[i] + " - Turno " + turnos[j] + " ($): ");
            ventas[i][j] = sc.nextDouble();
            sumaVentas += ventas[i][j];
        }
    }

    // Mostrar matriz como tabla
    System.out.println("\n--- Tabla de Ventas ---");
    System.out.printf("%-10s %10s %10s %10s%n", "Zona", "Mañana", "Tarde", "Noche");
    System.out.println("------------------------------------------");
    for (int i = 0; i < 3; i++) {
        System.out.printf("%-10s", zonas[i]);
        for (int j = 0; j < 3; j++) {
            System.out.printf(" %10.2f", ventas[i][j]);
        }
        System.out.println();
    }
    System.out.printf("%nVentas totales del restaurante: $%.2f%n", sumaVentas);

    // =====================================================
    // PUNTO 5: Operaciones con matrices
    // Contexto: Comparar pedidos de dos semanas (2x2)
    // Filas = Fin de semana / Entre semana
    // Columnas = Comida / Bebida
    // =====================================================
    System.out.println("\n=== PUNTO 5: Pedidos de Dos Semanas (2x2) ===");
    System.out.println("Filas: [0]=Fin de semana  [1]=Entre semana");
    System.out.println("Columnas: [0]=Comida  [1]=Bebida");

    int[][] semana1 = new int[2][2];
    int[][] semana2 = new int[2][2];
    int[][] sumaSemanas = new int[2][2];
    int[][] multSemanas = new int[2][2];

    String[] filas = {"Fin de semana", "Entre semana"};
    String[] cols  = {"Comida", "Bebida"};

    // Ingresar semana 1
    System.out.println("\n-- Pedidos Semana 1 --");
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++) {
            System.out.print(filas[i] + " - " + cols[j] + ": ");
            semana1[i][j] = sc.nextInt();
        }

    // Ingresar semana 2
    System.out.println("\n-- Pedidos Semana 2 --");
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++) {
            System.out.print(filas[i] + " - " + cols[j] + ": ");
            semana2[i][j] = sc.nextInt();
        }

    // Suma de matrices
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++)
            sumaSemanas[i][j] = semana1[i][j] + semana2[i][j];

    // Multiplicación de matrices (Extra)
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++)
            for (int k = 0; k < 2; k++)
                multSemanas[i][j] += semana1[i][k] * semana2[k][j];

    // Mostrar resultados
    System.out.println("\n--- Semana 1 ---");
    imprimirMatriz(semana1, filas, cols);

    System.out.println("\n--- Semana 2 ---");
    imprimirMatriz(semana2, filas, cols);

    System.out.println("\n--- Suma de Semanas ---");
    imprimirMatriz(sumaSemanas, filas, cols);

    System.out.println("\n--- Multiplicación de Matrices (Extra) ---");
    imprimirMatriz(multSemanas, filas, cols);

    sc.close();
    System.out.println("\n¡Taller completado exitosamente!");
}

// Método auxiliar para imprimir una matriz 2x2 con etiquetas
static void imprimirMatriz(int[][] m, String[] filas, String[] cols) {
    System.out.printf("%-20s %10s %10s%n", "", cols[0], cols[1]);
    System.out.println("------------------------------------------");
    for (int i = 0; i < m.length; i++) {
        System.out.printf("%-20s", filas[i]);
        for (int j = 0; j < m[i].length; j++) {
            System.out.printf(" %10d", m[i][j]);
        }
        System.out.println();
    }
}

}

