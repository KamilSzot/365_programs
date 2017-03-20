from random import randint


picked = set()

while len(picked) < 6:
    picked.add(randint(1, 49))

print(sorted(picked))
    