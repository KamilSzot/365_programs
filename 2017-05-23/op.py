
from random import randint 

def experiment(_):
    cnt = 0
    burned = [False]*48
    while not all(burned):
        burned[randint(0, len(burned)-1)] = True
        cnt+=1
    return cnt    

n = 10000
print(sum(map(experiment, range(n)))/n)