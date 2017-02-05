#include <iostream>
#include <math.h>

int I = 500;
int J = 500;
int K = 500;



__global__
void mul(int I, int J, int K, float *x, float *y, float *z)
{
  int index = blockIdx.x * blockDim.x + threadIdx.x;
  int stride = blockDim.x * gridDim.x;
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
  setbuf(stdout, NULL);
  printf("Start\n");
  float *x, *y, *z;
  cudaMallocManaged(&x, I*J*sizeof(float));
  cudaMallocManaged(&y, J*K*sizeof(float));
  cudaMallocManaged(&z, I*K*sizeof(float));

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

  printf("Number %f\n", x[0]);
  mul<<<numBlocks, blockSize>>>(I, J, K, x, y, z);
  printf("Number %f\n", x[0]);
  cudaError_t cudaerr = cudaDeviceSynchronize();
  if (cudaerr != cudaSuccess)
      printf("kernel launch failed with error \"%s\".\n",
             cudaGetErrorString(cudaerr));

  // for(int i = 0; i < N; i++)
  // {
  //     if(fabs(y[i] - 3.0f)>0.000000001) {
  //         printf("Wrong! %d %f", i, y[i]);
  //         break;
  //     }
  // }

  printf("Number %f\n", x[0]);
  cudaFree(x);
  cudaFree(y);
  cudaFree(z);
}
