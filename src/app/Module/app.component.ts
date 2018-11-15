import {Component} from '@angular/core';
import {Coordinate} from '../Model/Coordinate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  commandList: string;
  xyLocation: Coordinate;
  status: string;
  grid: any[];
  direction: string;
  directions: any[];
  outputPosition: any[];
  /*  initalise obstacle points in the grid*/
  obstacleList: Coordinate [] = [
    {x: 2, y: 2},
    {x: 4, y: 0},
    {x: 3, y: 3},
    {x: 4, y: 4},
  ];

  constructor() {
    this.outputPosition=[];
    this.grid = [100, 100];
    this.xyLocation = {
      x: 0, y: 0
    };
    this.status = '';
    this.directions = ['N', 'E', 'S', 'W'];
  }

  processInput(commands: any, roverX: any, roverY: any, roverDirection: string) {
    this.status='';
    /*undefined check for Command List*/
    if (commands === undefined) {
      console.log('Improper input');
      return this.commandList;
    }
    /*Undefined check for rover initial position*/
    if (roverX === undefined || roverY === undefined) {
      this.xyLocation = {
        x: 0, y: 0
      };
    }
    /*    undefined or null check for rover facing direction*/
    if (roverDirection === null || roverDirection === undefined || roverDirection === '') {
      this.direction = 'N';
    }
    else {
      /*      Improper input Rover direction other than N,W,S,E*/
      if (!(roverDirection.toUpperCase() === 'W' || roverDirection === 'S' || roverDirection === 'E' || roverDirection === 'N')) {
        this.direction = 'N';
      }
      else {
        /*Handling case sentive inputs*/
        this.direction = roverDirection.toUpperCase();
      }
      this.xyLocation = {
        x: roverX, y: roverY
      };
    }
    this.commandList = commands;
    for (var index = 0; index < this.commandList.length; index++) {
      /*Handling case sentive commands input*/
      var command = this.commandList[index].toLowerCase();
      if (command === 'f' || command === 'b') {
        if (!this.goForwardorBackward(command)) break;
      } else if (command === 'l' || command === 'r') {
        this.goLeftorRight(command);
      }
      else {
        /*Improper command input other than f,b,l,r*/
        return 'Improper Input';
      }
      console.log("Rover Moved to"+ this.xyLocation.x +','+this.xyLocation.y);
      this.outputPosition[0]=this.xyLocation.x;
      this.outputPosition[1]=this.xyLocation.y;
      if(this.status==='')this.status='OK';
      this.resetLocation();
    }
  }



  /*Handling rover movement with given direction and f/b commands*/
  goForwardorBackward(command) {
    var xPosInc = 0, yPosInc = 0;
    if (this.direction === 'N') {
      yPosInc = 1;
    } else if (this.direction === 'E') { // East
      xPosInc = 1;
    } else if (this.direction === 'S') { // South
      yPosInc = -1;
    } else if (this.direction === 'W') { // West
      xPosInc = -1;
    }
    if (command === 'b') { // Backward
      xPosInc *= -1;
      yPosInc *= -1;
    }
    var newLocation = [+this.xyLocation.x + +xPosInc, +this.xyLocation.y + +yPosInc];
    /* Check to handle if the next grid position is valid and is falling with in boundaries*/
    newLocation = this.isValidLocation(newLocation);
    /*If it is a valid location check for obstacles*/
    if (this.obstacleHandler(newLocation)) {
      return true;
    }
    this.xyLocation = {
      x: newLocation[0], y: newLocation[1]
    };
    return true;
  }
  goLeftorRight(command) {
    var directionNumber = this.directionAsIndex(this.direction);
    if (command === 'l') { // Left
      directionNumber = (directionNumber + 4 - 1) % 4;
    } else { // Right
      directionNumber = (directionNumber + 1) % 4;
    }
    this.direction = this.directions[directionNumber];
  }
  /* Handling the next move with respect to command by checking is the postion is valid and is falling with in boundaries, if not wrap the edges*/
  isValidLocation(newLocation) {
    console.log('valid location' + newLocation[0]);
    if (newLocation[0] >= 100 || newLocation[0] < 0) {
      if (newLocation[0] >= 100) {
        newLocation[0] = 0;
      }
      else if (newLocation[0] < 0) {
        newLocation[0] = 99;
      }
    }
    if (newLocation[1] >= 100 || newLocation[1] < 0) {
      if (newLocation[1] >= 100) {
        newLocation[1] = 0;
      }
      else if (newLocation[1] < 0) {
        newLocation[1] = 99;
      }
    }
    return newLocation;
  }

  resetLocation() {
    this.xyLocation = {
      x: (this.xyLocation.x + this.grid[0]) % this.grid[0], y: (this.xyLocation.y + this.grid[1]) % this.grid[1]
    };
  }


  /* Handling obstacles by iterarating through the list of obstacles and report the obstacle presence by setting status*/
  obstacleHandler(newLocation) {
    for (var index = 0; index < this.obstacleList.length; index++) {
      if ((newLocation[0] == this.obstacleList[index].x) && (newLocation[1] == this.obstacleList[index].y)) {
        this.status = 'obstacle';
        return true;
      }
    }
    return false;
  }
  /*retreiving the index of direction*/
  directionAsIndex(direction) {
    for (var index = 0; index < 4; index++) {
      if (this.directions[index] === direction) return index;
    }
  }
}
