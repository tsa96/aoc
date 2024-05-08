from time import time

input = open("./input.txt").read()

start = time()

n = 14 # 4 for p1
i = n - 1
while True:
    i += 1
    s = input[i - n:i]
    if len(set(s)) == len(s):
        print(i)
        break

print(f"Time: {(time() - start) * 1000} ms")
