input = open("./input.txt").read()

# original version, using a dict for some stupid reason ??
# cratein, procin = input.split("\n\n")
# cratein = cratein.splitlines()
# crates: dict[int, list[str]] = {}
# cols = len(cratein[0])
# for i in range(0, cols + 1, 4):
#     arr = []
#     crates[(i // 4) + 1] = arr
#     for j in range(len(cratein) - 1):
#         c = cratein[len(cratein) - 2 - j][i + 1]
#         if c != " ":
#             arr.append(c)



cratein, procin = [x.splitlines() for x in input.split("\n\n")]

# okay python ranges are kinda sick
crates = [[] for _ in cratein[0][1::4]]
for line in cratein[-2::-1]:
    for i, c in enumerate(line[1::4]):
        if c != " ": crates[i] += c
        
for _, m, _, f, _, t in [l.split(' ') for l in procin]:
    for x in [crates[int(f) - 1].pop() for _ in range(int(m))][::-1]: # part 1 is just without the reverse
        crates[int(t) - 1].append(x)
    
print(''.join([x[-1] for x in crates]))
