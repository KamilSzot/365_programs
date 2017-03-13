package require Tk
set a 1
set b 2

message .m -text [concat {Hello Tcl!} [expr {$a + $b + 2 * (2 + 2)}]]  -background white
pack .m -expand true -fill both -ipadx 100 -ipady 40

menu .menubar
menu .menubar.help -tearoff 0
.menubar add cascade -label Help -menu .menubar.help -underline 0
.menubar.help add command -label {About Hello ...} \
  -accelerator F1 -underline 0 -command showAbout



proc showAbout {} {
    tk_messageBox -message "Tcl/Tk\nHello Windows\nVersion 1.0" -title {About Hello}
}

wm title . {Hello Foundation Application}
. configure -menu .menubar -width 200 -height 150
bind . {<Key F1>} {showAbout}
