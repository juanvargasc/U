package Curso_Mouredev;

public class OperadoreEX {
    public static void main(String[] args) {
        var a = 5;
        var b = 3;
        System.out.println("Suma: " + (a + b));
        System.out.println("Resta: " + (a - b));
        System.out.println("Multiplicación: " + (a * b));
        System.out.println("División: " + (a / b));
        System.out.println("Módulo: " + (a % b));

        var c = 10;
        System.out.println("Valor inicial de c: " + c);
        System.out.println("Asignación con suma: " + (c += 5)); // c = c + 5
        System.out.println("Asignación con resta: " + (c -= 3)); // c = c - 3
        System.out.println("Asignación con multiplicación: " + (c *= 2)); // c = c * 2
        System.out.println("Asignación con división: " + (c /= 4)); // c = c / 4
        System.out.println("Asignación con módulo: " + (c %= 3)); // c = c % 3

        System.out.println("Operadores de comparación");
        int d = 10;
        int e = 20; 
        System.out.println("d == e: " + (d == e)); // Igual a
        System.out.println("d != e: " + (d != e)); // Diferente
        System.out.println("d > e: " + (d > e)); // Mayor que
        System.out.println("d < e: " + (d < e)); // Menor que
        System.out.println("d >= e: " + (d >= e)); // Mayor o igual que
        System.out.println("d <= e: " + (d <= e)); // Menor o igual que

        System.out.println("Operadores lógicos");
        boolean x = true;
        boolean z = true;
        boolean y = false;
        boolean h = false;
        // true
        System.out.println("x && y: " + (x && z)); // AND lógico
        System.out.println("x || y: " + (x || z)); // OR lógico
        System.out.println("!x: " + (!y)); // NOT lógico 
        // false
        System.out.println("x && y: " + (z && y)); // AND lógico
        System.out.println("x || y: " + (h || y)); // OR lógico
        System.out.println("!x: " + (!x)); // NOT lógico

        int f = 5;
        System.out.println("Valor inicial de f: " + f);
        System.out.println("f++: " + (f++)); // Post-incremento: devuelve el valor actual de f y luego lo incrementa en 1
        System.out.println("Valor de f después de f++: " + f); // Valor de f después del post-incremento
        System.out.println("++f: " + (++f)); // Pre-incremento: incrementa f en 1 y luego devuelve el nuevo valor de f
        System.out.println("Valor de f después de ++f: " + f); // Valor de f después del pre-incremento
        System.out.println("f--: " + (f--)); // Post-decremento: devuelve el valor actual de f y luego lo decrementa en 1
        System.out.println("Valor de f después de f--: " + f); // Valor de f después del post-decremento
        System.out.println("--f: " + (--f)); // Pre-decremento: decrementa f en 1 y luego devuelve el nuevo valor de f
        System.out.println("Valor de f después de --f: " + f); // Valor de f después del pre-decremento 
    }
}
