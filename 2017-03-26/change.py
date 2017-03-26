import sys
from decimal import *

getcontext().prec = 5

values = [500, 200, 100, 50, 20, 10, 5, 2, 1, Decimal('.50'), Decimal('.20'), Decimal('.10'), Decimal('.05'), Decimal('.02'), Decimal('.01')]

try:
    amount = Decimal(sys.argv[1])

    print("{} can be represented as:".format(amount))
    i = 0
    while amount > 0:
        n = amount // values[i]
        amount -= n*values[i]
        if n > 0:
            print("{} times {}\t{} left".format(n, values[i], amount))
        i += 1

except:
    print("Usage: python change.py <amount_to_split_into_bills>")