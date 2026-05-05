
import java.util.Scanner;

public class ctl_acceso_personas {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int[] edad = new int[1];

        System.out.println("Ingrese su edad: ");
        edad[0] = sc.nextInt();

    if (edad[0] > 60) {
    System.out.println("Acceso preferencial");
    } else if (edad[0] >= 18) {
    System.out.println("Acceso permitido");
    } else {
    System.out.println("Acceso denegado");
    }
    sc.close();
    }
}