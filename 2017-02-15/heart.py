import matplotlib.pyplot as plt
import numpy as np


t = np.arange(0, 2 * np.pi, 0.01)
x = 16*np.sin(t)**3
y = 13*np.cos(t)-5*np.cos(2*t)-2*np.cos(3*t)-np.cos(4*t)


plt.plot(x, y)
plt.axis('equal')
plt.ylabel('valentines')
plt.show()