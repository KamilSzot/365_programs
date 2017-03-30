picks = new Set();

while picks.size < 6
    pick = Math.floor(Math.random()*49) + 1
    picks.add(pick)

picks = Array.from(picks.values()).sort((a,b) => a-b)

console.log(picks)