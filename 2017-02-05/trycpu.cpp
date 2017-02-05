#include <iostream>
#include <math.h>

const int I = 500;
const int J = 500;
const int K = 500;




void mul(int I, int J, int K, float *x, float *y, float *z)
{
  int index = 0;
  int stride = 1;
  for(int q=index; q<I*K; q+=stride) {
    int i = q / K;
    int k = q % K;
    z[q] = 0.0f;
    for(int j=0; j<J; j++) {
      z[q] += x[i*J+j] * y[j*K+k];
    }
  }
}

int main(void)
{
  printf("Start");
  float *x, *y, *z;
  x = new float[I*J*sizeof(float)];
  y = new float[J*K*sizeof(float)];
  z = new float[I*K*sizeof(float)];

  for(int i = 0; i < I*J; i++)
  {
    x[i] = 1.0f;
  }

  for(int i = 0; i < J*K; i++)
  {
    y[i] = 2.0f;
  }

  int blockSize = 1; //512;
  int numBlocks = 1; //min(65535, (I*K + blockSize - 1) / blockSize);

  mul(I, J, K, x, y, z);


  // for(int i = 0; i < N; i++)
  // {
  //     if(fabs(y[i] - 3.0f)>0.000000001) {
  //         printf("Wrong! %d %f", i, y[i]);
  //         break;
  //     }
  // }

  printf("Number %f %f\n", z[0], z[I*K-1]);
  delete x;
  delete y;
  delete z;
}
