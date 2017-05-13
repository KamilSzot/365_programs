from random import randint, random
import sys
import time

for y in range(0, 20):
    for x in range(0, 10):
        sys.stdout.write("{:02X}: ".format(randint(0, 255)))
        sys.stdout.flush()
        time.sleep(random() * 0.1)
    sys.stdout.write("\n")
