import sys
for a in reversed(range(1, 1000)):
    for b in reversed(range(1, a)):
        m = str(a*b)
        if m == m[::-1]:
            print(m)
            sys.exit()