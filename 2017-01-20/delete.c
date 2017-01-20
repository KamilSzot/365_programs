#include<stdlib.h>
#include<stdio.h>
const long long size = 1000000000ll;
const int seed = 123;

char* withSpaces;

void fill(char *arr) {
    srand(seed);
    long long i;
    for(i = 0; i < size; i++) {
        char c = rand() % sizeof(char);
        if(c == 0) {
            c = ' ';
        }
        arr[i] = c;
    }
}

long long removeSpaces() {
    char *to, *from;
    to = from = withSpaces;
    while(from < withSpaces + size) {
        if(*from != ' ' && *from != '\n' && *from != '\r') {
            *to++ = *from++;
        } else {
            ++from;
        }
    }
    return from - to;
}


int main() {
    withSpaces = (char*)malloc(sizeof(char)*size);
    printf("Filling array...\n");
    fflush(stdout); 
    fill(withSpaces);
    printf("Removing spaces...\n");
    fflush(stdout); 
    long long newSize = removeSpaces();
    printf("Removed...");
    fflush(stdout); 
    free(withSpaces);
    return 0;
} 