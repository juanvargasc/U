
import java.util.Scanner;
public class v2 {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in) ;
        System.out.println("cuantos animales hay ? ");
        int n = scanner.nextInt() ;
        scanner.nextLine() ;
        
        String[] animales = new String[n] ;

        for (int i = 0; i < n; i++) {
            System.out.println("nombre del animal " + (i+1) + " : ");
            animales[i] = scanner.nextLine() ;
        }

        scanner.close() ;
    }
}