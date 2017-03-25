#!/bin/bash
g++ set.cpp -shared -o set.dll -DUSE_TCL_STUBS -ltclstub86 -I /c/Tcl/include/ -L /c/Tcl/lib/
