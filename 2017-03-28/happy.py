# happy number is number that ends up in 1 when it's digits are squared and summed  repeatedly

happy = []

#start with one
number = 1
#while we don't have enough happy numbers yet
while len(happy) < 100:
    # start with the number
    remaining = number
    # empty the cycle safeguard
    seen = set()

    while True:
        # if already in the cycle safeguard then process ended in a cycle not one
        if remaining in seen:
            break
        # add to cycle safeguard
        seen.add(remaining)

        # if we reached one then the number was happy number
        if remaining == 1:
            happy.append(number)
            break

        # split number into digits
        digits = []
        while remaining > 0:
            digits.append(remaining % 10)
            remaining = remaining // 10
        # set the new number as sum of squared digits
        remaining = sum([d*d for d in digits])
    
    # try next nubmer
    number += 1

print(happy)
