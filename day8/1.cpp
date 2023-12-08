#include <unordered_map>
#include <vector>
#include <string>
#include <iostream>
#include <fstream>

using namespace std;

void readIn(string &directions, unordered_map<string, pair<string, string>> &nodes)
{
	ifstream file("input.txt");
	getline(file, directions);
	string line;
	getline(file, line); // Ignore empty line
	while (getline(file, line))
		nodes.insert({line.substr(0, 3), {line.substr(7, 3), line.substr(12, 3)}});
}

int main()
{
	string directions;
	unordered_map<string, pair<string, string>> nodes;

	readIn(directions, nodes);

	const int numDirs = directions.length() - 1;
	string curr = "AAA";
	const string last = "ZZZ";
	int steps = 0, i = 0;
	while (true)
	{
		steps++;
		auto [left, right] = nodes[curr];
		curr = directions[i] == 'L' ? left : right;
		if (curr == last)
			break;
		i = i == numDirs - 1 ? 0 : i + 1;
	}

	cout << steps << '\n';
}