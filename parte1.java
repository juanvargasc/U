package U;
import java.util.Scanner;
public class parte1 {
public static void main(String[] args) {
Scanner sc = new Scanner(System.in);

    // Mensaje
    System.out.println("Precios del Menú (10 platos)");
    int[] precios = new int[10];

    // Ingresar precios
    for (int i = 0; i < precios.length; i++) {
        System.out.print("Ingrese el precio del plato " + (i + 1) + ": $");
        precios[i] = sc.nextInt();
    }

    // Mostrar los precios
    System.out.println("Lista de precios del menú");
    for (int i = 0; i < precios.length; i++) {
        System.out.println("Plato " + (i + 1) + ": $" + precios[i]);
    }

    // Calcular mayor y menor precio
    int mayor = precios[0];
    int menor = precios[0];
    for (int i = 1; i < precios.length; i++) {
        if (precios[i] > mayor) mayor = precios[i];
        if (precios[i] < menor) menor = precios[i];
    }
    System.out.println("Plato más caro: $" + mayor);
    System.out.println("Plato más barato: $" + menor);
}
}
