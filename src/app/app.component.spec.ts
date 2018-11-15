import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {Coordinate} from './Model/Coordinate';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
describe('You are given the initial starting point (x,y) of a rover and the direction (N,S,E,W) it is facing', function () {
  // it('should set starting location', function () {
  //   var mr = new AppComponent();
  //   expect(mr.xyLocation.x).toEqual(0); expect(mr.xyLocation.y).toEqual(0);
  // });
  // it('should use default starting location value 0x0 when not assigned', function () {
  //   var mr = new AppComponent();
  //   expect(mr.xyLocation.x).toEqual(0); expect(mr.xyLocation.y).toEqual(0);
  // });
  it('should set direction as numeric value', function () {
    var mr = new AppComponent();
    mr.processInput('ff', 0, 0, '');
    expect(mr.direction).not.toBeNull();
    expect(mr.direction).not.toBeUndefined();
  });
  it('should use default starting direction value N when not assigned', function () {
    var mr = new AppComponent();
    mr.processInput('ff', 0, 0, '');
    expect(mr.direction).toEqual('N');
  });
});

describe('The rover receives a character array of commands', function () {
  it('should set commands array', function () {
    var mr = new AppComponent();
    mr.processInput('dothisdothat', 0, 0, 'N');
    expect(mr.commandList).toEqual('dothisdothat');
  });
});

describe('Implement commands that move the rover forward/backward (f,b)', function () {

  it('should reduce Y when moving north', function () {
    var mr = new AppComponent();
    mr.processInput('ff', 12, 21, 'N');
    expect(mr.xyLocation.x).toEqual(12);
    expect(mr.xyLocation.y).toEqual(23);
  });
  it('should increase Y when moving south', function () {
    var mr = new AppComponent();
    mr.processInput('f', 12, 21, 'S');
    expect(mr.xyLocation.x).toEqual(12);
    expect(mr.xyLocation.y).toEqual(20);
  });
  it('should reduce X when moving west', function () {
    var mr = new AppComponent();
    mr.processInput('f', 12, 21, 'W');
    expect(mr.xyLocation.x).toEqual(11);
    expect(mr.xyLocation.y).toEqual(21);
  });

});
describe('Implement commands that move the rover forward/backward (f,b)', function () {
  it('should increase X when moving east', function () {
    var mr = new AppComponent();
    mr.processInput('f', 11, 21, 'E');
    expect(mr.xyLocation.x).toEqual(12);
    expect(mr.xyLocation.y).toEqual(21);
  });
  it('should decrease Y when moving backwards facing north', function () {
    var mr = new AppComponent();
    mr.processInput('b', 12, 21, 'N');
    expect(mr.xyLocation.x).toEqual(12);
    expect(mr.xyLocation.y).toEqual(20);
  });
  it('should increase Y when moving backwards facing south', function () {
    var mr = new AppComponent();
    mr.processInput('b', 12, 21, 'S');
    expect(mr.xyLocation.x).toEqual(12);
    expect(mr.xyLocation.y).toEqual(22);
  });
  it('should increase X when moving backwards facing west', function () {
    var mr = new AppComponent();
    mr.processInput('b', 12, 21, 'W');
    expect(mr.xyLocation.x).toEqual(13);
    expect(mr.xyLocation.y).toEqual(21);
  });
  it('should reduce X when moving backwards facing east', function () {
    var mr = new AppComponent();
    mr.processInput('b', 12, 21, 'E');
    expect(mr.xyLocation.x).toEqual(11);
    expect(mr.xyLocation.y).toEqual(21);
  });
});

describe('Implement commands that turn the rover left/right (l,r)', function () {
  it('should change direction from E to N when command is to turn left', function () {
    var mr = new AppComponent();
    mr.processInput('l', 12, 21, 'E');
    expect(mr.direction).toEqual('N');
  });
  it('should change direction from N to W when command is to turn left', function () {
    var mr = new AppComponent();
    mr.processInput('l', 12, 21, 'N');
    expect(mr.direction).toEqual('W');
  });
  it('should change direction from E to S when command is to turn right', function () {
    var mr = new AppComponent();
    mr.processInput('r', 12, 21, 'E');
    expect(mr.direction).toEqual('S');
  });
});


describe('Implement obstacle detection before each move to a new square.'
  + ' If a given sequence of commands encounters an obstacle,'
  + ' the rover moves up to the last possible point and reports the obstacle', function () {
  it('should assign obstacles', function () {
    var mr = new AppComponent();
    mr.processInput('r', 12, 21, 'N');
    var coordList: Coordinate [] = [
      {x: 2, y: 2},
      {x: 4, y: 0},
      {x: 3, y: 3},
      {x: 4, y: 4},
    ];
    expect(mr.obstacleList).toEqual(coordList);
  });
  it('should use empty array when obstacles are not assigned', function () {
    var mr = new AppComponent();
    mr.processInput('ffrff', 0, 0, 'N');
    expect(mr.obstacleList.length).toEqual(4);
  });
  it('should not move to the obstacle', function () {
    var mr = new AppComponent();
    mr.processInput('ffrff', 0, 0, 'N');

    expect(mr.xyLocation.x).toEqual(1);
    expect(mr.xyLocation.y).toEqual(2);
  });
});
describe('Implement obstacle detection before each move to a new square.'
  + ' If a given sequence of commands encounters an obstacle,'
  + ' the rover moves up to the last possible point and reports the obstacle', function () {
  it('should set status to obstacle when one is detected', function () {
    var mr = new AppComponent();
    mr.processInput('ffrff', 0, 0, 'N');
    expect(mr.status).toEqual('obstacle');
  });
  it('should leave status to OK when obstacle is NOT detected', function () {
    var mr = new AppComponent();
    mr.processInput('fflff', 0, 0, 'N');
    expect(mr.status).toEqual('OK');
  });
});



describe('Implement wrapping from one edge of the grid to another (planets are spheres after all)', function() {

  it('should return X to 0 when grid is passed', function () {
    var mr = new AppComponent();
    mr.processInput('f', 99, 99, 'E');
    expect(mr.xyLocation.x).toEqual(0);
    expect(mr.xyLocation.y).toEqual(99);
  });

  it('should return Y to 0 when grid is passed', function () {
    var mr = new AppComponent();
    mr.processInput('f', 99, 99, 'N');
    expect(mr.xyLocation.x).toEqual(99);
    expect(mr.xyLocation.y).toEqual(0);
  });
});
describe('Implement wrapping from one edge of the grid to another (planets are spheres after all)', function() {
 it('should return X to grid end when grid is passed from west', function() {
   var mr = new AppComponent();
   mr.processInput('f', 0, 99, 'W');
   expect(mr.xyLocation.x).toEqual(99);
   expect(mr.xyLocation.y).toEqual(99);
  });
  it('should return Y to grid end when grid is passed from south', function() {
    var mr = new AppComponent();
    mr.processInput('f', 99, 0, 'S');
    expect(mr.xyLocation.x).toEqual(99);
    expect(mr.xyLocation.y).toEqual(99);
  });
  it('should use default value 100x100 when grid is not assigned', function() {
    var mr = new AppComponent();
    mr.processInput('fflff', 0, 0, 'N');
    expect(mr.grid).toEqual([100, 100]);
  });
});

