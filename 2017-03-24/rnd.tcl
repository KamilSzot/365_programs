set picks [dict create]

while {[dict size $picks]<6} {
  dict set picks [expr {int(rand()*49)+1}] 1
}

puts [lsort -integer  [dict keys $picks]]
