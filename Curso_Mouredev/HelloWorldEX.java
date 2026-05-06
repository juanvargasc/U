package Curso_Mouredev;

import java.util.ArrayList;

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

        // Operadores de concatenación
        System.out.println("Operadores de concatenación");
        String s1 = "Hola";
        String s2 = "Mundo";
        System.out.println("Concatenación: " + s1 + " " + s2);  

        // equals
        System.out.println("Comparación de cadenas");
        System.out.println("Son iguales: " + s1.equals(s2));
        // El método equals compara el contenido de dos cadenas y devuelve true si son iguales, de lo contrario devuelve false

        // contains
        System.out.println("Contains");
        System.out.println("Contiene 'lo': " + s1.contains("lo"));  
        // El método contains verifica si una cadena contiene una secuencia de caracteres específica y devuelve true o false

        // length
        System.out.println("Length");
        System.out.println("Longitud de s1: " + s1.length());
        // El método length devuelve la longitud de una cadena, es decir, el número de caracteres que contiene

        // toUpperCase
        System.out.println("toUpperCase");
        System.out.println("s1 en mayúsculas: " + s1.toUpperCase());
        // El método toUpperCase convierte todos los caracteres de una cadena a mayúsculas y devuelve la nueva cadena resultante

        // toLowerCase
        System.out.println("toLowerCase");
        System.out.println("s1 en minúsculas: " + s1.toLowerCase());
        // El método toLowerCase convierte todos los caracteres de una cadena a minúsculas y devuelve la nueva cadena resultante

        //trim
        System.out.println("trim");
        String s3 = "   Hola Mundo   ";
        System.out.println("s3 sin espacios: " + s3.trim());
        // El método trim elimina los espacios en blanco al inicio y al final de una cadena y devuelve la nueva cadena resultante

        //replace
        System.out.println("replace");
        String s4 = "Hola Mundo";
        System.out.println("s4 con 'Mundo' reemplazado por 'Universo': " + s4.replace("Mundo", "Universo"));
        // El método replace reemplaza todas las ocurrencias de una subcadena por otra y devuelve la nueva cadena resultante

        //format
        System.out.println("format");
        String s5 = "Hola %s, ¿cómo estás?";
        System.out.println("s5 formateada: " + String.format(s5, "Juan"));
        // El método format formatea una cadena utilizando un formato específico y devuelve la nueva cadena resultante

        //Condicionales
        System.out.println("Condicionales");
        int edad2 = 18;
        if (edad2 > 18) {
            System.out.println("Eres mayor de edad");
        } else if (edad2 == 18) {
            System.out.println("Tienes exactamente 18 años");
        } else {
            System.out.println("Eres menor de edad");
        }
        // El bloque if-else se utiliza para ejecutar diferentes bloques de código según una condición. Si la condición es verdadera, se ejecuta el bloque if; si es falsa, se ejecuta el bloque else. El bloque else if se puede usar para verificar condiciones adicionales.

        // Switch
        System.out.println("Switch");
        int dia = 3;
        switch (dia) {
            case 1:
                System.out.println("Lunes");
                break;
            case 2:
                System.out.println("Martes");
                break;
            case 3:
                System.out.println("Miércoles");
                break;
            case 4:
                System.out.println("Jueves");
                break;
            case 5:
                System.out.println("Viernes");
                break;
            case 6:
                System.out.println("Sábado");
                break;
            case 7:
                System.out.println("Domingo");
                break;
            default:
                System.out.println("Número de día no válido");
        }
        // El bloque switch se utiliza para ejecutar diferentes bloques de código según el valor de una variable. Cada caso se evalúa y si coincide con el valor de la variable, se ejecuta el bloque correspondiente. El bloque default se ejecuta si ningún caso coincide con el valor de la variable.

        // arrays
        System.out.println("Arrays");
        // Un array es una estructura de datos que almacena una colección de elementos del mismo tipo. Cada elemento se accede mediante un índice, que comienza en 0.
        int[] array = {1, 2, 3, 4, 5};
        // El array se declara con el tipo de dato seguido de corchetes [] y se inicializa con llaves {} que contienen los elementos del array separados por comas.
        System.out.println("Primer elemento del array: " + array[0]);
        System.out.println("Longitud del array: " + array.length);
        // El primer elemento del array se accede mediante el índice 0, y la longitud del array se obtiene con la propiedad length.

        // listas
        System.out.println("Listas");
        // Una lista es una estructura de datos que almacena una colección de elementos del mismo tipo, pero a diferencia de un array, una lista puede crecer o reducir su tamaño dinámicamente. En Java, la clase ArrayList es una implementación común de la interfaz List.
        ArrayList<String> names = new ArrayList<>();
        // La lista se declara con el tipo de dato seguido de corchetes <> y se inicializa con el constructor de la clase ArrayList.
        names.add("Elemento 1");
        names.add("Elemento 2");
        names.add("Elemento 3");
        System.out.println("Primer elemento de la lista: " + names.get(0));
        System.out.println("Tamaño de la lista: " + names.size());
        // El primer elemento de la lista se accede mediante el método get() con el índice correspondiente, y el tamaño de la lista se obtiene con el método size().
        // En resumen, los arrays son de tamaño fijo y se utilizan cuando se conoce el número de elementos de antemano, mientras que las listas son dinámicas y se utilizan cuando el número de elementos puede variar durante la ejecución del programa.

    }
}