import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {Coordinate} from '../Model/Coordinate';

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
describe('given the initial starting point for rover (x,y) and the direction it is facing (N,S,E,W) it is facing', function () {
  it('check to perform not null value on improper or undefined input rover initial facing direction', function () {
    var obj = new AppComponent();
    obj.processInput('ff', 0, 0, '');
    expect(obj.direction).not.toBeNull();
    expect(obj.direction).not.toBeUndefined();
  });
  it('should use default starting direction value N when given input direction other than ((N,S,E,W))', function () {
    var obj = new AppComponent();
    obj.processInput('ff', 0, 0, 'D');
    expect(obj.direction).toEqual('N');
  });
  it('should use default starting direction value N when not assigned', function () {
    var obj = new AppComponent();
    obj.processInput('ff', 0, 0, '');
    expect(obj.direction).toEqual('N');
  });
});

describe('accept and get ready to process the list of commands received by rover: Input check', function () {
  it('should set commands array', function () {
    var obj = new AppComponent();
    obj.processInput('dothisdothat', 0, 0, 'N');
    expect(obj.commandList).toEqual('dothisdothat');
  });
});

describe('Implement commands that move the rover forward/backward (f,b)', function () {

  it('moving forwards towards north make the rover  yPosition increase', function () {
    var obj = new AppComponent();
    obj.processInput('ff', 12, 21, 'N');
    expect(obj.xyLocation.x).toEqual(12);
    expect(obj.xyLocation.y).toEqual(23);
  });
  it('moving forward towards south make the yPosition increase', function () {
    var obj = new AppComponent();
    obj.processInput('f', 12, 21, 'S');
    expect(obj.xyLocation.x).toEqual(12);
    expect(obj.xyLocation.y).toEqual(20);
  });
  it('moving forward towards west make the xPosition reduce', function () {
    var obj = new AppComponent();
    obj.processInput('f', 12, 21, 'W');
    expect(obj.xyLocation.x).toEqual(11);
    expect(obj.xyLocation.y).toEqual(21);
  });

});
describe('Implement commands that move the rover forward/backward (f,b) continued..', function () {
  it('moving forward towards east make the xPosition increase', function () {
    var obj = new AppComponent();
    obj.processInput('f', 11, 21, 'E');
    expect(obj.xyLocation.x).toEqual(12);
    expect(obj.xyLocation.y).toEqual(21);
  });
  it('moving backward towards north make the yPosition decrease', function () {
    var obj = new AppComponent();
    obj.processInput('b', 12, 21, 'N');
    expect(obj.xyLocation.x).toEqual(12);
    expect(obj.xyLocation.y).toEqual(20);
  });
  it('moving backward towards south make the yPosition increase', function () {
    var obj = new AppComponent();
    obj.processInput('b', 12, 21, 'S');
    expect(obj.xyLocation.x).toEqual(12);
    expect(obj.xyLocation.y).toEqual(22);
  });
  it('moving backward towards west make the xPosition increases', function () {
    var obj = new AppComponent();
    obj.processInput('b', 12, 21, 'W');
    expect(obj.xyLocation.x).toEqual(13);
    expect(obj.xyLocation.y).toEqual(21);
  });
  it('moving backward towards east make the xPosition decrease', function () {
    var obj = new AppComponent();
    obj.processInput('b', 12, 21, 'E');
    expect(obj.xyLocation.x).toEqual(11);
    expect(obj.xyLocation.y).toEqual(21);
  });
});

describe('Implement commands that turn the rover left/right (l,r)', function () {
  it('should change direction from E to N when command is to turn left', function () {
    var obj = new AppComponent();
    obj.processInput('l', 12, 21, 'E');
    expect(obj.direction).toEqual('N');
  });
  it('should change direction from N to W when command is to turn left', function () {
    var obj = new AppComponent();
    obj.processInput('l', 12, 21, 'N');
    expect(obj.direction).toEqual('W');
  });
  it('should change direction from E to S when command is to turn right', function () {
    var obj = new AppComponent();
    obj.processInput('r', 12, 21, 'E');
    expect(obj.direction).toEqual('S');
  });
});


describe('Implement obstacle detection before each move to a new square.'
  + ' If a given sequence of commands encounters an obstacle,'
  + ' the rover moves up to the last possible point and reports the obstacle', function () {
  it('able to assign obstacles', function () {
    var obj = new AppComponent();
    obj.processInput('r', 12, 21, 'N');
    var coordList: Coordinate [] = [
      {x: 2, y: 2},
      {x: 4, y: 0},
      {x: 3, y: 3},
      {x: 4, y: 4},
    ];
    expect(obj.obstacleList).toEqual(coordList);
  });
  it('should use empty array when obstacles are not assigned', function () {
    var obj = new AppComponent();
    obj.processInput('ffrff', 0, 0, 'N');
    expect(obj.obstacleList.length).toEqual(4);
  });
  it('should not move to the obstacle', function () {
    var obj = new AppComponent();
    obj.processInput('ffrff', 0, 0, 'N');

    expect(obj.xyLocation.x).toEqual(1);
    expect(obj.xyLocation.y).toEqual(2);
  });
});
describe('Implement obstacle detection before each move to a new square.'
  + ' If a given sequence of commands encounters an obstacle,'
  + ' the rover moves up to the last possible point and reports the obstacle', function () {
  it('should set status to obstacle when one is detected', function () {
    var obj = new AppComponent();
    obj.processInput('ffrff', 0, 0, 'N');
    expect(obj.status).toEqual('obstacle');
  });
  it('should leave status to OK when obstacle is NOT detected', function () {
    var obj = new AppComponent();
    obj.processInput('fflff', 0, 0, 'N');
    expect(obj.status).toEqual('OK');
  });
});



describe('Implement wrapping from one edge of the grid to another (planets are spheres after all)', function() {

  it('should return X to 0 when grid is passed', function () {
    var obj = new AppComponent();
    obj.processInput('f', 99, 99, 'E');
    expect(obj.xyLocation.x).toEqual(0);
    expect(obj.xyLocation.y).toEqual(99);
  });

  it('should return Y to 0 when grid is passed', function () {
    var obj = new AppComponent();
    obj.processInput('f', 99, 99, 'N');
    expect(obj.xyLocation.x).toEqual(99);
    expect(obj.xyLocation.y).toEqual(0);
  });
});
describe('Implement wrapping from one edge of the grid to another (planets are spheres after all)', function() {
 it('should return X to grid end when grid is passed from west', function() {
   var obj = new AppComponent();
   obj.processInput('f', 0, 99, 'W');
   expect(obj.xyLocation.x).toEqual(99);
   expect(obj.xyLocation.y).toEqual(99);
  });
  it('should return Y to grid end when grid is passed from south', function() {
    var obj = new AppComponent();
    obj.processInput('f', 99, 0, 'S');
    expect(obj.xyLocation.x).toEqual(99);
    expect(obj.xyLocation.y).toEqual(99);
  });
  it('should use default value 100x100 when grid is not assigned', function() {
    var obj = new AppComponent();
    obj.processInput('fflff', 0, 0, 'N');
    expect(obj.grid).toEqual([100, 100]);
  });
});

