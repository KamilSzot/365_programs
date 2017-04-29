

sum_of_sqares = (n) ->
    [1..n]
        .map (v) -> sqare(v)
        .reduce (s, v) -> s + v

sqare = (v) -> v * v

sqare_of_sum = (n) ->
    sqare([1..n]
        .reduce (s, v) -> s + v
    )
        

n = 100
console.log sqare_of_sum(n) - sum_of_sqares(n)

