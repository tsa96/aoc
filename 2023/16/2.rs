use std::{collections::HashSet, fs};

type Grid = Vec<Vec<Tile>>;

#[derive(Copy, Clone, PartialEq, Eq, Hash)]
enum Direction {
    North,
    East,
    South,
    West,
}

#[derive(Copy, Clone)]
enum TileType {
    Empty,
    MirrorLeft,
    MirrorRight,
    SplitterH,
    SplitterV,
}

#[derive(Copy, Clone)]
struct Beam {
    x: i8,
    y: i8,
    dir: Direction,
}

#[derive(Clone)]
struct Tile {
    tile_type: TileType,
    energized: bool,
    history: HashSet<Direction>,
}

fn parse_file() -> Result<Grid, std::io::Error> {
    let input = fs::read_to_string("./16/input.txt")?;

    let grid: Grid = input
        .trim()
        .split('\n')
        .map(|line| {
            line.chars()
                .map(|c| Tile {
                    tile_type: match c {
                        '\\' => TileType::MirrorLeft,
                        '/' => TileType::MirrorRight,
                        '-' => TileType::SplitterH,
                        '|' => TileType::SplitterV,
                        _ => TileType::Empty,
                    },
                    energized: false,
                    history: HashSet::with_capacity(4),
                })
                .collect()
        })
        .collect();

    assert_eq!(grid.len(), grid[0].len());
    Ok(grid)
}

fn process_beam(grid: &mut Grid, beam: &mut Beam) {
    let width = grid.len() as i8;
    loop {
        let tile = &mut grid[beam.y as usize][beam.x as usize];

        if tile.history.contains(&beam.dir) {
            break;
        }

        tile.history.insert(beam.dir);
        tile.energized = true;

        // The elegant solution here would be to use matrix multiplication
        // but I've got stuff to do today!!
        match tile.tile_type {
            TileType::MirrorLeft => match beam.dir {
                Direction::North => beam.dir = Direction::West,
                Direction::South => beam.dir = Direction::East,
                Direction::East => beam.dir = Direction::South,
                Direction::West => beam.dir = Direction::North,
            },
            TileType::MirrorRight => match beam.dir {
                Direction::North => beam.dir = Direction::East,
                Direction::South => beam.dir = Direction::West,
                Direction::East => beam.dir = Direction::North,
                Direction::West => beam.dir = Direction::South,
            },
            TileType::SplitterH => match beam.dir {
                Direction::North => return split_beam(grid, beam, true),
                Direction::South => return split_beam(grid, beam, true),
                _ => (),
            },
            TileType::SplitterV => match beam.dir {
                Direction::East => return split_beam(grid, beam, false),
                Direction::West => return split_beam(grid, beam, false),
                _ => (),
            },
            _ => (),
        }

        match beam.dir {
            Direction::North => beam.y -= 1,
            Direction::East => beam.x += 1,
            Direction::South => beam.y += 1,
            Direction::West => beam.x -= 1,
        }

        if beam.x < 0 || beam.y < 0 || beam.x >= width || beam.y >= width {
            break;
        }
    }
}

fn split_beam(grid: &mut Grid, beam: &mut Beam, horizontal: bool) {
    let mut beam2 = beam.clone();
    if horizontal {
        beam.dir = Direction::East;
        beam2.dir = Direction::West;
    } else {
        beam.dir = Direction::North;
        beam2.dir = Direction::South;
    }

    process_beam(grid, beam);
    process_beam(grid, &mut beam2);
}

fn get_energy_level(grid: Grid) -> u32 {
    grid.iter().flatten().filter(|tile| tile.energized).count() as u32
}

fn main() {
    let grid = parse_file().unwrap();
    let width = grid.len() as i8;

    let max = (0..width)
        .flat_map(|i| {
            [
                Beam {
                    x: 0,
                    y: i,
                    dir: Direction::East,
                },
                Beam {
                    x: width - 1,
                    y: i,
                    dir: Direction::West,
                },
                Beam {
                    x: i,
                    y: 0,
                    dir: Direction::South,
                },
                Beam {
                    x: i,
                    y: width - 1,
                    dir: Direction::North,
                },
            ]
        })
        .map(|mut beam| {
            let mut grid = grid.clone();
            process_beam(&mut grid, &mut beam);
            get_energy_level(grid)
        })
        .max()
        .unwrap();

    println!("{max}");
}
