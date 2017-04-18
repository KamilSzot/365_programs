package main

import (
	"fmt"
	"sync"
	"time"

	"github.com/jteeuwen/keyboard/termbox"
	term "github.com/nsf/termbox-go"
)

var wg sync.WaitGroup

// var shouldRun
var running = true

func showClock() {
	defer wg.Done()

	format := "15:04:05" // Mon Jan 2 15:04:05 -0700 MST 2006
	for running {
		now := time.Now()
		term.SetCursor(1, 5)
		fmt.Printf("%s\r", now.Format(format))

		// term.SetCell(1, 1, 'a', term.AttrBold, term.ColorBlack)
		// term.Flush()
		time.Sleep(10)
	}
}

func main() {
	err := term.Init()
	if err != nil {
		panic(err)
	}

	defer term.Close()

	term.HideCursor()
	term.SetCursor(1, 1)
	fmt.Print("Press Esc to exit...")

	kb := termbox.New()
	kb.Bind(func() {
		fmt.Println("pressed Esc!")
		running = false
	}, "escape")

	wg.Add(1)
	go showClock()
	// term.SetCell(1, 1, 'a', term.AttrBold, term.ColorBlack)
	// term.Flush()

	for running {
		kb.Poll(term.PollEvent())
	}
	wg.Wait()

}
