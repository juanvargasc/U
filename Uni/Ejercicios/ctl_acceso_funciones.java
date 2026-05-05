
import java.util.Scanner;

public class ctl_acceso_funciones {
    public static void main(String[] args) {
     int edad = getedadbyconsole();
     validateedad(edad);
    }
    public static int getedadbyconsole(){
        Scanner sc = new Scanner(System.in);
        System.out.println("Ingrese su edad: ");
        return sc.nextInt();
    }
    public static void validateedad(int edad){
    if (edad > 60) {
    System.out.println("Acceso preferencial");
    }   
    else if (edad >= 18) {
    System.out.println("Acceso permitido");
    } 
    else {
    System.out.println("Acceso denegado");
    }
    }
}
