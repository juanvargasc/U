package U;
import java.util.Scanner;

public class taller2 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // ============================================================
        // PUNTO 1: Uso básico de vectores - Precios del menú
        // ============================================================
        System.out.println("=== PUNTO 1: Precios del Menú (10 platos) ===");

        int[] precios = new int[10];

        // Solicitar valores al usuario
        for (int i = 0; i < precios.length; i++) {
            System.out.print("Ingrese el precio del plato " + (i + 1) + ": $");
            precios[i] = sc.nextInt();
        }

        // Mostrar todos los elementos
        System.out.println("\nPrecios ingresados:");
        for (int i = 0; i < precios.length; i++) {
            System.out.println("  Plato " + (i + 1) + ": $" + precios[i]);
        }

        // Calcular mayor y menor
        int mayor = precios[0];
        int menor = precios[0];
        for (int i = 1; i < precios.length; i++) {
            if (precios[i] > mayor) mayor = precios[i];
            if (precios[i] < menor) menor = precios[i];
        }
        System.out.println("Plato más caro: $" + mayor);
        System.out.println("Plato más barato: $" + menor);


        // ============================================================
        // PUNTO 2: Suma de elementos - Ventas diarias del restaurante
        // ============================================================
        System.out.println("\n=== PUNTO 2: Ventas Diarias (8 días) ===");

        int[] ventas = new int[8];
        int sumaVentas = 0;

        // Llenar vector con ventas
        for (int i = 0; i < ventas.length; i++) {
            System.out.print("Ingrese las ventas del día " + (i + 1) + ": $");
            ventas[i] = sc.nextInt();
            sumaVentas += ventas[i];
        }

        // Calcular promedio
        double promedio = (double) sumaVentas / ventas.length;
        System.out.println("\nVentas totales: $" + sumaVentas);
        System.out.println("Promedio diario: $" + promedio);

        // Extra: días con ventas mayores al promedio
        int diasSobrePromedio = 0;
        for (int i = 0; i < ventas.length; i++) {
            if (ventas[i] > promedio) diasSobrePromedio++;
        }
        System.out.println("Días con ventas mayores al promedio: " + diasSobrePromedio);


        // ============================================================
        // PUNTO 3: Búsqueda - Buscar un plato por precio
        // ============================================================
        System.out.println("\n=== PUNTO 3: Búsqueda de Precio en el Menú ===");

        int[] menu = new int[6];

        // Ingresar precios
        for (int i = 0; i < menu.length; i++) {
            System.out.print("Ingrese precio del plato " + (i + 1) + ": $");
            menu[i] = sc.nextInt();
        }

        // Solicitar precio a buscar
        System.out.print("\n¿Qué precio desea buscar? $");
        int precioABuscar = sc.nextInt();

        boolean encontrado = false;

        // Buscar en el vector
        for (int i = 0; i < menu.length; i++) {
            if (menu[i] == precioABuscar) {
                System.out.println("Precio $" + precioABuscar + " encontrado en la posición " + i);
                encontrado = true;
            }
        }

        if (!encontrado) {
            System.out.println("El precio $" + precioABuscar + " NO se encuentra en el menú.");
        }


        // ============================================================
        // PUNTO 4: Matriz 3x3 - Ventas por mesa y turno
        // ============================================================
        System.out.println("\n=== PUNTO 4: Ventas por Mesa y Turno (3x3) ===");
        System.out.println("Filas = Mesas (1,2,3) | Columnas = Turnos (Mañana, Tarde, Noche)");

        int[][] ventasMesa = new int[3][3];
        String[] turnos = {"Mañana", "Tarde", "Noche"};
        int sumaTotal = 0;

        // Llenar matriz
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                System.out.print("Mesa " + (i + 1) + " - Turno " + turnos[j] + ": $");
                ventasMesa[i][j] = sc.nextInt();
                sumaTotal += ventasMesa[i][j];
            }
        }

        // Mostrar matriz en forma de tabla
        System.out.println("\nTabla de ventas:");
        System.out.printf("%-10s %-12s %-12s %-12s%n", "", "Mañana", "Tarde", "Noche");
        for (int i = 0; i < 3; i++) {
            System.out.printf("%-10s", "Mesa " + (i + 1));
            for (int j = 0; j < 3; j++) {
                System.out.printf("$%-11d", ventasMesa[i][j]);
            }
            System.out.println();
        }

        System.out.println("Suma total de ventas: $" + sumaTotal);


        // ============================================================
        // PUNTO 5: Operaciones con matrices - Comparar dos semanas
        // ============================================================
        System.out.println("\n=== PUNTO 5: Comparación de Ventas - Semana 1 vs Semana 2 (2x2) ===");
        System.out.println("Filas = Días | Columnas = Turnos");

        int[][] semana1 = new int[2][2];
        int[][] semana2 = new int[2][2];
        int[][] sumaSemanas = new int[2][2];
        int[][] multSemanas = new int[2][2];

        // Llenar semana 1
        System.out.println("\n-- Semana 1 --");
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                System.out.print("Día " + (i + 1) + " Turno " + (j + 1) + ": $");
                semana1[i][j] = sc.nextInt();
            }
        }

        // Llenar semana 2
        System.out.println("\n-- Semana 2 --");
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                System.out.print("Día " + (i + 1) + " Turno " + (j + 1) + ": $");
                semana2[i][j] = sc.nextInt();
            }
        }

        // Suma de matrices
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                sumaSemanas[i][j] = semana1[i][j] + semana2[i][j];
            }
        }

        // Multiplicación de matrices (Extra)
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                multSemanas[i][j] = 0;
                for (int k = 0; k < 2; k++) {
                    multSemanas[i][j] += semana1[i][k] * semana2[k][j];
                }
            }
        }

        // Mostrar resultados
        System.out.println("\n-- Semana 1 --");
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                System.out.printf("$%-8d", semana1[i][j]);
            }
            System.out.println();
        }

        System.out.println("\n-- Semana 2 --");
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                System.out.printf("$%-8d", semana2[i][j]);
            }
            System.out.println();
        }

        System.out.println("\n-- Suma de Semanas --");
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                System.out.printf("$%-8d", sumaSemanas[i][j]);
            }
            System.out.println();
        }

        System.out.println("\n-- Multiplicación de Semanas (Extra) --");
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                System.out.printf("$%-8d", multSemanas[i][j]);
            }
            System.out.println();
        }

        sc.close();
        System.out.println("\n¡Taller completado! 🍽️");
    }
}
