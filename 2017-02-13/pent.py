import sys

pent_cache = set([1])
pent_max_cached = 1

def P(n):
    return n*(3*n-1) // 2

def isPent(k): 
    global pent_max_cached   
    if k <= P(pent_max_cached):
        return k in pent_cache        
    while True:
        pent_max_cached += 1
        p = P(pent_max_cached)
        pent_cache.add(p)
        if k == p:
            return True
        if k < p:
            return False


x = 1
while True:
    x += 1
    y = x
    while y > 1:
        y -= 1
        # if P(x) == 5482660:
        #     print("{0} {1}   -:{2} {4}   +:{3} {5}".format(P(x), P(y), P(x)-P(y), P(x)+P(y), isPent(P(x)-P(y)), isPent(P(x)+P(y))))
        # print(str(y)+' '+str(x))
        # print(str(P(y))+' '+str(P(x)))
        # print(P(x) + P(y))
        # print(pent_max_cached)
        # print(isPent(P(x) + P(y)))
        # print(pent_max_cached)
        # print(pent_cache)
            
        if isPent(P(x) - P(y)) and isPent(P(x) + P(y)):
            print("P({0}) = {1}\nP({2}) = {3}".format(y, P(y), x, P(y)))
            print("P({0}) + P({1}) = {2}".format(x, y, P(x) + P(y)))
            print("P({0}) - P({1}) = {2}".format(x, y, P(x) - P(y)))
            sys.exit(0)
        