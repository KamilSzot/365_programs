import time

x = 0
v = 1

while True:
    print('\r'+'O'.rjust(x).ljust(10), end = "", flush = True)
    if x+v > 10 or x + v < 0:
        v = -v
    x += v
    time.sleep(.1)

