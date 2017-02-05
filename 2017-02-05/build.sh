#!/bin/bash
export INCLUDE="C:\Program Files (x86)\Windows Kits\10\Include\10.0.14393.0\ucrt"
export LIB="C:\Program Files (x86)\Windows Kits\10\Lib\10.0.14393.0\um\x64;C:\Program Files (x86)\Windows Kits\10\Lib\10.0.14393.0\ucrt\x64"
nvcc trycuda.cu
