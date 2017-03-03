from math import sqrt
import sys

n = 1000000000000

while True:
    delta = 1+2*n*(n-1)
    root = sqrt(delta)
    rootRounded = round(root)
    if rootRounded * rootRounded == delta:
        print((2 + 2*rootRounded) // 4)
        print(n)
        sys.exit(0)
    n += 1