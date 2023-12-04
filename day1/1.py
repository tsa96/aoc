sum = 0
with open('./input.txt', 'r') as f:
	for line in f.readlines():
		str = ''
		chars = list(line)[:-1]
		chars_reversed = chars.copy()
		chars_reversed.reverse()
		for arr in [chars, chars_reversed]:
			for i in arr:
				if not i.isdigit():
					continue
				str += i
				break
		sum += int(str)
print(sum)