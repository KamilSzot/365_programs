import bigints
import math
import sequtils

var n = initBigInt(1_000_000_000_000'i64)

proc toFloat64(a:BigInt):float64 =
    result = 0
    for i in countdown(a.limbs.high, a.limbs.low):
        var part = a.limbs[i]
        result *= float64(1'i64 shl 32)
        result += float64(part)
    if a < 0:
        result *= -1

# proc sqrt(a:BigInt, mi:BigInt, ma:BigInt):BigInt =
#     var min = mi #0.initBigInt
#     var max = ma #a
#     while true:
#         var mid = (min + max) div 2
#         var sq = mid*mid
#         if  sq == a:
#             return mid
#         if sq < a:
#             if min == mid:
#                 return -1.initBigInt
#             min = mid
#         else:
#             max = mid

#echo sqrt(810.initBigInt)            


# echo n
# echo n.toFloat64
# system.quit(0)

var sn = n
while true:
    var delta:BigInt = 1.initBigInt+2.initBigInt*n*(n-1)
    # var rootRounded = sqrt(delta, n div 2, n)
    var root = sqrt(delta.toFloat64)
    var rootRounded = initBigInt(int64(round(root)))
    # if n - sn > 10_000_000.initBigInt:
    #     system.quit(0)
    if rootRounded * rootRounded == delta:
    # if rootRounded > -1:
        echo ((2.initBigInt + 2.initBigInt*rootRounded) div 4.initBigInt)
        echo n
        quit(QuitSuccess)
    n += 1

