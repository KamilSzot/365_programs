import sequtils, algorithm, math


type Number = seq[int8]
var cache:array[1..9, seq[Number]]

proc newSingleDigitNumber(n:int):Number =
    result = @[(int8)n]

proc generatePandigitals(n:int):seq[Number] =
    if cache[n] != nil:
        return cache[n]
    if n==1:
        return @[newSingleDigitNumber(1)]
    
    result = @[]
    var bases = generatePandigitals(n-1)    
    for base in bases:    
        var before, after: Number
        for i in base.low..base.high:
            if i>base.low:
                before = base[0..i-1]
            else:
                before = @[]
            after = base[i..base.high]
            
            result.add(before & newSingleDigitNumber(n) & after)
        result.add(base & newSingleDigitNumber(n))
    
    cache[n] = result

var pandigitals:seq[int] = (1..9)
    .foldl(a & generatePandigitals(b), newSeq[Number]())
    .mapIt(it.foldl(a*10+b, 0))

sort(pandigitals, system.cmp[int], SortOrder.Descending)

proc is_prime(n:int):bool =
    var md = (int)ceil(sqrt((float64)n))
    for d in countup(2, md):
        if n mod d == 0:
            return false
    return true

for n in pandigitals:
    if is_prime(n):
        echo n
        break




    