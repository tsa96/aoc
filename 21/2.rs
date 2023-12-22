use std::fs;

type Grid = Vec<Vec<char>>;

fn parse(n: u32) -> Grid {
    let input = fs::read_to_string("./21/input.txt").unwrap();
    let base_grid: Grid = input
        .split('\n')
        .map(|line| line.chars().collect())
        .collect();

    let size = base_grid.len();

    let mut megagrid = base_grid.clone();
    megagrid[65][65] = '.';
    let tmp_grid = megagrid.clone();

    for _ in 0..((2 as u32).pow(n) - 1) {
        for i in 0..size {
            megagrid[i].extend(tmp_grid[i].clone());
        }
    }

    for _ in 0..n {
        megagrid.extend(megagrid.clone());
    }

    let middle = (megagrid.len() / 2) - 1;
    megagrid[middle][middle] = 'S';

    fs::write("./21/tmp.txt", grid_string(&megagrid)).unwrap();

    println!("{size}, {}", megagrid.len());

    megagrid
}

fn grid_string(grid: &Grid) -> String {
    grid.iter()
        .map(|row| row.iter().collect::<String>())
        .collect::<Vec<String>>()
        .join("\n")
}

pub fn main() {
    let mut grid = parse(4);
    let width = grid.len();
    assert_eq!(grid.len(), grid[0].len());

    let dirs: [(i8, i8); 4] = [(0, 1), (0, -1), (1, 0), (-1, 0)];
    for i in 0..0/* 350 */ {
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
                        || (x >= width - 1 && dx == 1)
                        || (y == 0 && dy == -1)
                        || (y >= width - 1 && dy == 1)
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

        fs::write("./21/tmp2.txt", grid_string(&grid)).unwrap();

        println!(
            "{}, {}",
            i,
            grid.iter().flatten().filter(|c| **c == 'O').count()
        )
    }

    // gsheets graph looks like a quadratic?

    // DAY 2 OF THIS GARBAGE QUESTION
    // Input data shaped like diamond, also x=65, y=65 lanes are totally empty
	
    // The gaps between diamond (square) make it look very much like
    // there's exactly at the boundaries, so 65, then since it tiles and each
    // tile of the frontier expanding outwards all seem to be on the diamond (square)
    // it's just gonna repeat
	
    // Big square grows quadratically then, I don't fully understand why outer frontier
	// bit is so consistent but I think it means we can interpolate 

    // x = 65 => 3911
    // x = 132 + 65 (197) => 34563
    // x = 132 * 2 + 65 (329) => 95327
    //
    // y = 15056x^2 + 15596x + 3911 // via wolfram alpha
    // 148660

    // let x: u64 = 26501365;
    // println!("{}", (15056 * (x.pow(2))) + (15596 * x) + 3911);
	
	// quadratic is in terms of big squares after left inside bit, then in terms of squares
	// big squares, so divide to get proper answer. 26501365 - 65 dividing perfectly into 131
	// kind of gives it away

    let x: u64 = (26501365 - 65) / 131;
    println!("{}", (15056 * (x.pow(2))) + (15596 * x) + 3911);

	// this fucking question took me about 6 hours and 4-5 sheets of paper
}

