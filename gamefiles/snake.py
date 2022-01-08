import pygame as pg
from pygame.locals import *
import numpy as np
import sys

pg.init()

pg.font.init()

WIDTH, HEIGHT = 640, 480

GAME_X, GAME_Y = 50, 35

pixel_x = WIDTH // GAME_X
pixel_y = HEIGHT // GAME_Y

screen = pg.display.set_mode((WIDTH,HEIGHT))
pg.display.set_caption("Template")

clock = pg.time.Clock()
font = pg.font.SysFont("Impact", 20)

direction = (1,0) #Right, Left = (-1,0), Up = (0,-1), Down = (0,1)
snake = [(1,1), (2,1), (3,1)] #snake starts in left corner

def make_fruit():
    fruit = (np.random.randint(0,GAME_X), np.random.randint(0,GAME_Y))

    while fruit in snake:
        fruit = (np.random.randint(0,GAME_X), np.random.randint(0,GAME_Y))

    return fruit

fruit = make_fruit()

def draw_sqare(x, y, color):
    rect_x = x*pixel_x
    rect_y = y*pixel_y

    pg.draw.rect(screen, color, (rect_x+1, rect_y+1, pixel_x-2, pixel_y-2))

textsurface = font.render("Score: 0", True, (0,0,0))

#Game loop
while True:
    #Get input
    for event in pg.event.get():
        if event.type == QUIT:
            pg.quit()
            sys.exit()
        elif event.type == pg.KEYDOWN:
            if pg.key.get_pressed()[pg.K_UP] and direction[1] == 0:
                direction = (0,-1)
            elif pg.key.get_pressed()[pg.K_DOWN] and direction[1] == 0:
                direction = (0,1)
            elif pg.key.get_pressed()[pg.K_LEFT] and direction[0] == 0:
                direction = (-1,0)
            elif pg.key.get_pressed()[pg.K_RIGHT] and direction[0] == 0:
                direction = (1,0)
    
    #Update
    screen.fill((100,150,0))

    #Update snake
    new_x = (snake[-1][0] + direction[0]) % GAME_X
    new_y = (snake[-1][1] + direction[1]) % GAME_Y

    if (new_x, new_y) in snake:
        break

    snake.append((new_x, new_y))

    if (new_x, new_y) != fruit:
        snake.pop(0)

    else:
        fruit = make_fruit()
        textsurface = font.render(f"Score: {len(snake)-3}", True, (0,0,0))

    #Draw snake
    for part in snake:
        draw_sqare(*part, (0,0,0))

    #Draw fruit
    draw_sqare(*fruit, (255,0,0))

    #Draw text
    screen.blit(textsurface, (10,10))
    pg.display.flip()
    
    clock.tick(max(len(snake), 5))

#End screen
endscreen = font.render(f"YOU LOSE! final socre: {len(snake)-3}", True, (0,0,0))

screen.blit(endscreen, (((WIDTH - endscreen.get_width()) // 2), ((HEIGHT - endscreen.get_height()) // 2)))
pg.display.flip()

while True:
    for event in pg.event.get():
        if event.type == QUIT:
            pg.quit()
            sys.exit()

    clock.tick(10)
