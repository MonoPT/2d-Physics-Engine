export class Vector {
    x: number
    y: number

    constructor(x:number, y:number) {
        this.x = x
        this.y = y
    }

    static add(a: Vector, b: Vector) {
        return new Vector(a.x + b.x, a.y + b.y)
    }

    add (v: Vector) {
        this.x += v.x
        this.y += v.y
        return this;
    }

    static subtract(a: Vector, b: Vector) {
        return new Vector(a.x - b.x, a.y - b.y)
    }

    subtract (v: Vector) {
        this.x -= v.x
        this.y -= v.y
        return this;
    }

    static multiply(v: Vector, n: number) {
        return new Vector(v.x * n, v.y * n)
    }

    multiply (n: number) {
        this.x *= n
        this.y *= n
        return this;
    }

    static divide(v: Vector, n: number) {
        return new Vector(v.x / n, v.y / n)
    }

    divide (n: number) {
        this.x /= n
        this.y /= n
        return this;
    }

    static invert(v: Vector) {
        return new Vector(-v.x, -v.y)
    }

    invert() {
        this.x = -this.x
        this.y = -this.y
        return this;
    }

    static get Zero() {
        return new Vector(0,0)
    }

    static isEqual(v1:Vector, v2:Vector) {
        return v1.x === v2.x && v1.y === v2.y 
    }

    static toString(v:Vector) {
        return `x: ${v.x} y: ${v.y}`
    }

    get length () {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    static distance (v1: Vector, v2: Vector) {
        let dx = v1.x - v2.x
        let dy = v1.y - v2.y
        return Math.sqrt(dx * dx + dy * dy)
    }

    static normalize(v: Vector) {
        let length = Math.sqrt(v.x * v.x + v.y * v.y)

        let vx = length > 0 ? v.x / length : 0
        let vy = length > 0 ? v.y / length : 0

        return new Vector(vx, vy)
    }

    get normal() {
        let v = this

        let length = Math.sqrt(v.x * v.x + v.y * v.y)

        let vx = length > 0 ? v.x / length : 0
        let vy = length > 0 ? v.y / length : 0
        return new Vector(vx, vy)
    }

    static dot(v1: Vector, v2: Vector) {
        return v1.x * v2.x + v1.y * v2.y
    }

    static cross(v1: Vector, v2: Vector) {
        return v1.x * v2.y + v1.y * v2.x
    }

    clone() {
        return new Vector(this.x, this.y)
    }
}

