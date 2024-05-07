import re
import itertools


def parse():
    with open("./input.txt") as f:
        return [
            [nums[:3], nums[3:]]
            for nums in [
                [int(nums) for nums in re.sub(r"(\@\ )|,", "", l.rstrip()).split(" ")]
                for l in f
            ]
        ]


def find_intersection(A, B):
    m1 = A[1][1] / A[1][0]
    m2 = B[1][1] / B[1][0]

    if (m1 - m2) == 0:
        return

    # From y - y_0 = m(x - x_0). Yes I derived this garbage myself
    x = (B[0][1] - A[0][1] + m1 * A[0][0] - m2 * B[0][0]) / (m1 - m2)
    y = m1 * (x - A[0][0]) + A[0][1]

    # let x = x_start + t * x_dir
    # then t = (x - x_start) / x_dir
    if (x - A[0][0]) / A[1][0] < 0 or (x - B[0][0]) / B[1][0] < 0:
        return
    
    return x, y


input = parse()
intersections = sum(
    1
    for A, B in itertools.combinations(input, 2)
    if (intersection := find_intersection(A, B))
    and all(dir >= 200000000000000 and dir <= 400000000000000 for dir in intersection)
)
print(intersections)
