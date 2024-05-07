
import copy

def parse():
    def split(s):
        l, r = [x.split(',') for x in s.split("~")]
        return [[int(l[i]), int(r[i])] for i in range(3)]

    with open("input.txt") as f:
        return [split(l.strip()) for l in f]


bricks = parse()
bricks.sort(key=lambda x: x[2][0])

def fall(bricks):
    fallen = 0
    fallen_once = 0
    for i, [x, y, z] in enumerate(bricks):
        if z[0] == 1:
            continue
        
        collided = False
        max_depth = 50
        tmp = 0
        while z[0] > 1 and not collided:
            for [x2, y2, z2] in bricks[max(0, i - max_depth):i]:
                if z2[1] != z[0] - 1:
                    continue

                if not any((a < min(q) and b < min(q)) or (a > max(q) and b > max(q)) for [a, b], q in [[x, x2], [y, y2]]):
                    collided = True
                    break
            else:
                fallen += 1
                tmp = 1 if tmp == 0 else 1
                z[0] -= 1
                z[1] -= 1
        fallen_once += tmp
    return fallen, fallen_once


print(fall(bricks))

thing = 0
for brick in bricks:
    new_bricks = copy.deepcopy(bricks)
    new_bricks.remove(brick)
    # Part 1
    # if fall(new_bricks) == 0:
    #    thing += 1

    # Part 2
    thing += fall(new_bricks)[1]
print(thing)
