import { Vector } from "../math/Vector";
import { RigidBody, ShapeType } from "../physicsBodies/RigidBody";
import { SAT_Collisions } from "../collisions/SAT_Collisions";
import Engine from "../engine";


export class PhysicsWorld {
    private readonly engine:Engine

    static readonly MinBodySize = 1
    static readonly MaxBodySize = 64 * 64 * 64
    static readonly MinDensity = 0.5
    static readonly MaxDensity = 21.4

    private Gravity: Vector
    private bodyList: RigidBody[]

    constructor(engine: Engine) {
        this.engine = engine
        this.Gravity = new Vector(0, 9.81)
        this.bodyList = []
    }

    addBody(body: RigidBody) {
        this.bodyList.push(body)
    }

    removeBody(body: RigidBody): boolean {
        for(var i = this.bodyList.length; i > 0; i--) {
            let currentBody = this.bodyList[i]
            
            if(currentBody == body) {
                this.bodyList.splice(i, 1);
                return true
            }
        }
        return false
    }

    getBody(index: number): RigidBody | false {
        if(index < 0 || index > this.bodyList.length) return false

        return this.bodyList[index] as RigidBody
    }

    get bodyCount() {
        return this.bodyList.length
    }

    Step(time: number) { ///Update physics body
        for (let i = 0; i < this.bodyList.length; i++) { //Apply forces to bodies
            const body = this.bodyList[i];
            body.step(time)
            body.debug()
        }

        for (let i = 0; i < this.bodyList.length; i++) { ///Check for collisions
            const bodyA = this.bodyList[i];
            
            for (let j = i + 1; j < this.bodyList.length; j++) {
                const bodyB = this.bodyList[j];

                let collision = this.collide(bodyA, bodyB)
                if(collision) {
                    collision.normal = Vector.normalize(collision.normal)

                    bodyA.move(Vector.invert(collision.normal).multiply(collision.depth / 2 ))
                    bodyB.move(collision.normal.multiply(collision.depth / 2))

                    bodyA.fill = "rgba(232, 79, 79, .3)"
                    bodyB.fill = "rgba(232, 79, 79, .3)"
                }
            }
        }


    }

    collide(bodyA: RigidBody, bodyB: RigidBody): false | {normal: Vector, depth: number} {
        let shapeTypeA: ShapeType = bodyA.ShapeType
        let shapeTypeB: ShapeType = bodyB.ShapeType

        if(shapeTypeA === ShapeType.Box) {
            if(shapeTypeB === ShapeType.Box) {
                return SAT_Collisions.IntersectPolygons(bodyA.getTransformedVertices(), bodyB.getTransformedVertices())
            } else if(shapeTypeB === ShapeType.Circle) {
                let collision = SAT_Collisions.IntersecCirclePolygon(bodyB.pos, bodyB.Radius, bodyA.getTransformedVertices())

                if(!collision) return false

                collision.normal = collision.normal.invert()

                return collision
            }
        } else if(shapeTypeA === ShapeType.Circle) {
            if(shapeTypeB === ShapeType.Box) {
                return SAT_Collisions.IntersecCirclePolygon(bodyA.pos, bodyA.Radius, bodyB.getTransformedVertices())
            } else if(shapeTypeB === ShapeType.Circle) {
                return SAT_Collisions.IntersectCircles(bodyA.pos, bodyA.Radius, bodyB.pos, bodyB.Radius)
            }
        }

        return false
    }

}