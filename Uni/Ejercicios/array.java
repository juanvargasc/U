import java.util.Scanner;

public class array {
    public static void main(String[] args) {
        String[] animals = {"Leon", "tigre", "pantera"};
        System.out.println("Ingrese un numero de 0 a 2");
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(animals[n]);
        sc.close();
    }
}
