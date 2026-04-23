package U;
import java.util.Scanner;

public class calculo_area {
    public static void main(String[] args) {
        System.out.println("Ingrese un numero de 1 a 3");

        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println("Su numero es " + n);

        switch (n) {
            case 1:
                System.out.println("Triangulo");
                System.out.println("Ingrese la base");
                double base = sc.nextDouble();
                System.out.println("Ingrese la altura");
                double altura = sc.nextDouble();
                double areaTriangulo = (base * altura) / 2;
                System.out.println("Área del triángulo: " + areaTriangulo);

                break;
            case 2:
                System.out.println("Cuadrado");
                System.out.println("Ingrese el lado");
                double l1 = sc.nextDouble();
                double areaCuadrado = (l1 * l1);
                System.out.println("Área del Cuadrado: " + areaCuadrado);
                break;
            case 3:
                System.out.println("Circulo");
                System.out.println("Ingrese el Radio");
                double radio = sc.nextDouble();
                double areaCirculo = (Math.PI * Math.pow(radio, 2));
                System.out.println("Área del Cuadrado: " + areaCirculo);
                break;
            default:
                System.out.println("Error");
                break;
        }
    }
}
