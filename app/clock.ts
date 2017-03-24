class Clock {
  position: p5.Vector;
  radius: number;
  color: number|string;

  time: Time;

  constructor(x: number = width / 2, y: number = height / 2, r: number = 200, color: number = 170) {
    this.position = createVector(x, y);
    this.radius = r;
    this.color = color;

    this.time = new Time();
  }

  update() {
    this.time.tick();
  }

  display() {
    this.update();

    translate(this.position.x, this.position.y);
    colorMode(HSB);
    this.printDigital();

    this.color = map(this.time.seconds, 0, 60, 0, 200);

    var hoursRad = this.time.getRadians('hours');
    this.drawArc(hoursRad, 45);

    var minutesRad = this.time.getRadians('minutes');
    this.drawArc(minutesRad, 30);

    var secondsRad = this.time.getRadians('seconds');
    this.drawArc(secondsRad, 15);

    var milisecondsRad = this.time.getRadians('miliseconds');
    // this.drawArc(milisecondsRad);
  }

  printDigital() {
    push();
    fill(color(this.color, 255, 255, .5));
    textSize(this.radius / 4);
    textAlign(CENTER, CENTER);
    text(this.time.format(), 0, 0);
    pop();
  }

  drawArc(radians: number, offset: number = 0) {
    push();
    strokeWeight(10);
    stroke(this.color, 255, 255, .5);
    noFill();
    rotate(-HALF_PI);
    beginShape();
    for(let angle = 0; angle <= radians; angle += 0.001) {
      var x =  (this.radius + offset) * cos(angle);
      var y =  (this.radius + offset) * sin(angle);
      vertex(x, y);
    }
    endShape();
    pop();
  }
}

class Time {
  hours: number;
  minutes: number;
  seconds: number;
  miliseconds: number;
  modifier: string;

  tick(): void {
    var time = new Date();
    this.hours = time.getHours() % 12 || 12;
    this.modifier = time.getHours() >= 12 ? 'PM' : 'AM';
    this.minutes = time.getMinutes();
    this.seconds = time.getSeconds();
    this.miliseconds = time.getMilliseconds();
  }

  format(): string {
    var a = [this.hours, nf(this.minutes, 2), nf(this.seconds, 2)];
    return  a.join(':') + ' ' + this.modifier;
  }

  getRadians(type: string): number {
    var rad: number;
    switch(type) {
      case 'hours':
        rad = (this.hours + this.minutes / 60) * TWO_PI / 12;
        break;
      case 'minutes':
        rad = (this.minutes + this.seconds / 60) * TWO_PI / 60;
        break;
      case 'seconds':
        rad = (this.seconds + this.miliseconds / 1000) * TWO_PI / 60;
        break;
      case 'miliseconds':
        rad = this.miliseconds * TWO_PI / 1000;
        break;
    }

    return rad;

  }
}
