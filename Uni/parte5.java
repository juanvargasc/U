
import java.util.Scanner;

public class parte5 {
    public static void main(String[] args) {
           Scanner scanner = new Scanner(System.in);

        int[][] semana1 = new int[2][2];
        int[][] semana2 = new int[2][2];
        int[][] suma = new int[2][2];
        int[][] multiplicacion = new int[2][2];

        System.out.println("Matriz 1 (Platos  vendidos en Semana 1):");
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                System.out.print("Ingrese valor [" + i + "][" + j + "]: ");
                semana1[i][j] = scanner.nextInt();
            }
        }

        System.out.println("Matriz 2 (Platos vendidos en Semana 2):");
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                System.out.print("Ingrese valor [" + i + "][" + j + "]: ");
                semana2[i][j] = scanner.nextInt();
            }
        }

        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                suma[i][j] = semana1[i][j] + semana2[i][j];
            }
        }

        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                multiplicacion[i][j] = 0;
                for (int k = 0; k < 2; k++) {
                    multiplicacion[i][j] += semana1[i][k] * semana2[k][j];
                }
            }
        }

        System.out.println("Matriz 1:");
        mostrarMatriz(semana1);

        System.out.println("Matriz 2:");
        mostrarMatriz(semana2);

        System.out.println("Suma de matrices:");
        mostrarMatriz(suma);

        System.out.println("Multiplicación de matrices:");
        mostrarMatriz(multiplicacion);
    }

    public static void mostrarMatriz(int[][] matriz) {
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                System.out.print(matriz[i][j] + "");
            }
            System.out.println();
        }
    }
}


