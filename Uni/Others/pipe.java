
import java.util.Scanner;

public class pipe {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Cuantos animales van a haber en el arreglo? : ");
        int n = scanner.nextInt();
        scanner.nextLine();

        String[] animals = new String[n];

        for (int i = 0; i < animals.length; i++) {
            System.out.println("Ingrese el nombre del animal " + (i+1) + " : " );
            animals[i] = scanner.nextLine();
            
        }
        
    }
    
}
