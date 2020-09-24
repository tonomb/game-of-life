# John Conway's Game of Life
***
The Game of Life is not your typical computer game. It is a 'cellular automaton', and was invented by Cambridge mathematician John Conway.

Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. 

## The Rules 

1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed; births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick. Each generation is a pure function of the preceding one. The rules continue to be applied repeatedly to create further generations.

***
## Celular Automata

A cellular automaton is a program that operates on data typically stored in a 2D grid

A simple set of rules describes how the value in a cell on the grid changes over time, often as the result of the states of that cell's neighbors.

Each round of the simulation examines the current state of the grid, and then produces an entirely new grid consisting of the old state

This new grid becomes the "current" state of the simulation, and the process repeats. Each new grid is referred to as a generation

***

## Turing Completeness

We say a computing system is Turing Complete if it is capable of performing arbitrary, general purpose computation.

Using a construct in The Game of Life called a glider gun, it's possible to build a rudimentary NAND gate in the Game of Life. While a NAND gate by itself isn't enough to be Turing Complete, the "infinite" grid of The Game of Life allows you to use them (or any other functionally complete operator) to build any other type of logical "circuitry" and memory, as well.

Anything computable can be computed in The Game of Life given a large enough grid and enough time. Most people, however, find JavaScript to be a far easier development medium.

***
### Features

[x] Create a few sample cell configurations that users can load and run

[x] Add an option that creates a random cell configuration that users can run

[ ] Add additional cell properties, like color or size, and incorporate them into your visualization

[x] Allow users to specify the speed of the simulation

[x] Provide functionality to manually step through the simulation one generation at a time, as opposed to animating automatically

[ ] Allow users to change the dimension of the grid being displayed

[ ]Given a specific generation, calculate the configuration of cells at that point in time, and jump to that state, bypassing animation (i.e. skip ahead n generations).

[ ] If you have an idea for a custom feature on this list, run it by your TL or instructor



### Your simulation will receive a 2 when it satisfies the following:

* [X] Display includes a text area that shows the current generation of cells being displayed
* [X] Display includes a grid of cells, at least 25x25, that can be toggled to be alive or dead
* [X] Display includes working buttons that start / stop the animation and clear the grid
* [X] Algorithm to generate new generations of cells correctly implemented
* [X] At least 3 features from Custom Features section successfully implemented
* [X] Application includes a section outlining the rules to Conway's "Game of Life"



### New Patterns

To add new patterns, uncomment the save button. The save button will save the current pattern to the browser's local storage. Create a new data file, copy the existing code and swap out the array with the new pattern. 