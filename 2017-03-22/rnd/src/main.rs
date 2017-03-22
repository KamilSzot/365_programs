use std::collections::HashSet;
extern crate rand;

use rand::Rng;

fn main() {
    let mut picks = HashSet::new();
    let mut rng = rand::thread_rng();
    while picks.len() < 6 {
        let pick = rng.gen::<u8>() % 49 + 1;
        picks.insert(pick);
    }
    let mut values = picks.into_iter().collect::<Vec<u8>>();
    values.sort();
    println!("{:?}", values);
}

