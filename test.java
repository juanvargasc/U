package U;
import java.util.Scanner;

public class test {
    public static void main(String[] args) {
        String[] masc = new String[5];
        Scanner sc = new Scanner(System.in);
        System.out.println("Por favor, ingresa los 5 nombres de mascotas:");
        for (int i = 0; i < masc.length; i++) {
            System.out.print("Nombre " + (i + 1) + ": ");
            masc[i] = sc.nextLine();
        }
        System.out.println("Los nombres de las mascotas son:");
        for (int i = 0; i < masc.length; i++) {
            System.out.println(masc[i]);
        
        }
    }
}
