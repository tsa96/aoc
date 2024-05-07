import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;

class Program {
	static TileGrid readInput() {
		var tiles = new TileGrid();

		try (BufferedReader reader = new BufferedReader(new FileReader("./day10/input.txt"))) {
			String line;
			while ((line = reader.readLine()) != null) {
				var row = new ArrayList<Tile>();
				for (char c : line.toCharArray())
					row.add(new Tile(c));
				tiles.add(row);
			}
		} catch (Exception e) {
			System.out.println(e);
		}

		return tiles;
	}

	public static void main(String[] args) {
		var grid = Program.readInput();

		grid.buildPipe();

		int innerTiles = grid.findAndCountInner();

		System.out.println("Now, here's a big pipe:");
		for (int i = 0; i < grid.size(); i++) {
			for (int j = 0; j < grid.get(i).size(); j++) {
				var tile = grid.getTile(j, i);
				if (tile.inPipe) {
					System.out.print(" ");
				} else if (tile.inner) {
					System.out.print("I");
				} else {
					System.out.print("O");
				}
			}
			System.out.print('\n');
		}
		System.out.print('\n');

		System.out.println(innerTiles + " inner tiles!");
	}
}

class TileGrid extends ArrayList<ArrayList<Tile>> {
	Tile getTile(int x, int y) {
		return super.get(y).get(x);
	}

	void buildPipe() {
		try {
			var start = this.findStart();
			int x = start[0];
			int y = start[1];
			System.out.println("Starting at " + (x + 1) + ", " + (y + 1));

			var startingDir = this.findStartDir(x, y);
			x = x + startingDir[0];
			y = y + startingDir[1];
			int nextDir[] = { startingDir[0], startingDir[1] };
			System.out.println("Going to " + (x + 1) + ", " + (y + 1));

			int iters = 1;
			while (true) {
				// System.out.println("Hit " + (x + 1) + " " + (y + 1));

				var tile = this.getTile(x, y);
				if (tile.type == TileType.START) {
					tile.inPipe = true;
					break;
				}
				nextDir = tile.nextDir(nextDir[0] * -1, nextDir[1] * -1);
				x = x + nextDir[0];
				y = y + nextDir[1];

				tile.inPipe = true;
				iters++;
			}

			System.out.println("Total iters: " + iters + " So Part 1 is " + Math.ceil(iters / 2));
		} catch (IndexOutOfBoundsException e) {
			System.out.print("OUT OF BOUNDS!!!!!!");
		}
	}

	int findAndCountInner() {
		int inner = 0;

		for (int i = 0; i < this.size(); i++) {
			for (int j = 0; j < this.get(i).size(); j++) {
				var tile = this.getTile(j, i);
				if (tile.inPipe)
					continue;

				int pipeHits = 0;
				for (int k = j; k >= 0; k--) {
					var t = this.getTile(k, i);
					if (!t.inPipe)
						continue;

					if (t.type == TileType.VERTICAL) {
						pipeHits++;
						continue;
					}

					if (t.type == TileType.SOUTH_EAST || t.type == TileType.SOUTH_WEST) {
						var t2 = this.getTile(k, i + 1);
						if (t2.type == TileType.NORTH_EAST || t2.type == TileType.NORTH_WEST
								|| t2.type == TileType.VERTICAL) {
							pipeHits++;
							continue;
						}
					}
				}

				if (pipeHits % 2 == 1) {
					tile.inner = true;
					inner++;
				}
			}
		}

		return inner;

	}

	int[] findStart() {
		for (int i = 0; i < this.size(); i++) {
			for (int j = 0; j < this.get(i).size(); j++) {
				var tile = this.getTile(j, i);
				if (tile.type == TileType.START) {
					return new int[] { j, i };
				}
			}
		}

		System.out.println("Can't find start!");
		return new int[] { -1, -1 };
	}

	int[] findStartDir(int x, int y) {
		Tile t;

		t = this.getTile(x, y + 1);
		if (t.type == TileType.VERTICAL || t.type == TileType.SOUTH_EAST || t.type == TileType.NORTH_WEST)
			return new int[] { 0, 1 };

		t = this.getTile(x + 1, y);
		if (t.type == TileType.HORIZONTAL || t.type == TileType.SOUTH_WEST || t.type == TileType.NORTH_WEST)
			return new int[] { 1, 0 };

		t = this.getTile(x, y - 1);
		if (t.type == TileType.VERTICAL || t.type == TileType.NORTH_EAST || t.type == TileType.NORTH_WEST)
			return new int[] { 0, -1 };

		t = this.getTile(x - 1, y);
		if (t.type == TileType.HORIZONTAL || t.type == TileType.SOUTH_EAST || t.type == TileType.NORTH_EAST)
			return new int[] { -1, 0 };

		System.out.println("Can't find start dir! No!! No!!!");
		return new int[] { 0, 0 };
	}
}

enum TileType {
	START,
	VERTICAL,
	HORIZONTAL,
	NORTH_EAST,
	NORTH_WEST,
	SOUTH_WEST,
	SOUTH_EAST,
	EMPTY
}

class Tile {
	public final TileType type;
	public final int[] dirA;
	public final int[] dirB;
	public boolean inPipe = false;
	public boolean inner = false;

	Tile(char c) {
		switch (c) {
			case '|':
				this.type = TileType.VERTICAL;
				this.dirA = new int[] { 0, 1 };
				this.dirB = new int[] { 0, -1 };
				break;
			case '-':
				this.type = TileType.HORIZONTAL;
				this.dirA = new int[] { 1, 0 };
				this.dirB = new int[] { -1, 0 };
				break;
			case 'L':
				this.type = TileType.NORTH_EAST;
				this.dirA = new int[] { 0, -1 };
				this.dirB = new int[] { 1, 0 };
				break;
			case 'J':
				this.type = TileType.NORTH_WEST;
				this.dirA = new int[] { 0, -1 };
				this.dirB = new int[] { -1, 0 };
				break;
			case '7':
				this.type = TileType.SOUTH_WEST;
				this.dirA = new int[] { 0, 1 };
				this.dirB = new int[] { -1, 0 };
				break;
			case 'F':
				this.type = TileType.SOUTH_EAST;
				this.dirA = new int[] { 0, 1 };
				this.dirB = new int[] { 1, 0 };
				break;
			case 'S':
				this.type = TileType.START;
				this.dirA = new int[] { 0, 0 };
				this.dirB = new int[] { 0, 0 };
				break;
			default:
				this.type = TileType.EMPTY;
				this.dirA = new int[] { 0, 0 };
				this.dirB = new int[] { 0, 0 };
				break;
		}
	}

	int[] nextDir(int x, int y) {
		if (dirA[0] == x && dirA[1] == y) {
			return dirB;
		} else if (dirB[0] == x && dirB[1] == y) {
			return dirA;
		} else {
			System.out.println("Can't find next direction!");
			return new int[0];
		}
	}
}