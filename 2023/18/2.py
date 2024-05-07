with open("input.txt") as f:
	input = [l.split() for l in f.readlines()]
	
v = [(0, 0)]
b = 0
x, y = 0, 0
for _, _, h in input:
	match h[7]:
		case '3': dx, dy =  0, -1
		case '0': dx, dy =  1,  0
		case '1': dx, dy =  0,  1
		case  _ : dx, dy = -1,  0
	dist = int(h[2:7], 16)
	b += dist
	x += dx * dist
	y += dy * dist
	v.append((x, y))

A = 0.5 * sum(y * (v[(i - 1) % len(v)][0] - v[(i + 1) % len(v)][0]) for i, (_, y) in enumerate(v))
interior = int(A - b/2 + 1)
total = interior + b

print(total)