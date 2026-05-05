
import java.util.Scanner;
public class parte3 {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        int[] pedidos = new int[6];

        System.out.println(" SISTEMA DE PEDIDOS DEL RESTAURANTE 2");

        // Ingresar pedidos
        for (int i = 0; i < pedidos.length; i++) {
            System.out.print("Ingrese el número del pedido " + (i + 1) + ": ");
            pedidos[i] = scanner.nextInt();
        }

        // Mostrar pedidos registrados
        System.out.println("\nPedidos registrados:");
        for (int i = 0; i < pedidos.length; i++) {
            System.out.println("Posición " + (i + 1) + ": Pedido #" + pedidos[i]);
        }

        // Número a buscar
        System.out.print("\nIngrese el número de pedido a buscar: ");
        int buscar = scanner.nextInt();

        boolean encontrado = false;
        int contador = 0;

        System.out.println("\nResultado de la búsqueda:");

        // Búsqueda en el vector
        for (int i = 0; i < pedidos.length; i++) {

            if (pedidos[i] == buscar) {
                System.out.println("El pedido se encuentra en la posición: " + (i + 1));
                encontrado = true;
                contador++;
            }
        }

        // Validar si no se encontró
        if (!encontrado) {
            System.out.println("El pedido NO se encuentra en el sistema.");
        } else {
            System.out.println("El pedido aparece " + contador + " vez/veces.");
        }
        scanner.close();
    }
    
}
