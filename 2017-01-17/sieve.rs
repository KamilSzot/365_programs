// This is a comment, and will be ignored by the compiler
// You can test this code by clicking the "Run" button over there ->
// or if prefer to use your keyboard, you can use the "Ctrl + Enter" shortcut

// This code is editable, feel free to hack it!
// You can always return to the original code by clicking the "Reset" button ->

// This is the main function
fn main() {
    // The statements here will be executed when the compiled binary is called

    // Print text to the console
    println!("Looking for primes");


    const MAX: usize = 20000000 + 1;

    let mut is_prime : Vec<bool> = Vec::with_capacity(MAX);
    
    for _ in 0..MAX {
        is_prime.push(true);
    }
    
    for number in 2..MAX {
        if is_prime[number] {
            let mut mult = number + number;
            while mult < MAX {
                is_prime[mult] = false;
                mult += number;
            }
        }
    }

    for number in (2..MAX).rev() {
        if is_prime[number] {
            println!("Highest prime found {}", number);
            break;
        }
    }


}
