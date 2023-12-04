// Almost works but funky behaviour with newlines - see out.txt
// Try another in C and learn IO stuff properly, come back to this later?

#include <stdio.h>
#include <stdlib.h>

#define LEN 140

void readIn(char data[LEN][LEN])
{
	FILE *fp = fopen("input.txt", "r");
	for (int i = 0; i < LEN; i++)
	{
		fgets(data[i], LEN, fp);
		fseek(fp, 1, SEEK_CUR);
	}

	fclose(fp);
}

int isNumChar(char c)
{
	return (0 <= c - '0' && c - '0' < 10) ? 1 : 0;
}

// Check X first, then Y
// YYYYY
// XNNNX
// YYYYY
int hasAdjacentShit(char data[LEN][LEN], int row, int col, int len)
{
	for (int i = -1; i <= 1; i++)
	{
		for (int j = col - 1; j < col + len; j++)
			printf("%c", data[row + i][j]);
		printf("\n");
	}

	int ret = 0;

	// X1
	if (col - 1 >= 0 && data[row][col - 1] != '.')
		ret = 1;

	// X2
	if (col + len <= LEN - 1 && data[row][col + len] != '.')
		ret = 1;

	// B
	for (int j = col - 1; j <= col + len; j++)
	{
		if (j < 0 || j > LEN - 1)
			continue;

		if (row - 1 >= 0 && data[row - 1][j] != '.')
			ret = 1;

		if ((row + 1 <= LEN - 1 && data[row + 1][j] != '.'))
			ret = 1;
	}

	printf("%s\n\n", ret == 1 ? "TRUE" : "FALSE");
	return ret;
}

int main()
{
	int final = 0;

	char data[LEN][LEN];

	readIn(data);

	for (int row = 0; row < LEN; row++)
	{
		printf("row: %i, chars: %s\n", row, data[row]);

		int col = 0;
		while (col < LEN)
		{
			if (!isNumChar(data[row][col]))
			{
				col++;
				continue;
			}

			int start = col;
			int number = 0;
			char c = data[row][col];
			while (isNumChar(c))
			{
				number = (number * 10) + (c - '0');
				col++;
				if (col == LEN)
					break;
				c = data[row][col];
			}

			if (hasAdjacentShit(data, row, start, col - start))
				final += number;
		}
	}

	printf("%i\n", final);
}