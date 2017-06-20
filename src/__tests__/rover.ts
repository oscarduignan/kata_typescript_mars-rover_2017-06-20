class RoverLocation {
  constructor(public x: number, public y: number) {}
}

enum RoverDirection {
  North,
  East,
  South,
  West
}

const RoverDirections = Object.keys(RoverDirection)
  .map(k => RoverDirection[k])
  .filter(v => typeof v !== "string");

type RoverCommand = "F" | "B" | "R" | "L";

class Rover {
  constructor(
    private location: RoverLocation,
    private direction: RoverDirection
  ) {}

  getLocation() {
    return this.location;
  }

  getDirection() {
    return this.direction;
  }

  execute(commands: Array<RoverCommand>) {
    commands.forEach(command => {
      let previousLocation = this.location;

      switch (command) {
        case "F":
          switch (this.direction) {
            case RoverDirection.North:
              this.location = new RoverLocation(
                previousLocation.x,
                previousLocation.y + 1
              );
              break;
            case RoverDirection.East:
              this.location = new RoverLocation(
                previousLocation.x + 1,
                previousLocation.y
              );
              break;
            case RoverDirection.South:
              this.location = new RoverLocation(
                previousLocation.x,
                previousLocation.y - 1
              );
              break;
            case RoverDirection.West:
              this.location = new RoverLocation(
                previousLocation.x - 1,
                previousLocation.y
              );
              break;
          }
          break;
        case "B":
          switch (this.direction) {
            case RoverDirection.North:
              this.location = new RoverLocation(
                previousLocation.x,
                previousLocation.y - 1
              );
              break;
            case RoverDirection.East:
              this.location = new RoverLocation(
                previousLocation.x - 1,
                previousLocation.y
              );
              break;
            case RoverDirection.South:
              this.location = new RoverLocation(
                previousLocation.x,
                previousLocation.y + 1
              );
              break;
            case RoverDirection.West:
              this.location = new RoverLocation(
                previousLocation.x + 1,
                previousLocation.y
              );
              break;
          }
          break;
        case "R":
          var nextDirection = RoverDirections.indexOf(this.direction) + 1;
          this.direction =
            RoverDirection[
              RoverDirection[
                nextDirection >= RoverDirections.length ? 0 : nextDirection
              ]
            ];
          break;
        case "L":
          var nextDirection = RoverDirections.indexOf(this.direction) - 1;
          this.direction =
            RoverDirection[
              RoverDirection[
                nextDirection < 0 ? RoverDirections.length - 1 : nextDirection
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

test("2 + 2 = 4", () => {
  expect(2 + 2).toBe(4);
});

test("should let me set an initial starting point and direction", () => {
  let location = new RoverLocation(0, 0);
  let direction: RoverDirection = RoverDirection.North;
  let rover = new Rover(location, direction);

  expect(rover.getLocation()).toBe(location);
  expect(rover.getDirection()).toBe(direction);
});

test("should let me move the rover forward once when facing north", () => {
  let rover = new Rover(new RoverLocation(0, 0), RoverDirection.North);

  rover.execute(["F"]);

  let newLocation = rover.getLocation();

  expect(newLocation.x).toBe(0);
  expect(newLocation.y).toBe(1);
});

test("should let me move the rover forward multiple times when facing north", () => {
  let rover = new Rover(new RoverLocation(0, 0), RoverDirection.North);

  rover.execute(["F", "F"]);

  let newLocation = rover.getLocation();

  expect(newLocation.x).toBe(0);
  expect(newLocation.y).toBe(2);
});

test("should let me move the rover backward once when facing north", () => {
  let rover = new Rover(new RoverLocation(0, 0), RoverDirection.North);

  rover.execute(["B"]);

  let newLocation = rover.getLocation();

  expect(newLocation.x).toBe(0);
  expect(newLocation.y).toBe(-1);
});

test("should let me move the rover backward multiple times when facing north", () => {
  let rover = new Rover(new RoverLocation(0, 0), RoverDirection.North);

  rover.execute(["B", "B"]);

  let newLocation = rover.getLocation();

  expect(newLocation.x).toBe(0);
  expect(newLocation.y).toBe(-2);
});

test("should let me rotate the rover right once", () => {
  let rover = new Rover(new RoverLocation(0, 0), RoverDirection.North);

  rover.execute(["R"]);

  expect(rover.getDirection()).toBe(RoverDirection.East);
});

test("should let me rotate the rover right multiple times", () => {
  let rover = new Rover(new RoverLocation(0, 0), RoverDirection.North);

  rover.execute(["R", "R"]);

  expect(rover.getDirection()).toBe(RoverDirection.South);
});

test("should let me rotate the rover left once", () => {
  let rover = new Rover(new RoverLocation(0, 0), RoverDirection.North);

  rover.execute(["L"]);

  expect(rover.getDirection()).toBe(RoverDirection.West);
});

test("should let me rotate the rover left multiple times", () => {
  let rover = new Rover(new RoverLocation(0, 0), RoverDirection.North);

  rover.execute(["L", "L"]);

  expect(rover.getDirection()).toBe(RoverDirection.South);
});

test("should let me rotate the rover left and right", () => {
  let rover = new Rover(new RoverLocation(0, 0), RoverDirection.North);

  rover.execute(["L", "R"]);

  expect(rover.getDirection()).toBe(RoverDirection.North);
});

test("should move forward in the correct direction after being rotated left", () => {
  let rover = new Rover(new RoverLocation(0, 0), RoverDirection.North);

  rover.execute(["L", "F"]);

  let newLocation = rover.getLocation();

  expect(rover.getDirection()).toBe(RoverDirection.West);
  expect(newLocation.x).toBe(-1);
  expect(newLocation.y).toBe(0);
});

test("should move backward in the correct direction after being rotated left", () => {
  let rover = new Rover(new RoverLocation(0, 0), RoverDirection.North);

  rover.execute(["L", "B"]);

  let newLocation = rover.getLocation();

  expect(rover.getDirection()).toBe(RoverDirection.West);
  expect(newLocation.x).toBe(1);
  expect(newLocation.y).toBe(0);
});

test("should move forward when facing east", () => {
  let rover = new Rover(new RoverLocation(0, 0), RoverDirection.East);

  rover.execute(["F"]);

  let newLocation = rover.getLocation();

  expect(rover.getDirection()).toBe(RoverDirection.East);
  expect(newLocation.x).toBe(1);
  expect(newLocation.y).toBe(0);
});

test("should move backward when facing east", () => {
  let rover = new Rover(new RoverLocation(0, 0), RoverDirection.East);

  rover.execute(["B"]);

  let newLocation = rover.getLocation();

  expect(rover.getDirection()).toBe(RoverDirection.East);
  expect(newLocation.x).toBe(-1);
  expect(newLocation.y).toBe(0);
});

test("should move forward when facing south", () => {
  let rover = new Rover(new RoverLocation(0, 0), RoverDirection.South);

  rover.execute(["F"]);

  let newLocation = rover.getLocation();

  expect(rover.getDirection()).toBe(RoverDirection.South);
  expect(newLocation.x).toBe(0);
  expect(newLocation.y).toBe(-1);
});

test("should move backward when facing south", () => {
  let rover = new Rover(new RoverLocation(0, 0), RoverDirection.South);

  rover.execute(["B"]);

  let newLocation = rover.getLocation();

  expect(rover.getDirection()).toBe(RoverDirection.South);
  expect(newLocation.x).toBe(0);
  expect(newLocation.y).toBe(1);
});

test("should move forward when facing west", () => {
  let rover = new Rover(new RoverLocation(0, 0), RoverDirection.West);

  rover.execute(["F"]);

  let newLocation = rover.getLocation();

  expect(rover.getDirection()).toBe(RoverDirection.West);
  expect(newLocation.x).toBe(-1);
  expect(newLocation.y).toBe(0);
});

test("should move backward when facing west", () => {
  let rover = new Rover(new RoverLocation(0, 0), RoverDirection.West);

  rover.execute(["B"]);

  let newLocation = rover.getLocation();

  expect(rover.getDirection()).toBe(RoverDirection.West);
  expect(newLocation.x).toBe(1);
  expect(newLocation.y).toBe(0);
});
