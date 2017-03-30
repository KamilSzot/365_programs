import curses
import _curses

stdscr = None

def start():
    global stdscr
    stdscr = curses.initscr()
    curses.curs_set(False)
    curses.noecho()
    curses.cbreak()
    stdscr.keypad(True)

def end():
    curses.nocbreak()
    stdscr.keypad(False)
    curses.echo()
    curses.curs_set(True)
    curses.endwin()


start()

(height, width) = stdscr.getmaxyx()

field = [['.'] * width for i in range(0, height)]
p = (height//2, width//2)
shape = ['.#.',
         '###',
         '#..']

for y in range(0, len(shape)):
    for x in range(0, len(shape[y])):
        field[y+p[0]-1][x+p[1]-1] = shape[y][x]


try:
    for y in range(0, height):
        for x in range(0, width):
            stdscr.addstr(y, x, str(field[y][x]))
except _curses.error as e: # neccesarry because drawing in bottom right corner causes exception even though it succeds
    pass

stdscr.refresh()
stdscr.getkey()
end()



