
import java.util.Scanner;
public class t {
    public static void main(String[] args) {
        System.out.println("Hola");
        Scanner sc = new Scanner(System.in);
        System.out.println("Ingrese su edad: ");
        int edad = sc.nextInt();        
        System.out.println("Su edad es: " + edad);
        sc.close();
    }
}
