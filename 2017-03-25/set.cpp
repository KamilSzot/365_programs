 /*
  * set.c -- A minimal Tcl C extension.
  */
 #include <tcl.h>

 static int
 Set_Cmd(ClientData cdata, Tcl_Interp *interp, int objc, Tcl_Obj *const objv[])
 {
     Tcl_SetObjResult(interp, Tcl_NewStringObj("Hello, Github!", -1));
     return TCL_OK;
 }

 /*
  * Set_Init -- Called when Tcl loads your extension.
  */

 extern "C" int DLLEXPORT
 Set_Init(Tcl_Interp *interp)
 {
     if (Tcl_InitStubs(interp, TCL_VERSION, 0) == NULL) {
         return TCL_ERROR;
     }
     /* changed this to check for an error - GPS */
     if (Tcl_PkgProvide(interp, "Set", "1.0") == TCL_ERROR) {
         return TCL_ERROR;
     }
     Tcl_CreateObjCommand(interp, "hello", Set_Cmd, NULL, NULL);
     return TCL_OK;
 }
