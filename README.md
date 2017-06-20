# Mars Rover Kata 2017-06-20 #1

Just trying out wallaby.js, jest, and typescript for implementing the Mars Rover Kata which I came across at Socrates UK for the first time

## TODO

- [x] You are given the initial starting point (x,y) of a rover and the direction (N,S,E,W) it is facing.
- [x] The rover receives a character array of commands.
- [x] Implement commands that move the rover forward/backward (f,b).
- [x] Implement commands that turn the rover left/right (l,r).
- [ ] Implement wrapping from one edge of the grid to another. (planets are spheres after all)
    - accept planet size parameter
- [ ] Implement obstacle detection before each move to a new square. If a given sequence of commands encounters an obstacle, the rover moves up to the last possible point and reports the obstacle.
    - accept array of obstacles on rover init