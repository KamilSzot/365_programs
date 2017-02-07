:- initialization(main).
main :- 
    write('Hello World!'),
    nl,
    hanoi(3,first,second,third),
    reverse([0|[1,2,3]], R),
    write(R), nl,
    size(R, N),
    write(N), nl,
    likes(john, john),
    write('John likes john'),
    nl,
    halt.

hanoi(1,X,Y,_) :-
    write('Move from '),
    write(X),
    write(' to '),
    write(Y),
    nl.

hanoi(N,X,Y,Z) :-
    N>1,
    M is N-1,
    hanoi(M,X,Z,Y),
    hanoi(1,X,Y,_),
    hanoi(M,Z,Y,X).

size([], 0).
size([_|T],N) :- size(T, N1), N is N1+1.
    
reverse(List, Reversed) :-
    reverse(List, [], Reversed).
reverse([], Reversed, Reversed).
reverse([H|T], SoFar, Reversed) :-
    reverse(T, [H|SoFar], Reversed).


likes(mary,food).
likes(mary,wine).
likes(john,wine).
likes(john,mary).

likes(john, X) :-
    likes(mary, X).

likes(john, X) :-
    likes(X, wine).

likes(john, X) :-
    likes(X, X).
    