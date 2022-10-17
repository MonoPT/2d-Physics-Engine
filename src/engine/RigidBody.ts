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

    private vertices: Vector[]
    private transformedVertices: Vector[]
    readonly triangles: number[]

    private transformUpdateRequired: boolean

    fill:string = "rgba(232, 79, 79, .1)"


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


        if(this.ShapeType === ShapeType.Box) {
            this.vertices = RigidBody.createBoxVertices(this.Width, this.Height);
            this.transformedVertices = []
            this.triangles = RigidBody.createBoxTriangles()
        } else {
            this.vertices = []
            this.transformedVertices = []
            this.triangles = []
        }

        this.transformUpdateRequired = true
    }

    private static createBoxTriangles() : number[] {
        let triangles: number[] = []
        triangles[0] = 0
        triangles[1] = 1
        triangles[2] = 2
        triangles[3] = 0
        triangles[4] = 2
        triangles[5] = 3

        return triangles
    }

    private static createBoxVertices(width: number, height:number) : Vector[] {
        let left = -width / 2
        let rigth = left + width
        let bottom = -height / 2
        let top = bottom + height

        let verticesList: Vector[] = []
        verticesList[0] = new Vector(left, top)
        verticesList[1] = new Vector(rigth, top)
        verticesList[2] = new Vector(rigth, bottom)
        verticesList[3] = new Vector(left, bottom)

        return verticesList
    }

    get pos() {
        return this.position
    }

    get angle() {
        return this.rotation
    }

    get Vertices() {
        return RigidBody.createBoxVertices(this.Width, this.Height);
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

    getTransformedVertices(): Vector[] {
        let transformedVertices: Vector[] = []


        this.vertices = RigidBody.createBoxVertices(this.Width, this.Height);
        let positionTest = this.position
        let angle = this.rotation

        for (let i = 0; i < this.vertices.length; i++) {
            let v:Vector = this.vertices[i]
            //transformedVertices[i] = Vector.Transform(v, transform)
            

            /*transformedVertices[i] = new Vector(
                Math.cos(angle) * v.x - Math.sin(angle) * v.y + positionTest.y,
                Math.sin(angle) * v.x + Math.cos(angle) * v.y + positionTest.y
            )*/

            transformedVertices[i] = new Vector(
                Math.cos(angle) * v.x - v.y * Math.sin(angle) + positionTest.x,
                v.y * Math.cos(angle) + v.x * Math.sin(angle) + positionTest.y
            )
        }
        this.transformedVertices = transformedVertices
        

        this.transformUpdateRequired = false
        return transformedVertices
    }

    move(direction: Vector): void {
        this.position.add(direction)
        this.transformUpdateRequired = true
    }

    moveTo(position: Vector) {
        this.position = position
        this.transformUpdateRequired = true
    }

    rotate(amount: number) {
        this.rotation += amount
        this.transformUpdateRequired = true
    }

    setRotation(amount: number) {
        this.rotation = amount
        this.transformUpdateRequired = true
    }
}
