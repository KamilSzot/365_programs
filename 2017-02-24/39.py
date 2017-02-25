import sys
from collections import defaultdict

counts = defaultdict(int)
uni = set()

for p in range(1000, 6, -1):
    for a in range(1, p-1):
        min_b = (p-2*a) // 2 + 1
        for b in range(max(a+1, min_b), p-a):
            c = p - a - b
            if c <= b:
                break
            if (a*a + b*b) == c*c:
                counts[p]+=1

max_p = max(counts, key=counts.get)
print(max_p)



                