package Curso_Mouredev;

public class HelloWorldEX {
    public static void main(String[] args) {
        //Declaración de variables
        System.out.println("Declaración de variables");
        // String = Cadena de texto
        // final = constante, no se puede cambiar el valor
        // var = el tipo de dato se infiere automáticamente, pero no se puede cambiar el tipo de dato

        final String name;
        // Como hay un "final" en la variavble name (Osea se volvio constante), no se puede cambiar el valor
        // o Sting name = "Pipe"; tambien se puede declarar e inicializar al mismo tiempo
        name = "Pipe";
     
        System.out.println("Hello, " + name + "!");
        String name2 = "Juan";
        // Aca si se puede cambiar el valor de name2, porque no es final
        System.out.println(name2);
        var edad = 25; 
        // "var" analiza el tipo de dato automaticamente, pero no se puede cambiar el tipo de dato
        System.out.println("Edad: " + edad);

        //Tipos de datos primitivos
        System.out.println("Tipos de datos primitivos");
        // int = Entero
        // double = Decimal 
        // boolean = Verdadero o falso
        // char = Caracter
       
        int numeroEntero = 10;
        double numeroDecimal = 3.14;
        boolean esVerdadero = true;
        char letra = 'A';
        String texto = "Hola Mundo";

        System.out.println("Número entero: " + numeroEntero);
        System.out.println("Número decimal: " + numeroDecimal);
        System.out.println("Es verdadero: " + esVerdadero);
        System.out.println("Letra: " + letra);
        System.out.println("Texto: " + texto);

        // Operadores aritméticos
        System.out.println("Operadores aritméticos");
        // Suma +
        // Resta -
        // Multiplicación *
        // División /
        // Módulo %

        int a = 5;
        int b = 3;
        System.out.println("Suma: " + (a + b));
        System.out.println("Resta: " + (a - b));
        System.out.println("Multiplicación: " + (a * b));
        System.out.println("División: " + (a / b));
        System.out.println("Módulo: " + (a % b));

        // Operadores de asignación
        System.out.println("Operadores de asignación");
        int c = 10;
        System.out.println("Asignación simple: " + c);
        c += 5; // c = c + 5
        // El operador += suma el valor a la variable y luego asigna el resultado a la variable
        System.out.println("Asignación con suma: " + c);
        c -= 3; // c = c - 3
        // El operador -= resta el valor a la variable y luego asigna el resultado a la variable
        System.out.println("Asignación con resta: " + c);
        c *= 2; // c = c * 2
        // El operador *= multiplica el valor a la variable y luego asigna el resultado a la variable
        System.out.println("Asignación con multiplicación: " + c);
        c /= 4; // c = c / 4
        // El operador /= divide el valor a la variable y luego asigna el resultado a la variable
        System.out.println("Asignación con división: " + c);
        c %= 3; // c = c % 3
        // El operador %= calcula el módulo del valor a la variable y luego asigna el resultado a la variable
        System.out.println("Asignación con módulo: " + c);

        // Operadores de comparación, Verdadero o falso, booleano
        System.out.println("Operadores de comparación");
        int d = 10;
        int e = 20;
        System.out.println("Igual: " + (d == e));
        // El operador == compara si dos valores son iguales y devuelve true o false
        System.out.println("Distinto: " + (d != e));
        // El operador != compara si dos valores son distintos y devuelve true o false
        System.out.println("Mayor: " + (d > e));
        // El operador > compara si un valor es mayor que otro y devuelve true o false
        System.out.println("Menor: " + (d < e));
        // El operador < compara si un valor es menor que otro y devuelve true o false
        System.out.println("Mayor o igual: " + (d >= e));
        // El operador >= compara si un valor es mayor o igual que otro y devuelve true o false
        System.out.println("Menor o igual: " + (d <= e));
        // El operador <= compara si un valor es menor o igual que otro y devuelve true o false

        // Operadores lógicos
        System.out.println("Operadores lógicos");
        boolean x = true;
        boolean y = false;
           // El operador && devuelve true si ambos operandos son true, de lo contrario devuelve false
        System.out.println("AND: " + (x && y));
        System.out.println("AND: " + (3 > 2 && 5 == 4));
        // El operador || devuelve true si al menos uno de los operandos es true, de lo contrario devuelve false
        System.out.println("OR: " + (x || y));
        System.out.println("OR: " + (3 > 2 || 5 == 4));
        // El operador ! devuelve true si el operando es false, y devuelve false si el operando es true
        System.out.println("NOT: " + (!x));
        System.out.println("NOT: " + !(3 > 2));

        // Operadores unarios
        System.out.println("Operadores unarios");
        int f = 5;
        System.out.println("Valor original: " + f);
        System.out.println("Incremento: " + (++f));
        // El operador ++ incrementa el valor de la variable en 1 antes de usarla
        System.out.println("Decremento: " + (--f));
        // El operador -- decrementa el valor de la variable en 1 antes de usarla
        System.out.println("Valor final: " + f);
        
       }
}