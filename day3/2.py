LEN = 140

lines = []
with open('./input.txt', 'r') as f:
	for line in f.read().splitlines():
		lines.append(line)

def findAdjacentStar(row, col, numDigits):
	ret = None
	for y in range(row - 1, row + 2):
		if (y < 0 or y > LEN -1):
			continue
		for x in range(col - 1, col + numDigits + 1):
			if (x < 0 or x > LEN -1):
				continue
			if (y == row and not (x == col - 1 or x == col + numDigits)):
				continue
			if (lines[y][x] == '*'):
				ret = f'{x},{y}'
	return ret

final = 0
stars = {}
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
			if not lines[row][col].isdigit():
				break
		star = findAdjacentStar(row, start, col - start)
		if not star:
			continue
		print(star)
		if star in stars:
			gear_ratio = number * stars[star]
			print(f'found pair, adding {number} * {stars[star]} = {gear_ratio}')
			final += gear_ratio
		else:
			print(f'storing unpaired star {star}, number ${number}')
			stars[star] = number
print(final)