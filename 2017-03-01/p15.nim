import tables

var cache = newTable[tuple[n:int, m:int], int]()

proc routes(n: int, m: int):int =
    if n == 0 or m == 0:
        return 1
    var key = (n: min(n, m), m: max(n, m))
    if cache.hasKey(key):
        return cache[key]
    result = routes(n-1, m) + routes(n, m-1)
    cache[key] = result

proc routes(n: int):int = 
    return routes(n, n)

echo routes(20)
