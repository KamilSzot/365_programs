echo "Looking for primes"
const max = 20000000

var isPrime: array[2..max, bool]

for number in 2..max:
    isPrime[number] = true

for number in 2..max:
    if isPrime[number]:
#        echo number
        var mult = number + number
        while mult <= max:
            isPrime[mult] = false
            mult += number

for number in countdown(max, 2):
    if isPrime[number]:
        echo "Highest prime found " & $number
        break
