use std::{
    cmp::Ordering,
    collections::{BinaryHeap, HashMap},
    fs,
};

type Point = (i32, i32);

// Based on https://doc.rust-lang.org/std/collections/binary_heap/index.html#examples as I
// wanted to learn more Rust by doing this properly using a binary heap, and didn't have a
// clue how to do it.
#[derive(Copy, Clone, Eq, PartialEq, Hash)]
struct State {
    cost: usize,
    point: Point,
}

impl Ord for State {
    fn cmp(&self, other: &Self) -> Ordering {
        other
            .cost
            .cmp(&self.cost)
            .then_with(|| self.point.0.cmp(&other.point.0))
            .then_with(|| self.point.1.cmp(&other.point.1))
    }
}

impl PartialOrd for State {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

struct Grid {
    // Not sure if HashMap<...> instead of Vec<Vec<...> is much slower, want
    // to do something different from previous days
    points: HashMap<Point, usize>,
    width: i32,
}

fn parse_file() -> Result<Grid, Box<dyn std::error::Error>> {
    let input: Vec<String> = fs::read_to_string("./17/input.txt")?
        .trim()
        .split('\n')
        .map(|s| s.to_owned())
        .collect();
    assert_eq!(input.len(), input[0].len());

    let grid = Grid {
        width: input.len() as i32,
        points: HashMap::from_iter(input.iter().enumerate().flat_map(|(y, line)| {
            line.chars()
                .enumerate()
                .map(move |(x, c)| ((x as i32, y as i32), c.to_digit(10).unwrap() as usize))
        })),
    };

    Ok(grid)
}

fn bounded(x: i32) -> i32 {
    i32::min(1, i32::max(x, -1))
}

fn find_path(grid: Grid) -> usize {
    let start: Point = (0, 0);
    let goal: Point = (grid.width - 1, grid.width - 1);

    let start_state = State {
        cost: 0,
        point: start,
    };

    let mut queue = BinaryHeap::<State>::from([start_state]);
    let mut costs = HashMap::<Point, usize>::from([(start, 0)]);

    let mut track_x = 0;
    let mut track_y = 0;
    loop {
        let State {
            point: (x, y),
            cost,
        } = queue.pop().unwrap();

        if (x, y) == goal {
            return cost;
        }

        // maybe need `if cost > dist[position] { continue; }``

        for (dx, dy) in [(0, 1), (0, -1), (-1, 0), (1, 0)] {
            let same_dir = (dx, dy) == (bounded(track_x), bounded(track_y));
            if (dx, dy) == (-bounded(track_x), -bounded(track_y))
                || (same_dir && i32::abs(track_x + track_y) >= 3)
                || x + dx < 0
                || y + dy < 0
            {
                continue;
            }

            println!("{}, {}", dx, dy);

            let new_point = (x + dx, y + dy);
            let next_cost = grid.points.get(&new_point);

            if next_cost.is_none() {
                continue;
            }

            let new_cost = cost + grid.points.get(&new_point).unwrap();

            if !costs.contains_key(&new_point) || new_cost < *costs.get(&new_point).unwrap() {
                costs.insert(new_point, new_cost);
                queue.push(State {
                    point: new_point,
                    cost: new_cost,
                });
                if same_dir {
                    track_x = if track_x != 0 { track_x + dx } else { 0 };
                    track_y = if track_y != 0 { track_y + dy } else { 0 };
                } else {
                    track_x = dx;
                    track_y = dy;
                }
            }
        }
    }
}

fn main() {
    let grid: Grid = parse_file().unwrap();
    let cost = find_path(grid);
    println!("{}", cost);
}

// This is a total mess so far, first time doing any kind of pathfinding stuff.
// So far, just a chaotic Dijkstra/A* approach that might not even work.

// Next day is already out, I'm going to come back to this when I have some more time
// to read up on pathfinding stuff.
