use std::fs;
struct Lens {
    label: String,
    focal_len: u8,
}

fn hash(string: &str) -> usize {
    string.chars().fold(0, |a, c| ((a + c as usize) * 17) % 256)
}

fn main() -> Result<(), std::io::Error> {
    let input = fs::read_to_string("./15/input.txt")?;
    let steps: Vec<&str> = input.split(',').collect();

    let mut boxes: [Vec<Lens>; 256] = std::array::from_fn(|_| vec![]);

    for step in steps {
        if step.contains('-') {
            let label = &step[0..step.len() - 1];
            let box_index = hash(label);
            boxes[box_index].retain(|lens| lens.label != label)
        } else {
            let label = &step[0..step.len() - 2];
            let box_index = hash(label);
            let focal_len: u8 = step
                .chars()
                .last()
                .unwrap()
                .to_digit(10)
                .unwrap()
                .try_into()
                .unwrap();

            let existing_index = boxes[box_index].iter().position(|lens| lens.label == label);
            match existing_index {
                None => boxes[box_index].push(Lens {
                    label: label.to_string(),
                    focal_len,
                }),
                Some(i) => boxes[box_index][i].focal_len = focal_len,
            }
        }
    }

    let power: usize = boxes
        .iter()
        .enumerate()
        .map(|(box_index, b)| {
            b.iter()
                .enumerate()
                .map(|(i, lens)| (box_index + 1) * (i + 1) * (lens.focal_len as usize))
                .sum::<usize>()
        })
        .sum();

	println!("{power}");

    Ok(())
}
