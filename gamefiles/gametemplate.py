import pygame as pg
from pygame.locals import *
import numpy as np
import sys

pg.init()

WIDTH, HIGHT = 640, 480

screen = pg.display.set_mode((WIDTH,HIGHT))
pg.display.set_caption("Template")

while True:
    for event in pg.event.get():
        if event.type == QUIT:
            pg.quit()
            sys.exit()
    
    screen.fill((25,0,25))

    pg.display.flip()


