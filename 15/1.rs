use std::fs;

fn hash(string: &str) -> u32 {
    string.chars().fold(0, |a, c| ((a + c as u32) * 17) % 256)
}

fn main() {
    let sum: u32 = fs::read_to_string("./15/input.txt")
        .unwrap()
        .split(',')
        .map(|s| hash(s))
        .sum();
    println!("{sum}");
}
