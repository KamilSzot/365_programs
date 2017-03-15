#include <iostream>
int main(int argc, char** argv) {
    int op1 = 1234;
    int op2 = 2;
    int result=0;

    asm volatile (
        "movl %1, %%eax;"
        "movl %2, %%ebx;"
        "addl %%ebx, %%eax;"
        "movl %%eax, %0;"
        "nop;"
        : "=r" (result)
        : "r" (op1), "r" (op2)        
    );
    
    std::cout << op1 << " + " << op2 << " = " << result;
    return 0;
}