// Let this get to about a billion, convinced it's stupid

#include <unordered_map>
#include <vector>
#include <string>
#include <iostream>
#include <fstream>

using namespace std;

short packNodeString(string s)
{
	return s[2] - 'A' + 1 | s[1] - 'A' + 1 << 5 | s[0] - 'A' - 1 << 10;
}

void readIn(string &directions, unordered_map<short, pair<short, short>> &nodes)
{
	ifstream file("input.txt");
	getline(file, directions);
	string line;
	getline(file, line); // Ignore empty line
	while (getline(file, line))
		nodes.insert(pair(packNodeString(line.substr(0, 3)),
						  pair(packNodeString(line.substr(7, 3)), packNodeString(line.substr(12, 3)))));
}

int main()
{
	string directions;
	unordered_map<short, pair<short, short>> nodes;

	readIn(directions, nodes);

	vector<short> walkers;
	for (auto [start, _] : nodes)
		if ((start & 31) == 1)
			walkers.push_back(start);

	cout << walkers.size() << '\n';

	const int numDirs = directions.length() - 2;
	const int numWalkers = walkers.size();
	bool allZ = false;
	long steps = 0;
	int i = 0, j = 0;
	while (true)
	{
		steps++;

		bool goLeft = directions[i] == 'L';

		allZ = true;
		for (j = 0; j < numWalkers; j++)
		{
			if ((walkers[j] & 31) != 26)
				allZ = false;
			walkers[j] = goLeft ? nodes[walkers[j]].first : nodes[walkers[j]].second;
		}

		if (allZ)
			break;
		if ((steps % 1000000) == 0)
			cout << steps << '\n';
		i = i == numDirs ? 0 : i + 1;
	}

	cout << steps << '\n';
}