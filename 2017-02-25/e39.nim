import tables

var counts = initTable[int, int](1024)

for p in countdown(1000, 6):
    for a in countup(1, p-2):
         var min_b = (p-2*a) div 2 + 1
         for b in countup(max(a+1, min_b), p-a-1):
             var c = p - a - b
             if c <= b:
                 break
             if (a*a + b*b) == c*c:
                if not counts.hasKey(p):
                    counts[p]=1
                else:
                    counts[p]+=1

var max_pc = 0
var max_p = 0
for k in counts.keys():
    if max_pc < counts[k]:
        max_pc = counts[k]
        max_p = k

echo max_p



                