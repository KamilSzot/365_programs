// solution using generators 
// function *range(from, to) {
//     for(let i = from; i <= to; i++) {
//         yield i;
//     }
// }


// function *reverse(col) {    
//     let first = col.next().value; // illegal . character
//     if(!first) {
//         return;
//     }
//     for(let e of reverse(col)) {
//         yield e;
//     }
//     yield first;
// }

// function *map(col, fn) {
//     for(let e of col) {
//         yield fn(e);
//     }    
// }

// function foreach(col, fn) {
//     for(let e of col) {
//         fn(e);
//     }
// }



// collection is a function that when called without parameter returns collection without head
// and called with function parameter calls that function passing head as a parameter


// should be macro
// transplants head from headDonor onto tail and morphs head action
let stitch = (headDonor, tail, headActionMorpher = (e) => e) => (fn) => !fn ? tail : headDonor(headActionMorpher(fn));

// could be macro
let passNil = (col) => col == nil ? nil : undefined;

// empty collection
let nil = () => nil;

// collection containing nubmers between from and two
let range = (from, to) => from > to ? nil : stitch((fn) => fn(from), range(from+1, to));

// collection containing concatenation of two collections
let join = (col1, col2) => col1 == nil ? col2 : stitch(col1, join(col1(), col2));

// collection containing same elements but in reverse order
let reverse = (col) => passNil(col) || stitch(reverse(col()), join(reverse(col()), stitch(col, nil)));

// collection containing same elements but transformed
let map = (col, ft) => passNil(col) || stitch(col, map(col(), ft), (fn) => (e) => fn(ft(e)));

// applies given function on collection, returns empty collection
let foreach = (col, fn) => passNil(col) || (col(fn), foreach(col(), fn), nil);    

let numbers = range(1, 10);
numbers = map(numbers, function (n) { return n * n });
numbers = reverse(numbers);
foreach(numbers, console.log);
