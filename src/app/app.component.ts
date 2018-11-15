import {Component} from '@angular/core';
import {Coordinate} from './Model/Coordinate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  commandList: string;
  xyLocation: Coordinate;
  grid: any[];
  direction: string;
  directions: any[];
  obstacleList: Coordinate [] = [
    {x: 2, y: 2},
    {x: 4, y: 0},
    {x: 3, y: 3},
    {x: 4, y: 4},
  ];
  status: string;

  constructor() {
    this.grid = [100, 100];
    this.xyLocation = {
      x: 0, y: 0
    };

    this.status = 'Ok';
    this.directions = ['N', 'E', 'S', 'W'];
  }

  processInput(commands: any, roverX: any, roverY: any, roverDirection: string) {
    console.log(commands);
    console.log(roverY);
    console.log(roverY);
    console.log(roverDirection);
    if (event === undefined) {
      console.log('Improper input');
      return this.commandList;
    }
    if (roverX === undefined || roverY === undefined) {
      this.xyLocation = {
        x: 0, y: 0
      };
    }
    if (roverDirection === null || roverDirection === undefined || roverDirection === '') {
      this.direction = 'N';

    }
    else {


      this.direction = roverDirection;
      this.xyLocation = {
        x: roverX, y: roverY
      };
    }
    this.commandList = commands;
    console.log('direction' + this.direction);
    console.log(this.commandList);
    for (var index = 0; index < this.commandList.length; index++) {
      var command = this.commandList[index];
      console.log(command);
      if (command === 'f' || command === 'b') {
        if (!this.goForwardorBackward(command)) break;
      } else if (command === 'l' || command === 'r') {
        this.goLeftorRight(command);
      }

      console.log('Moved location ' + this.xyLocation.x + ' ' + this.xyLocation.y);
      this.resetLocation();
      //this.commandsArray = commands;

    }

  }

  obstacleHandler(newLocation) {
    for (var index = 0; index < this.obstacleList.length; index++) {
      console.log('New location tostring' + newLocation.toString());
      console.log('Obstacle tostring' + this.obstacleList[index].toString());
      if ((newLocation[0] == this.obstacleList[index].x) && (newLocation[1] == this.obstacleList[index].y)) {
        this.status = 'obstacle';
        console.log(this.status);
        return true;
      }
    }
    return false;
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
    var newLocation = [+this.xyLocation.x + +xIncrease, +this.xyLocation.y + +yIncrease];
    // if (isObstacle(newLocation)) {
    //   return false;
    // }
    console.log('old' + newLocation);
    newLocation = this.isValidLocation(newLocation);
    if (this.obstacleHandler(newLocation)) {
      console.log('obstacle location' + this.xyLocation);
      return true;
    }
    this.xyLocation = {
      x: newLocation[0], y: newLocation[1]
    };

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
    this.xyLocation = {
      x: (this.xyLocation.x + this.grid[0]) % this.grid[0], y: (this.xyLocation.y + this.grid[0]) % this.grid[0]
    };


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
