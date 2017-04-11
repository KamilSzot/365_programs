proc fib n {
  if {$n == 0} {
    return 0
  } elseif {$n == 1} {
    return 1
  } else {
    return [expr [fib [expr {$n-1}]]+[fib [expr {$n-2}]]]
  }
}

puts [fib 15]
