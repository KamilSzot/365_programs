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

fontmanager = sdl2.ext.FontManager('Roboto-Regular.ttf')

sp = factory.from_image('heart-outline.png')
sp.x = (SCREEN_WIDTH - sp.size[0]) // 2
sp.y = (SCREEN_HEIGHT - sp.size[1]) // 2

window.show()
#sdl2.SDL_RaiseWindow(window.window)

renderer.clear((0, 0, 0, 255))
#sdl2.render.SDL_RenderPresent(spriterenderer.sdlrenderer)
black = True
frames = 0
start_time = time.time()-0.0001
msg = None

while True:
    for event in sdl2.ext.get_events():
        if event.type == sdl2.SDL_QUIT:
            break
        elif event.type == sdl2.SDL_KEYDOWN and event.key.repeat == 0:
            print("Key was pressed")
        elif event.type == sdl2.SDL_KEYUP and event.key.repeat == 0:
            print("Key was released")
    keystatus = sdl2.SDL_GetKeyboardState(None)
    if keystatus[sdl2.SDL_SCANCODE_ESCAPE]:
        print("the Esc key was pressed")
        break


    renderer.clear((80, 80, 80, 255))
#    renderer.fill([(0,0,SCREEN_WIDTH,SCREEN_HEIGHT)],(80,80,80))
    
    t = time.time()

    black = not black
    frames += 1
    fps = 0
    dt = (t-start_time)
    if dt > 0:
        fps = frames / (time.time()-start_time)
        msg = factory.from_text('{}'.format(fps), fontmanager=fontmanager)


    sp.x = (SCREEN_WIDTH - sp.size[0]) // 2   + int(sin(2*pi*t/3)*(SCREEN_WIDTH/4))
    sp.y = (SCREEN_HEIGHT - sp.size[1]) // 2  + int(cos(2*pi*t/3)*(SCREEN_WIDTH/4))


    spriterenderer.render([sp,msg])
#    time.sleep(0.01)
#    sdl2.render.SDL_RenderPresent(spriterenderer.sdlrenderer)
        

#    sdl2.render.SDL_RenderPresent(spriterenderer.sdlrenderer)


sdl2.ext.quit()

