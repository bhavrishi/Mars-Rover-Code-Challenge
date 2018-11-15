import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';

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
  //   expect(mr.xyLocation).toEqual([0, 0]);
  // });
  // it('should use default starting location value 0x0 when not assigned', function () {
  //   var mr = new AppComponent();
  //   expect(mr.xyLocation).toEqual([0, 0]);
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
  // it('should increase X when moving east', function() {
  //   var mr = new AppComponent();
  //   mr.processInput('f',11,21,'E');
  //   expect(mr.xyLocation.x).toEqual(12); expect(mr.xyLocation.y).toEqual(21);
  // });
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
