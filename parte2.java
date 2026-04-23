package U;
import java.util.Scanner;
    public class parte2 {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int[] vector = new int[8];
        int suma = 0;
        double promedio;

        
        for (int i = 0; i < 8; i++) {
            System.out.print("Ingrese la cantidad de clientes que llegaron el dia " + (i + 1) + ": ");
            vector[i] = sc.nextInt();
            suma += vector[i];
        }

       
        promedio = (double) suma / 8;

        
        System.out.println("La suma total es: " + suma);
        System.out.println("El promedio es: " + promedio);
    }
}
