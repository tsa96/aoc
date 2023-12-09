#include <vector>
#include <string>
#include <sstream>
#include <fstream>
#include <iostream>

using namespace std;

typedef vector<int> sequence;

void readIn(vector<sequence> &input)
{
	ifstream file("input.txt");
	string line;
	while (getline(file, line))
	{
		stringstream ss(line);
		sequence seq;
		int n;
		while (ss >> n)
			seq.push_back(n);
		input.push_back(seq);
	}
}

bool allZeroes(const sequence &seq)
{
	for (int x : seq)
		if (x != 0)
			return false;
	return true;
}

sequence subSequence(const sequence &seq)
{
	sequence sub;
	for (int i = 0; i < seq.size() - 1; i++)
		sub.push_back(seq[i + 1] - seq[i]);
	return sub;
}

int main()
{
	vector<sequence> input;
	readIn(input);

	long total = 0;

	for (sequence history : input)
	{
		vector<sequence> layers;
		layers.push_back(history);
		sequence seq = history;
		do
		{
			seq = subSequence(seq);
			layers.push_back(seq);
		} while (!allZeroes(seq));

		int val = 0;
		for (int i = layers.size() - 1; i >= 0; i--)
			val = layers[i][0] - val;
		cout << "Val: " << val << '\n';

		total += val;
	}

	cout << "Total: " << total << '\n';
}