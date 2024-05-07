use std::fs;

type Grid = Vec<Vec<char>>;

fn parse() -> Grid {
    let input = fs::read_to_string("./21/input.txt").unwrap();
    input
        .split('\n')
        .map(|line| line.chars().collect())
        .collect()
}

pub fn main() {
    let mut grid = parse();
    let width = grid.len();
    assert_eq!(grid.len(), grid[0].len());

    let dirs: [(i8, i8); 4] = [(0, 1), (0, -1), (1, 0), (-1, 0)];
    for _ in 0..32 {
        // Clone is essential here, though may be faster approaches
        for (y, row) in grid.clone().iter().enumerate() {
            for (x, &tile) in row.iter().enumerate() {
                match tile {
                    'O' | 'S' => {}
                    _ => continue,
                }

                grid[y][x] = '.';

                for &(dx, dy) in dirs.iter() {
                    if (x == 0 && dx == -1)
                        || (x == width - 1 && dx == 1)
                        || (y == 0 && dy == -1)
                        || (y == width - 1 && dy == 1)
                    {
                        continue;
                    }

                    let nx = x.checked_add_signed(dx.into()).unwrap();
                    let ny = y.checked_add_signed(dy.into()).unwrap();

                    let new_tile = &mut grid[ny][nx];

                    if *new_tile == '.' {
                        *new_tile = 'O';
                    }
                }
            }
        }
		println!("{}", grid.iter().flatten().filter(|c| **c == 'O').count())
    }

	let grid_drawing = grid
		.iter()
		.map(|row| row.iter().collect::<String>())
		.collect::<Vec<String>>()
		.join("\n");

	println!("{grid_drawing}");

}
