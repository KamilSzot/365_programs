flatten = (arr) ->
    [].concat.apply [], arr

perm = (n) ->
    if n == 0
        [[]]
    else 
        flatten flatten [p[0...i].concat([n]).concat(p[i...]) for i in [0..(p.length)] for p in perm(n-1)]

console.log JSON.stringify perm(5)
