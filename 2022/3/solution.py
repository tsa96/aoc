input = open("./input.txt").read().splitlines()

p1 = 0
for line in input:
    l = len(line)
    a, b = line[:l//2], line[l//2:]
    for x in set(x for x in a if x in b):
        p1 += (ord(x) - ord('A') + 27) if x.isupper() else (ord(x) - ord('a') + 1)

print(p1)

p2 = 0
for i in range(0, len(input), 3):
    print(i)
    t = set(x for x in input[i] if (x in input[i+1] and x in input[i+2]))
    print(t)
    for x in t:
        p2 += (ord(x) - ord('A') + 27) if x.isupper() else (ord(x) - ord('a') + 1)

print(p2)