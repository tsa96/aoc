import copy
import re
import numpy as np


def parse():
    with open("./input.txt") as f:
        return [
            [nums[:3], nums[3:]]
            for nums in [
                [int(nums) for nums in re.sub(r"(\@\ )|,", "", l.rstrip()).split(" ")]
                for l in f
            ]
        ]


input = parse()

# Let line to find Λ := [aλ, bλ, cλ] + t[xλ, yλ, zλ]
# From question, cλ = 0, and line passes through every line [an, bn, cn] + t[xn, yn, xn] for some t.
# So for every n,
#
# an + xn * tn = aλ + xλ * tn,
# t = (aλ - an) / (xn - xλ)
#
# bn + yn * tn = bλ + yλ * tn,
# t = (bλ - bn) / (yn - yλ)
#
# cn + zn * tn = cλ + zλ * tn,
# t = (cλ - cn) / (zn - zλ)
#
# Substituting,
# (aλ - an) / (xn - xλ) = (bλ - bn) / (yn - yλ), rearranging
# aλ * yλ - bλ * xλ = yn * aλ - yn * aλ - bn * xλ - an * yλ - bn * xn + an * yn
#
# Pick from any lines, then
# y1 * aλ - x1 * bλ - a1 * yλ - b1 * xλ - b1 * x1 + a1 * y1 = y2 * aλ - x2 * bλ - a2 * yλ - b2 * xλ - b2 * x2 + a2 * y1, rearranging
# (x1 - x2) * bλ + (y2 - y1) * aλ + (a2 - a1) * yλ + (b2 - b1) * xλ = b1 * x1 - a1 * y1 - b2 * x2 + a2 * y2
#
# Then we have a system of linear equations we can solve for, where:
# a = x1 - x2, b = y2 - y1, c = a2 - a1, d = b2 - b1, e = b1 * x1 - a1 * y1 - b2 * x2 + a2 * y2
#
# Same reasoning can be applied for x and z.

yp, yq, zp, zq = [], [], [], []
for ((a1, b1, c1), (x1, y1, z1)), ((a2, b2, c2), (x2, y2, z2)) in (
    (input[i], input[i + 1]) for i in range(4)
):
    yp.append([x1 - x2, y2 - y1, a2 - a1, b2 - b1])
    yq.append(b1 * x1 - a1 * y1 - b2 * x2 + a2 * y2)
    
    zp.append([x1 - x2, z2 - z1, a2 - a1, c2 - c1])
    zq.append(c1 * x1 - a1 * z1 - c2 * x2 + a2 * z2)

# Started looking up gaussian elimination algorithms (can't remember off top of my head) here but I'm too tired
b, a, _, _ = np.linalg.solve(np.array(yp), np.array(yq))
c, _, _, _ = np.linalg.solve(np.array(zp), np.array(zq))

print(a + b + c)
