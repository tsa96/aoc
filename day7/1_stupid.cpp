// This is a first attempt where I misread the question and wrote a 
// very messy algorithm that sorts akin to regular poker rules.

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
	vector<char> chars;

	Hand(string handString)
	{
		map<char, int> m;

		for (char c : handString)
			m[c]++;

		char four;
		char three;
		vector<char> twos;
		vector<char> ones;
		for (auto [c, count] : m)
		{
			switch (count)
			{
			case 5:
				this->type = FIVE_KIND;
				this->chars = {c};
				return;
			case 4:
				four = c;
				break;
			case 3:
				three = c;
				break;
			case 2:
				Hand::charVecInsertOrdered(&twos, c);
				break;
			case 1:
				Hand::charVecInsertOrdered(&ones, c);
				break;
			};
		}

		if (four)
		{
			this->type = FOUR_KIND;
			this->chars = {four, ones[0]};
			return;
		}

		if (three)
		{
			if (twos.size() > 0)
			{
				this->type = FULL_HOUSE;
				this->chars = {three, twos[0]};
				return;
			}

			this->type = THREE_KIND;
			this->chars = {three, ones[0], ones[1]};
			return;
		}

		if (twos.size() == 2)
		{
			this->type = TWO_PAIR;
			this->chars = {twos[0], twos[1], ones[0]};
			return;
		}

		if (twos.size() == 1)
		{
			this->type = ONE_PAIR;
			this->chars = {twos[0], ones[0], ones[1], ones[2]};
			return;
		}

		this->type = HIGH_CARD;
		this->chars = ones; // cursed?
	}

	friend bool operator>(const Hand &lhs, const Hand &rhs)
	{
		if (lhs.type < rhs.type)
			return false;
		else if (lhs.type > rhs.type)
			return true;
		for (int i = 0; i < lhs.chars.size(); i++)
			if (lhs.chars[i] != rhs.chars[i])
				return LabelValue[lhs.chars[i]] < LabelValue[rhs.chars[i]];
		return false;
	}

	static void charVecInsertOrdered(vector<char> *vec, char c)
	{
		if (vec->size() == 0)
		{
			vec->push_back(c);
			return;
		}

		for (auto it = vec->begin(); it < vec->end(); it++)
		{
			if (LabelValue[c] > LabelValue[*it])
			{
				vec->insert(it, c);
				return;
			}
		}
		vec->push_back(c);
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