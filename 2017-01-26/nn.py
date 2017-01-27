import numpy as np

def nonlin(x, deriv=False):
    return 1/(1+np.exp(-x))

def nonlin_bp(x):
    return x*(1-x)

X = np.array([
    [0,0,1],
    [0,1,1],
    [1,0,1],
    [1,1,1],
    [0,0,0],
    [0,1,0],
    [1,0,0],
    [1,1,0],
])

Y = np.array([
    [0],
    [1],
    [1],
    [0],
    [0],
    [1],
    [1],
    [0]
])

np.random.seed(5)

n_hidden = 3

syn0 = 2*np.random.random((X.shape[1], n_hidden)) - 1
syn1 = 2*np.random.random((n_hidden, Y.shape[1])) - 1


for j in xrange(60000):
    
    l0 = X
    l1 = nonlin(np.dot(l0, syn0))
    l2 = nonlin(np.dot(l1, syn1))
    
    l2_error = Y - l2
    
    if j % 10000 == 0:
        print "Error:"+str(np.mean(np.abs(l2_error)))

    l2_delta = l2_error * nonlin_bp(l2)
    l1_error = l2_delta.dot(syn1.T)
    l1_delta = l1_error * nonlin_bp(l1)

    syn1 += l1.T.dot(l2_delta)
    syn0 += l0.T.dot(l1_delta)
    # syn1[np.abs(syn1) < 0.2] = 0
    # syn0[np.abs(syn0) < 0.2] = 0

print "Output after training"
np.set_printoptions(precision=2, suppress=True)
print l2
print "Output layer weights"
print syn1
print "Hidden layer weights"
print syn0
# print np.count_nonzero(syn1)
# print np.count_nonzero(syn0)
