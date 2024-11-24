from time import time

input = open("./input.txt").read().splitlines()
start = time()

grid = [[int(y) for y in list(x)] for x in input]
size = len(grid)

def test(x, y):
    h = grid[y][x]

    count = 0
    for a, b, horiz in [
        (0, x, True),
        (x + 1, size, True),
        (0, y, False),
        (y + 1, size, False),
    ]:
        for i in range(a, b):
            val = grid[y][i] if horiz else grid[i][x]
            if val >= h:
                count += 1
                break

    print
    return count < 4


s = 0
for y in range(size):
    for x in range(size):
        if test(x, y):
            s += 1
            
# part 1
print(s)

# part 2
def test2(x, y):
    total = 1
    for a, b, horiz in [
        (x - 1, 0, True),
        (x + 1, size, True),
        (y - 1, 0, False),
        (y + 1, size, False),
    ]:
        m = 0
        i = 0
        for q in range(a, b):
            val = grid[y][q] if horiz else grid[q][x]
            print(val)
            
            if val <= m or q == size or q == 0:
                total *= i
                print(i)
                break
            
            m = val
            i += 1
    return total

print(test2(3,2))
#print(max([test2(x, y) for x in range(size) for y in range(size)]))

print(f"Time: {(time() - start) * 1000} ms")
