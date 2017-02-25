import sys
from collections import defaultdict

counts = defaultdict(int)
uni = set()

for p in range(1000, 6, -1):
    for a in range(1, p-1):
        min_b = (p-2*a) // 2 + 1
        for b in range(min_b, p-a):
            c = p - a - b
            tri = tuple(sorted([a,b,c]))
            if a+b>c and a+c>b and b+c>a and (a*a + b*b) == c*c and not tri in uni:
                uni.add(tri)
                counts[p]+=1

max_p = max(counts, key=counts.get)
print(max_p)
print(sum([counts[k] for k in counts]))
print(counts)


                