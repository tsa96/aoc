#include <unordered_map>
#include <vector>
#include <string>
#include <iostream>
#include <fstream>

using namespace std;

constexpr int DIRS = 274;
constexpr int NODES = 702;

constexpr int NUM_WALKERS = 6;
int walkers[NUM_WALKERS]{17, 95, 301, 361, 364, 486};
#define WALKER_END_CONDS(x) x == 101 || x == 407 || x == 469 || x == 569 || x == 580 || x == 684

constexpr int ITER_PRINT = 1000000;

void readIn(bool directions[], int nodes[])
{
	ifstream file("input.txt");

	string dirs;
	getline(file, dirs);
	for (int i = 0; i < DIRS; i++)
		directions[i] = dirs[i] == 'L';

	string line;
	getline(file, line); // Ignore empty line

	string indices[NODES];
	pair<string, string> tmpNodes[NODES];
	for (int i = 0; i < NODES; i++)
	{
		getline(file, line);
		indices[i] = line.substr(0, 3);
		tmpNodes[i] = pair(line.substr(7, 3), line.substr(12, 3));
	}

	for (int i = 0; i < NODES; i++)
	{
		auto [l, r] = tmpNodes[i];
		int a = 0, b = 0;
		for (int j = 0; j < NODES; j++)
		{
			if (l == indices[j])
				a = j;
			if (r == indices[j])
				b = j;
		}
		nodes[i] = a | b << 16;
	}
}

// I have a way of finding *some* number of steps it takes to
// reach end nodes, but not sure I'm convinced/can prove it's
// the shortest.
// Each walker must loop eventually i.e. node == startNode, i == 0.
// (Can prove that's the shortest loop? Intuitively seems true)
// But then you need the offset from each start to end position.

// but doesn't that give multiple modular equations???

// Convinced that there's a simpler solution, some pattern in the numbers?
// But spitting out debug is annoying in C++ and optimising is
// fun in C++ so FUCK YOU I'M GONNA TRY BRUTEFORCING AGAIN
int main()
{
	bool directions[DIRS];
	int nodes[NODES];

	readIn(directions, nodes);

	long i = 0;
	bool goLeft = false, allZ = false;
	for (i = 0; !allZ; i++)
	{
		goLeft = directions[i % DIRS];
		allZ = true;

		for (int j = 0; j < NUM_WALKERS; j++)
		{
			walkers[j] = goLeft ? nodes[walkers[j]] & 0xFFFF : nodes[walkers[j]] >> 16;

			if (allZ && !(WALKER_END_CONDS(walkers[j])))
				allZ = false;
		}

		if ((i % ITER_PRINT) == 0)
			cout << "Iter " << i / ITER_PRINT << '\n';
	}

	cout << "Found it!! " << i << '\n';
}

// This passed after running all afternoon. Obviously not the intended solution, but
// LCM approach (thanks Reddit) only makes sense if input data has extra properties that you
// haven't been told. Extremely frustrating when approaches you can seemingly
// rule out with pen-and-paper turn out to be correct.