class Vector {
  constructor(public x: number, public y: number) {}

  add(other: Vector) {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  equals(other: Vector) {
    return this.x === other.x && this.y === other.y
  }
}

enum Direction {
  North,
  East,
  South,
  West
}

const PossibleDirections = Object.keys(Direction)
  .map(k => Direction[k])
  .filter(v => typeof v !== "string");

type RoverCommand = "F" | "B" | "R" | "L";

class Rover {
  constructor(
    private currentLocation: Vector,
    private currentDirection: Direction
  ) {}

  private possibleMoves = {
    [Direction.North]: {
      F: new Vector(0, 1),
      B: new Vector(0, -1)
    },
    [Direction.East]: {
      F: new Vector(1, 0),
      B: new Vector(-1, 0)
    },
    [Direction.South]: {
      F: new Vector(0, -1),
      B: new Vector(0, 1)
    },
    [Direction.West]: {
      F: new Vector(-1, 0),
      B: new Vector(1, 0)
    }
  };

  location() {
    return this.currentLocation;
  }

  direction() {
    return this.currentDirection;
  }

  execute(commands: Array<RoverCommand>) {
    commands.forEach(command => {
      let previousLocation = this.currentLocation;

      switch (command) {
        case "F":
        case "B":
          this.currentLocation = this.currentLocation.add(
            this.possibleMoves[this.currentDirection][command]
          );
          break;
        case "R":
          var nextDirection = PossibleDirections.indexOf(this.currentDirection) + 1;
          this.currentDirection =
            Direction[
              Direction[
                nextDirection >= PossibleDirections.length ? 0 : nextDirection
              ]
            ];
          break;
        case "L":
          var nextDirection = PossibleDirections.indexOf(this.currentDirection) - 1;
          this.currentDirection =
            Direction[
              Direction[
                nextDirection < 0 ? PossibleDirections.length - 1 : nextDirection
              ]
            ];
          break;
        default:
          console.log("unrecognised command");
          break;
      }
    });
  }
}

test("should let me set an initial starting point and direction", () => {
  let location = new Vector(0, 0);
  let direction: Direction = Direction.North;
  let rover = new Rover(location, direction);

  expect(rover.location().equals(location)).toBeTruthy()
});

test("should let me move the rover forward once when facing north", () => {
  let rover = new Rover(new Vector(0, 0), Direction.North);

  rover.execute(["F"]);

  expect(rover.location().equals(new Vector(0, 1))).toBeTruthy();
});

test("should let me move the rover forward multiple times when facing north", () => {
  let rover = new Rover(new Vector(0, 0), Direction.North);

  rover.execute(["F", "F"]);

  expect(rover.location().equals(new Vector(0, 2))).toBeTruthy()
});

test("should let me move the rover backward once when facing north", () => {
  let rover = new Rover(new Vector(0, 0), Direction.North);

  rover.execute(["B"]);

  expect(rover.location().equals(new Vector(0, -1))).toBeTruthy();
});

test("should let me move the rover backward multiple times when facing north", () => {
  let rover = new Rover(new Vector(0, 0), Direction.North);

  rover.execute(["B", "B"]);

  expect(rover.location().equals(new Vector(0, -2))).toBeTruthy();
});

test("should let me rotate the rover right once", () => {
  let rover = new Rover(new Vector(0, 0), Direction.North);

  rover.execute(["R"]);

  expect(rover.direction()).toBe(Direction.East);
});

test("should let me rotate the rover right multiple times", () => {
  let rover = new Rover(new Vector(0, 0), Direction.North);

  rover.execute(["R", "R"]);

  expect(rover.direction()).toBe(Direction.South);
});

test("should let me rotate the rover left once", () => {
  let rover = new Rover(new Vector(0, 0), Direction.North);

  rover.execute(["L"]);

  expect(rover.direction()).toBe(Direction.West);
});

test("should let me rotate the rover left multiple times", () => {
  let rover = new Rover(new Vector(0, 0), Direction.North);

  rover.execute(["L", "L"]);

  expect(rover.direction()).toBe(Direction.South);
});

test("should let me rotate the rover left and right", () => {
  let rover = new Rover(new Vector(0, 0), Direction.North);

  rover.execute(["L", "R"]);

  expect(rover.direction()).toBe(Direction.North);
});

test("should move forward in the correct direction after being rotated left", () => {
  let rover = new Rover(new Vector(0, 0), Direction.North);

  rover.execute(["L", "F"]);

  let newLocation = rover.location();

  expect(rover.location().equals(new Vector(-1, 0))).toBeTruthy();
});

test("should move backward in the correct direction after being rotated left", () => {
  let rover = new Rover(new Vector(0, 0), Direction.North);

  rover.execute(["L", "B"]);

  let newLocation = rover.location();

  expect(rover.location().equals(new Vector(1, 0))).toBeTruthy();
});

test("should move forward when facing east", () => {
  let rover = new Rover(new Vector(0, 0), Direction.East);

  rover.execute(["F"]);

  expect(rover.location().equals(new Vector(1, 0))).toBeTruthy();
});

test("should move backward when facing east", () => {
  let rover = new Rover(new Vector(0, 0), Direction.East);

  rover.execute(["B"]);

  let newLocation = rover.location();

  expect(rover.location().equals(new Vector(-1, 0))).toBeTruthy();
});

test("should move forward when facing south", () => {
  let rover = new Rover(new Vector(0, 0), Direction.South);

  rover.execute(["F"]);

  expect(rover.location().equals(new Vector(0, -1))).toBeTruthy();
});

test("should move backward when facing south", () => {
  let rover = new Rover(new Vector(0, 0), Direction.South);

  rover.execute(["B"]);

  expect(rover.location().equals(new Vector(0, 1))).toBeTruthy();
});

test("should move forward when facing west", () => {
  let rover = new Rover(new Vector(0, 0), Direction.West);

  rover.execute(["F"]);

  expect(rover.location().equals(new Vector(-1, 0))).toBeTruthy();
});

test("should move backward when facing west", () => {
  let rover = new Rover(new Vector(0, 0), Direction.West);

  rover.execute(["B"]);

  let newLocation = rover.location();

  expect(rover.location().equals(new Vector(1, 0))).toBeTruthy();
});
