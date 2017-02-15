gcd = (a, b) ->
    if b > a
        [a, b] = [b, a]

    while b != 0
        [a, b] = [b, a % b]

    a

console.log(gcd(135, 155))
