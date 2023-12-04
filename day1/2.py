
sum = 0

number_strings = {
	'one': 1,
	'two': 2,
	'three': 3,
	'four': 4,
	'five': 5,
	'six': 6,
	'seven': 7,
	'eight': 8,
	'nine': 9
}

def find_number_string(string: str, i) -> int or None:
	sliced = string[i:]
	for k, v in number_strings.items():
		if ''.join(sliced[:len(k)]) == k:
			return v
	return None

with open('./input.txt', 'r') as f:
	for line in f.readlines():
		string = ''
		chars = list(line)[:-1]
		chars_reversed = chars.copy()
		chars_reversed.reverse()
		for arr, is_reversed in [[chars, False], [chars_reversed, True]]: # (●'◡'●)
			for i, char in enumerate(arr):
				if char.isdigit():
					string += char
					break
				num_string = find_number_string(chars, len(chars) - i - 1 if is_reversed else i)
				if num_string != None:
					string += str(num_string) 
					break
		print(string)
		sum += int(string)
print(sum)