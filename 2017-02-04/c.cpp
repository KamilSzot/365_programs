#include <iostream>
#include <math.h>

void add(int n, float *x, float *y)
{
  for(int i = 0; i< n; i++) {
    y[i] = x[i] + y[i];
  }
}

int main(void)
{
  int N = 1<<26;
  float *x, *y;
  x = new float[N];
  y = new float[N];

  for(int i = 0; i < N; i++)
  {
    x[i] = 1.0f;
    y[i] = 2.0f;
  }
  add(N, x, y);
  for(int i = 0; i < N; i++)
  {
      if(fabs(y[i] - 3.0f)>0.000000001) {
          printf("Wrong!");
          break;
      }
  }
  delete x;
  delete y;
}
