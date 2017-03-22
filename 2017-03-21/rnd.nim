import random
import sets
import algorithm
import sequtils
import times
import math

randomize()

var picks = initSet[int]()

while len(picks) < 6:
    picks.incl(random(1..49))


echo $sorted(toSeq(picks.items), system.cmp);
