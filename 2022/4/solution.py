input = open("./input.txt").read().splitlines()

p1 = 0
for line in input:
    [l1, r1], [l2, r2] = [[int(y) for y in x.split('-')] for x in line.split(',')]
    if (l1 <= l2 and r1 >= r2) or (l2 <= l1 and r2 >= r1):
        p1 += 1
print(p1)

p2 = 0
for line in input:
    [l1, r1], [l2, r2] = [[int(y) for y in x.split('-')] for x in line.split(',')]
    if (r1 >= l2 and l1 <= r2) and (r2 >= l1 and l1 <= r2):
        p2 += 1
print(p2)