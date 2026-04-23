package U;
import java.util.Scanner;
public class parte4 {
public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
// Mensajes
System.out.println("PUNTO 4: Ventas por Zona y Turno (3x3)");
        System.out.println("Filas = Zonas (Norte, Centro, Sur)");
        System.out.println("Columnas = Turnos (Mañana, Tarde, Noche)");

        int[][] ventas = new int[3][3];
        String[] zonas   = {"Norte", "Centro", "Sur"};
        String[] turnos  = {"Mañana", "Tarde", "Noche"};
        int sumaVentas = 0;

        // Ingresar ventas
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                System.out.print("Ventas Zona " + zonas[i] + " - Turno " + turnos[j] + " ($): ");
                ventas[i][j] = sc.nextInt();
                sumaVentas += ventas[i][j];
            }
        }

        // tabla
        System.out.println("Tabla de Ventas ");
        System.out.printf("%-10s %12s %12s %12s%n", "Zona", "Mañana", "Tarde", "Noche");
        System.out.println("--------------------------------------------------");
        for (int i = 0; i < 3; i++) {
            System.out.printf("%-10s", zonas[i]);
            for (int j = 0; j < 3; j++) {
                System.out.printf(" %11s", "$" + ventas[i][j]);
            }
            System.out.println();
        }
        System.out.println("Ventas totales del restaurante: $" + sumaVentas);
    }
}
