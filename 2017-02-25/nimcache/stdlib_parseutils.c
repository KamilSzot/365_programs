/* Generated by Nim Compiler v0.14.2 */
/*   (c) 2015 Andreas Rumpf */
/* The generated code is subject to the original license. */
/* Compiled for: Windows, amd64, gcc */
/* Command for C compiler:
   gcc.exe -c  -w  -IH:\Nim\lib -o c:\experiments\365_programs\2017-02-25\nimcache\stdlib_parseutils.o c:\experiments\365_programs\2017-02-25\nimcache\stdlib_parseutils.c */
#define NIM_INTBITS 64

#include "nimbase.h"
static N_INLINE(void, nimFrame)(TFrame* s0);
N_NOINLINE(void, stackoverflow_22401_1689653243)(void);
static N_INLINE(void, popFrame)(void);
extern TFrame* frameptr_19636_1689653243;

static N_INLINE(void, nimFrame)(TFrame* s0) {
	NI LOC1;
	LOC1 = (NI)0;
	{
		if (!(frameptr_19636_1689653243 == NIM_NIL)) goto LA4;
		LOC1 = ((NI) 0);
	}
	goto LA2;
	LA4: ;
	{
		LOC1 = ((NI) ((NI16)((*frameptr_19636_1689653243).calldepth + ((NI16) 1))));
	}
	LA2: ;
	(*s0).calldepth = ((NI16) (LOC1));
	(*s0).prev = frameptr_19636_1689653243;
	frameptr_19636_1689653243 = s0;
	{
		if (!((*s0).calldepth == ((NI16) 2000))) goto LA9;
		stackoverflow_22401_1689653243();
	}
	LA9: ;
}

static N_INLINE(void, popFrame)(void) {
	frameptr_19636_1689653243 = (*frameptr_19636_1689653243).prev;
}
NIM_EXTERNC N_NOINLINE(void, stdlib_parseutilsInit000)(void) {
	nimfr("parseutils", "parseutils.nim")
	popFrame();
}

NIM_EXTERNC N_NOINLINE(void, stdlib_parseutilsDatInit000)(void) {
}

