from collections import defaultdict

primes = [2,3,5,7,11,13,17,19]

def split(n):
    factors = defaultdict(int)
    p = 0
    while n>1:
        if n % primes[p] == 0:
            factors[primes[p]] += 1
            n = n // primes[p]
        else:
            p+=1
    return dict(factors)

result = { factor: 0 for factor in primes }

for x in range(2,21):
    factors = split(x)
    for k,v in factors.items():
        if not (k in result and result[k] >= v):
            result[k] = v
        
final = 1
for k, v in result.items():
    final *= k ** v

print(final)