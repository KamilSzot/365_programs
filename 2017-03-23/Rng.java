import java.util.HashSet; // TreeSet would be naturally sorted
import java.util.Random;
import java.util.Collections;
import java.util.ArrayList;
public class Rng {
    public static void main(String[] args) {
        Random rng = new Random();
        HashSet<Integer> picks = new HashSet<Integer>();
        while(picks.size() < 6) {
            picks.add(rng.nextInt(49) + 1);
        }
        ArrayList<Integer> picksArray = new ArrayList<Integer>(picks);
        Collections.sort(picksArray);

        System.out.println(picksArray);
    }
}