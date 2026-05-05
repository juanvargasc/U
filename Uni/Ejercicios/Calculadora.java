import java.util.Scanner;

public class Calculadora {

    // Operaciones básicas
    public static int suma(int a, int b) {
        return a + b;
    }

    public static int resta(int a, int b) {
        return a - b;
    }

    public static int multiplicacion(int a, int b) {
        return a * b;
    }

    public static double division(int a, int b) {
        if (b == 0) {
            return -1.0; // Error: división por cero
        }
        return (double) a / b;
    }

    public static int potencia(int base, int exponente) {
        return (int) Math.pow(base, exponente);
    }

    public static double raizCuadrada(int numero) {
        if (numero < 0) {
            return -1.0; // Error: raíz de negativo
        }
        return Math.sqrt(numero);
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("=====================================");
        System.out.println("      CALCULADORA EN JAVA             ");
        System.out.println("=====================================");
        boolean ejecutando = true;

        while (ejecutando) {
            System.out.println("--- MENU DE OPERACIONES ---");
            System.out.println("1. Suma (n1 + n2)");
            System.out.println("2. Resta (n1 - n2)");
            System.out.println("3. Multiplicacion (n1 x n2)");
            System.out.println("4. Division (n1 / n2)");
            System.out.println("5. Potencia (n1 ^ n2)");
            System.out.println("6. Raiz Cuadrada (√n1)");
            System.out.println("0. Salir");
            System.out.print("Seleccione una operacion: ");

            String opcion = scanner.nextLine();

            try {
                int numOp = Integer.parseInt(opcion);

                switch (numOp) {
                    case 1:
                        System.out.print("Ingrese primer número: ");
                        int n1Suma = Integer.parseInt(scanner.nextLine());
                        System.out.print("Ingrese segundo número: ");
                        int n2Suma = Integer.parseInt(scanner.nextLine());
                        System.out.println("RESULTADO: " + n1Suma + " + " + n2Suma + " = " + suma(n1Suma, n2Suma));
                        break;
                    case 2:
                        System.out.print("Ingrese primer número: ");
                        int n1Resta = Integer.parseInt(scanner.nextLine());
                        System.out.print("Ingrese segundo número: ");
                        int n2Resta = Integer.parseInt(scanner.nextLine());
                        System.out.println("RESULTADO: " + n1Resta + " - " + n2Resta + " = " + resta(n1Resta, n2Resta));
                        break;
                    case 3:
                        System.out.print("Ingrese primer número: ");
                        int n1Mult = Integer.parseInt(scanner.nextLine());
                        System.out.print("Ingrese segundo número: ");
                        int n2Mult = Integer.parseInt(scanner.nextLine());
                        System.out.println("RESULTADO: " + n1Mult + " × " + n2Mult + " = " + multiplicacion(n1Mult, n2Mult));
                        break;
                    case 4:
                        System.out.print("Ingrese primer número: ");
                        int n1Div = Integer.parseInt(scanner.nextLine());
                        System.out.print("Ingrese segundo número: ");
                        int n2Div = Integer.parseInt(scanner.nextLine());
                        double resultadoDiv = division(n1Div, n2Div);
                        if (resultadoDiv == -1.0) {
                            System.out.println("ERROR: División por cero no es posible");
                        } else {
                            System.out.println("RESULTADO: " + n1Div + " ÷ " + n2Div + " = " + resultadoDiv);
                        }
                        break;
                    case 5:
                        System.out.print("Ingrese base: ");
                        int base = Integer.parseInt(scanner.nextLine());
                        System.out.print("Ingrese exponente: ");
                        int expo = Integer.parseInt(scanner.nextLine());
                        System.out.println("RESULTADO: " + base + " ^ " + expo + " = " + potencia(base, expo));
                        break;
                    case 6:
                        System.out.print("Ingrese el número: ");
                        int num = Integer.parseInt(scanner.nextLine());
                        double resultado = raizCuadrada(num);
                        if (resultado == -1.0) {
                            System.out.println("ERROR: No existe la raíz de un número negativo");
                        } else {
                            System.out.println("RESULTADO: √" + num + " = " + resultado);
                        }
                        break;
                    case 0:
                        System.out.println("Gracias por usar la calculadora. ¡Hasta luego!");
                        ejecutando = false;
                        break;
                    default:
                        System.out.println("OPCIÓN NO VÁLIDA. Seleccione entre 0-6");
                }
            } catch (NumberFormatException e) {
                System.out.println("ERROR: Por favor ingrese un número válido");
            }
        }
        scanner.close();
      
    }
}
