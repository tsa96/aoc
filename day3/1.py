LEN = 140

lines = []
with open('./input.txt', 'r') as f:
	for line in f.read().splitlines():
		lines.append(line)

def hasAdjacent(row, col, numDigits):
	ret = False
	for y in range(row - 1, row + 2):
		if (y < 0 or y > LEN -1):
			continue
		for x in range(col - 1, col + numDigits + 1):
			if (x < 0 or x > LEN -1):
				continue
			print(lines[y][x], end='')
			if (y == row and not (x == col - 1 or x == col + numDigits)):
				continue
			if (lines[y][x] != '.'):
				ret = True
		print()
	print(f'{ret}\n\n')
	return ret

final = 0
for row in range(len(lines)):
	print(lines[row])
	col = 0
	while col < LEN:
		if not lines[row][col].isdigit():
			col += 1
			continue
		start = col
		number = 0
		c = lines[row][col]
		while True:
			number = number * 10 + int(c)
			col += 1
			if col == LEN: break
			c = lines[row][col]
			if not lines[row][col].isdigit(): break
		if hasAdjacent(row, start, col - start):
			final += number
print(final)