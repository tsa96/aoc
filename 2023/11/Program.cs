var input = File.ReadAllLines("../../../input.txt");


Galaxies part1 = new(input);
Console.WriteLine("=== Part 1 ===");

Console.WriteLine("Original galaxies");
Console.WriteLine(part1.ToString());

part1.Expand();
Console.WriteLine("Expanded galaxies");
Console.WriteLine(part1.ToString());

Console.WriteLine($"Sum of distances is {part1.FindDistances()}");


Galaxies part2 = new(input);
Console.WriteLine("=== Part 2 ===");

part2.Expand(1000000);
Console.WriteLine($"Sum of distances is {part2.FindDistances()}");


public class Point(int x, int y)
{
	public int X { get; set; } = x;
	public int Y { get; set; } = y;
}

public class Galaxies : List<Point>
{
	public int width;
	public int height;

	public Galaxies(string[] inputStrings)
	{
		height = inputStrings.Length;
		width = inputStrings[0].Length;

		for (int i = 0; i < inputStrings.Length; i++)
		{
			char[] chars = inputStrings[i].ToCharArray();
			for (int j = 0; j < chars.Length; j++)
				if (chars[j] == '#')
					Add(new Point(j, i));
		}
	}

	public void Expand(int n = 2)
	{
		for (int x = 0; x < width; x++)
			if (!Exists((p) => p.X == x))
			{
				foreach (var p in this)
					if (p.X > x)
						p.X += n - 1;
				x += n - 1;
				width += n - 1;
			}

		for (int y = 0; y < height; y++)
			if (!Exists((p) => p.Y == y))
			{
				foreach (var p in this)
					if (p.Y > y)
						p.Y += n - 1;
				y += n - 1;
				height += n - 1;
			}
	}
	public long FindDistances()
	{
		long sum = 0;
		for (int i = 0; i < Count; i++)
			for (int j = i + 1; j < Count; j++)
			{
				var p1 = this[i];
				var p2 = this[j];
				var distance = Math.Abs(p2.X - p1.X) + Math.Abs(p2.Y - p1.Y);

				// Console.WriteLine($"Distance between ({p1.x}, {p1.y}) and ({p2.x}, {p2.y}) is {distance}");
				sum += distance;
			}
		return sum;
	}

	public override string ToString()
	{
		string str = "";
		for (int y = 0; y < height; y++)
		{
			for (int x = 0; x < width; x++)
				str += this.Any(p => p.X == x && p.Y == y) ? '#' : '.'; // Stupid slow but w/e
			str += '\n';
		}
		return str;
	}
}