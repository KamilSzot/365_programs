import os
import time
import ctypes
from math import sin, cos, pi
 
os.environ["PYSDL2_DLL_PATH"] = "C:\\Program Files\\Python35\\other"

import sdl2
import sdl2.ext
import sdl2.sdlttf as sdlttf

SCREEN_WIDTH = 1920
SCREEN_HEIGHT = 1080

sdl2.ext.init()
window = sdl2.ext.Window("Game (not really)", size=(SCREEN_WIDTH, SCREEN_HEIGHT), flags=sdl2.SDL_WINDOW_BORDERLESS)
renderer = sdl2.ext.Renderer(window, flags=sdl2.SDL_RENDERER_ACCELERATED)# | sdl2.SDL_RENDERER_PRESENTVSYNC
factory = sdl2.ext.SpriteFactory(sdl2.ext.TEXTURE, renderer=renderer)

spriterenderer = factory.create_sprite_render_system()

window.show()
sdl2.SDL_RaiseWindow(window.window)
x = 100
y = 100
vx = 0
vy = 0
t = time.time()
while True:
    for event in sdl2.ext.get_events():
        if event.type == sdl2.SDL_QUIT:
            break
        elif event.type == sdl2.SDL_KEYDOWN and event.key.repeat == 0:        
            k = event.key.keysym.sym
            if k == sdl2.SDLK_RIGHT:
                vx = 1
            if k == sdl2.SDLK_LEFT:
                vx = -1
            if k == sdl2.SDLK_UP:
                vy = -1
            if k == sdl2.SDLK_DOWN:
                vy = 1
            print("Key was pressed "+repr(event.key.keysym.sym))
        elif event.type == sdl2.SDL_KEYUP and event.key.repeat == 0:
            k = event.key.keysym.sym
            if k == sdl2.SDLK_RIGHT or k == sdl2.SDLK_LEFT:
                vx = 0
            if k == sdl2.SDLK_UP or k == sdl2.SDLK_DOWN:
                vy = 0
            print("Key was released")
    keystatus = sdl2.SDL_GetKeyboardState(None)
    if keystatus[sdl2.SDL_SCANCODE_ESCAPE]:
        print("the Esc key was pressed")
        break

    dt = time.time() - t
    t += dt

    x += vx * dt * 100
    y += vy * dt * 100
    renderer.clear((80, 80, 80, 255))
    renderer.draw_line((0,0, int(x), int(y)))

    spriterenderer.render([])
sdl2.ext.quit()