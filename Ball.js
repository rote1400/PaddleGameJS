const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.00001;

export default class Ball {
    constructor(ballElem) {
        this.ballElem = ballElem;
        this.reset();
    }

    get x() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"));
    }
    
    set x(value) {
        this.ballElem.style.setProperty("--x", value);
    }

    get y() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
    }
    
    set y(value) {
        this.ballElem.style.setProperty("--y", value);
    }

    rectangle() {
        return this.ballElem.getBoundingClientRect()
    }

    reset() {
        this.x = 50;
        this.y = 50;
        this.direction = { x: 0 };
        while(
            Math.abs(this.direction.x) <= 0.2 ||
            Math.abs(this.direction.x) >= 0.9
        ) {
            const heading = randomNumberBetween(0, 2 * Math.PI);
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
        }
        this.velocity = INITIAL_VELOCITY;
    }

    update(delta, paddleRectangles) {
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
        this.velocity += VELOCITY_INCREASE * delta;
        const rectangle = this.rectangle();

        if (rectangle.bottom >= window.innerHeight || rectangle.top <= 0) {
            this.direction.y *= -1;
        }

        if (paddleRectangles.some(r => isCollision(r, rectangle))) {
            this.direction.x *= -1;
        }
    }
}

function randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function isCollision(rectangle1, rectangle2) {
    return (
     rectangle1.left <= rectangle2.right && 
     rectangle1.right >= rectangle2.left &&
     rectangle1.top <= rectangle2.bottom &&
     rectangle1.bottom >= rectangle2.top
     );
}