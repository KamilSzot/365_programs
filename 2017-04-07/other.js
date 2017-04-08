// collection containing nubmers between from and two
let range = (from, to) => from <= to ? fn => (fn(from), range(from+1, to)) : undefined;

// collection containing concatenation of two collections
let join = (col1, col2) => col1 === undefined ? col2 : (fn => join(col1(fn), col2));

// collection containing same elements but in reverse order
let reverse = (col) => col && ((fn, head) => join(reverse(col((e)=>head = e)), (fn => (fn(head), undefined))));

// collection containing same elements but transformed
let map = (col, ft) => col && (fn => map(col((e) => fn(ft(e))), ft));

// applies given function on collection, returns empty collection
let foreach = (col, fn) => { while(col = col(fn)); }

let numbers = range(1, 10);
numbers = map(numbers, function (n) { return n * n });
numbers = reverse(numbers);
foreach(numbers, console.log);
