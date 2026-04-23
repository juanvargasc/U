package U;
import java.util.Scanner;

public class Dias_semana {
    public static void main(String[] args) {
        System.out.println("Ingrese un numero de 1 a 7");

        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println("Su numero es " + n);

        switch (n) {
            case 1:
                System.out.println("Lunes");
                break;
            case 2:
                System.out.println("Martes");
                break;
            case 3:
                System.out.println("Miercoles");
                break;
            case 4:
                System.out.println("Jueves");
                break;
            case 5:
                System.out.println("Viernes");
                break;
            case 6:
                 System.out.println("omingo");
                break;
            case 7:
                System.out.println("Domingo");
                break;
            default:
                System.out.println("Error");
                break;
        }
}
}