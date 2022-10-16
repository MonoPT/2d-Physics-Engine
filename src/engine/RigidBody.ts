import { Vector } from "./Vector";
import { MathLib } from "./mathLib";
import { World } from "./Core"

export enum ShapeType {
    Circle = 0,
    Box = 1
}

export class RigidBody {
    private position : Vector
    private linearVelocity: Vector
    private rotation: number
    private rotationalVelociy: number

    readonly Density: number
    readonly Mass: number
    readonly Restitution: number
    readonly Area: number
    readonly IsStatic: boolean

    readonly Radius: number
    readonly Width: number
    readonly Height: number

    readonly ShapeType: ShapeType


    constructor(position: Vector, density: number, mass: number, restitution: number, area: number,
        isStatic: boolean, radius: number, width: number, height: number, shapetype: ShapeType
    ) {
        this.position = position
        this.linearVelocity = Vector.Zero
        this.rotation = 0
        this.rotationalVelociy = 0
        
        this.Density = density
        this.Mass = mass
        this.Restitution = restitution
        this.Area = area

        this.IsStatic = isStatic
        this.Radius = radius
        this.Width = width
        this.Height = height

        this.ShapeType = shapetype
    }

    get pos() {
        return this.position
    }

    static createCircleBody(radius: number, position: Vector, density: number, isStatic: boolean, restitution: number) : false | RigidBody {

        let area:number = radius * radius * Math.PI

        if(area < World.MinBodySize) {
            console.error(`Area is too small. Min area is ${World.MinBodySize}`)
            return false
        }

        if(area > World.MaxBodySize) {
            console.error(`Area is too big. Max area is ${World.MaxBodySize}`)
            return false
        }

        if(density < World.MinDensity) {
            console.error(`Density is too small. Min density is ${World.MinDensity}`)
            return false
        }

        if(density > World.MaxDensity) {
            console.error(`Density is too big. Max density is ${World.MaxDensity}`)
            return false
        }


        restitution = MathLib.clamp(restitution, 0, 1)

        let mass = area  * density

        return new RigidBody(position, density, mass, restitution, area, isStatic, radius, 0, 0, ShapeType.Circle)
    }

    static createBoxBody(width: number, height: number,position: Vector, density: number, isStatic: boolean, restitution: number) : false | RigidBody {

        let area:number = width * height

        if(area < World.MinBodySize) {
            console.error(`Area is too small. Min area is ${World.MinBodySize}`)
            return false
        }

        if(area > World.MaxBodySize) {
            console.error(`Area is too big. Max area is ${World.MaxBodySize}`)
            return false
        }

        if(density < World.MinDensity) {
            console.error(`Density is too small. Min density is ${World.MinDensity}`)
            return false
        }

        if(density > World.MaxDensity) {
            console.error(`Density is too big. Max density is ${World.MaxDensity}`)
            return false
        }


        restitution = MathLib.clamp(restitution, 0, 1)

        let mass = area  * density

        return new RigidBody(position, density, mass, restitution, area, isStatic, 0 , width, height, ShapeType.Box)
    }

    move(direction: Vector): void {
        this.position.add(direction)
    }
}
