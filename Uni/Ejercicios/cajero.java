import java.util.Scanner;

public class cajero {
    public static void main(String[] args) {
        System.out.println("Opcion 1 = Consultar saldo");
        System.out.println("Opcion 2 = Retirar");
        System.out.println("Opcion 3 = Depositar");
        System.out.println("Ingrese la opcion");

        Scanner sc = new Scanner(System.in);
        int opcion = sc.nextInt();
        System.out.println("La opcion es " + opcion);

        switch (opcion) {
            case 1:
                System.out.println("Su saldo es 1.000.000 $");
                break;
            case 2:
                System.out.println("Retiro Exitoso");
                break;
            case 3:
                System.out.println("Deposito Exitoso");
                break;
        
            default:
                System.out.println("Opcion Invalida");
                break;
        }
        sc.close();
}
}