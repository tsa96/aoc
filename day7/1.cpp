#include <map>
#include <vector>
#include <string>
#include <iostream>
#include <fstream>

// fuck it
using namespace std;

map<char, int> LabelValue{
	{'2', 2},
	{'3', 3},
	{'4', 4},
	{'5', 5},
	{'6', 6},
	{'7', 7},
	{'8', 8},
	{'9', 9},
	{'T', 10},
	{'J', 11},
	{'Q', 12},
	{'K', 13},
	{'A', 14},
};

enum HandType
{
	FIVE_KIND = 0,
	FOUR_KIND = 1,
	FULL_HOUSE = 2,
	THREE_KIND = 3,
	TWO_PAIR = 4,
	ONE_PAIR = 5,
	HIGH_CARD = 6
};

// doing silly things in a silly language
class Hand
{
public:
	HandType type;
	char chars[5];

	Hand(string handString)
	{
		map<char, int> m;

		for (int i = 0; i < handString.length(); i++)
		{
			this->chars[i] = handString[i];
			m[handString[i]]++;
		}

		bool four;
		bool three;
		int twos = 0;
		int ones = 0;
		for (auto [c, count] : m)
		{
			switch (count)
			{
			case 5:
				this->type = FIVE_KIND;
				return;
			case 4:
				four = true;
				break;
			case 3:
				three = true;
				break;
			case 2:
				twos++;
				break;
			case 1:
				ones++;
				break;
			};
		}

		if (four)
		{
			this->type = FOUR_KIND;
			return;
		}

		if (three)
		{
			if (twos > 0)
			{
				this->type = FULL_HOUSE;
				return;
			}

			this->type = THREE_KIND;
			return;
		}

		if (twos == 2)
		{
			this->type = TWO_PAIR;
			return;
		}

		if (twos == 1)
		{
			this->type = ONE_PAIR;
			return;
		}

		this->type = HIGH_CARD;
	}

	friend bool operator>(const Hand &lhs, const Hand &rhs)
	{
		if (lhs.type != rhs.type)
			return lhs.type > rhs.type;

		for (int i = 0; i < 5; i++)
			if (lhs.chars[i] != rhs.chars[i])
				return LabelValue[lhs.chars[i]] < LabelValue[rhs.chars[i]];
		return false;
	}
};

map<string, int> readInput()
{
	map<string, int> input;
	ifstream file("./input.txt");

	string hand;
	int bid;
	while (file >> hand >> bid)
	{
		input.insert({hand, bid});
	}

	return input;
}

int main()
{
	vector<pair<Hand, int>> hands;

	for (auto [handString, bid] : readInput())
	{
		auto hand = Hand(handString);

		if (hands.size() == 0)
		{
			hands.push_back(pair(hand, bid));
			continue;
		}

		bool inserted = false;
		for (auto it = hands.begin(); it != hands.end(); it++)
		{
			if (hand > it->first)
			{
				hands.insert(it, pair(hand, bid));
				inserted = true;
				break;
			}
		}

		if (!inserted)
			hands.push_back(pair(hand, bid));
	}

	// Okay we finally have ORDERED HANDS!!!! so rest should be easy

	long winnings = 0;
	for (int i = hands.size() - 1; i >= 0; i--)
	{
		auto [type, chars] = hands[i].first;
		cout << "Bid: " << hands[i].second << ", Type: " << type << ", Chars: ";
		for (auto c : chars)
			cout << c;
		cout << '\n';
		winnings += hands[i].second * (i + 1);
	}
	cout << hands.size() << '\n';
	cout << winnings << '\n';
}