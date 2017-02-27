import strutils

type
    Number = seq[int]

proc `+`(a:Number, b:Number):Number =
    var max_ind = max(a.high, b.high)
    result = newSeq[int]()
    var s:int = 0
    for i in countup(0, max_ind):
        if i <= a.high:
            s += a[i]
        if i <= b.high:
            s += b[i]
        result.add(s mod 10)
        s = s div 10
    if s>0:
        result.add(s)
    

proc newNumber(n:int):Number = 
    var nn = n
    result = newSeq[int]()
    while nn > 0:
        result.add(nn mod 10)
        nn = nn div 10

proc reversed(s: Number): Number =
    result = newSeq[int](s.len)
    for i,c in s:
        result[s.high - i] = c

proc `==`(a:Number, b: Number): bool =
    if a.len != b.len:
        return false
    for i in a.low..a.high:
        if a[i] != b[i]:
            return false
    return true

var cntLychrel = 0
for n in 1..10000:
    var a = newNumber(n)
    block checkIfLychrel:
        var cnt:int = 50
        while cnt > 0:
            var b = reversed(a)
            var c = a + b
            if c == reversed(c):
                break checkIfLychrel
            a = c
            cnt-=1
        echo n
        cntLychrel += 1

echo "\n$#" % $cntLychrel
    

# var a = reversed(newNumber(1235)) #Number(@[1,2,3,6])
# var b = Number(@[3,2,2,4])

# echo a + b == Number(@[4,4,5,0,1])


