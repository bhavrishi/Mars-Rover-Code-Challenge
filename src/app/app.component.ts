import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  commandList: string;
  xyLocation: any[];
  grid: any[];
  direction: string;
  directions: any[];
  obstacleList: any[];
  status: string;

  constructor() {
    this.direction = 'N';
    this.grid = [100, 100];
    this.xyLocation = [0, 0];
    this.obstacleList = [];
    this.status = 'Ok';
    this.directions = ['N', 'E', 'S', 'W'];

  }

  processInput(event: any) {
    console.log(event);
    if (event === undefined) {
      console.log('Improper input');
      return this.commandList;
    }
    else {
      this.commandList = event;
      console.log(this.commandList);
      for (var index = 0; index < this.commandList.length; index++) {
        var command = this.commandList[index];
        console.log(command);
        if (command === 'f' || command === 'b') {
          if (!this.goForwardorBackward(command)) break;
        } else if (command === 'l' || command === 'r') {
          this.goLeftorRight(command);
        }
      }
      console.log('Moved location' + this.xyLocation);
      this.resetLocation();
      //this.commandsArray = commands;

    }

  }

  goForwardorBackward(command) {
    var xIncrease = 0, yIncrease = 0;
    if (this.direction === 'N') {
      yIncrease = 1;
    } else if (this.direction === 'E') { // East
      xIncrease = 1;
    } else if (this.direction === 'S') { // South
      yIncrease = -1;
    } else if (this.direction === 'W') { // West
      xIncrease = -1;
    }
    if (command === 'b') { // Backward
      xIncrease *= -1;
      yIncrease *= -1;
    }
    var newLocation = [this.xyLocation[0] + xIncrease, this.xyLocation[1] + yIncrease];
    // if (isObstacle(newLocation)) {
    //   return false;
    // }
    console.log('old' + newLocation);
    newLocation = this.isValidLocation(newLocation);
    this.xyLocation = newLocation;
    console.log('New' + this.xyLocation);
    return true;

    //return false;
  }

  isValidLocation(newLocation) {
    console.log('valid location' + newLocation[0]);
    if (newLocation[0] > 100 || newLocation[0] < 0) {
      if (newLocation[0] > 100) {
        newLocation[0] -= 100;
      }
      else if (newLocation[0] < 0) {
        newLocation[0] += 100;
      }
    }
    if (newLocation[1] > 100 || newLocation[1] < 0) {
      if (newLocation[1] > 100) {
        newLocation[1] -= 100;
      }
      else if (newLocation[1] < 0) {
        newLocation[1] += 100;
      }
    }

    return newLocation;
  }

  resetLocation() {
    this.xyLocation = [
      (this.xyLocation[0] + this.grid[0]) % this.grid[0],
      (this.xyLocation[1] + this.grid[1]) % this.grid[1]
    ];
  }

  goLeftorRight(command) {
    var directionNumber = this.directionAsNumber(this.direction);
    console.log('Direction no' + directionNumber);
    if (command === 'l') { // Left
      directionNumber = (directionNumber + 4 - 1) % 4;
    } else { // Right
      directionNumber = (directionNumber + 1) % 4;
    }
    this.direction = this.directions[directionNumber];
  }


  directionAsNumber(direction) {
    for (var index = 0; index < 4; index++) {
      if (this.directions[index] === direction) return index;
    }
  }
}
