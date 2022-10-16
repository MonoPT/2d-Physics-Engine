import { Vector } from "./Vector";
import { MathLib } from "./mathLib";
import Core from "./Core";
import { RigidBody, ShapeType } from "./RigidBody"
import { SAT_Collisions } from './collisions/SAT_Collisions'

let angle = 0; //Delete later

class Engine extends Core {
    bodyList: RigidBody[] = []

    constructor({canvasElementId}: {canvasElementId: string}) {
        //Validate and create Canvas
        if(canvasElementId.length < 1) throw console.error("Please provide an Id for a canvas element")
        let canvas = document.querySelector(`#${canvasElementId}`)
        if(canvas?.nodeName !== "CANVAS") throw console.error(`Element id ${canvasElementId} doesn't belong to a canvas element`);
        super(canvas as HTMLCanvasElement);
        
        this.initialize();
        this.loop(0);
    }

    private loop(timeStamp: number) {
        this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = timeStamp;
        let deltaTime = this.secondsPassed


        // Calculate fps
        this._fps = Math.round(1 / this.secondsPassed)

        this.ctx.clearRect(0,0, this.canvasElement.width, this.canvasElement.height)

        this.engineUpdate(deltaTime) //Make Updates
        
        // The loop function has reached it's end. Keep requesting new frames
        window.requestAnimationFrame(this.loop.bind(this));
    }

    initialize() {
        for (let index = 0; index < 10; index++) {
            let type = Math.random() < .5 ? ShapeType.Box : ShapeType.Circle
            let x = Math.round(MathLib.randomInBeetween(300, this.canvasElement.width / 2))
            let y = Math.round(MathLib.randomInBeetween(120, this.canvasElement.height / 2))
            
            
            type = ShapeType.Circle
            
            if(type === ShapeType.Circle) {
                let body = RigidBody.createCircleBody(30, new Vector(x,y), 2, false, 0.5)
                if(body) this.bodyList.push(body)
            } else {
                let body = RigidBody.createBoxBody(60, 60, new Vector(x,y), 2, false, 0.5)
                if(body) this.bodyList.push(body)
            }
        }
    }

    protected engineUpdate(deltaTime: number) :void {
        ///Note: Collisions are calculated before draw and after handling inputs
        super.engineUpdate(deltaTime);

        //Handle movement
        let moveAmt = Vector.normalize(this.InputHandler.movementAxis).multiply(500).multiply(deltaTime)
        this.bodyList[0].move(moveAmt)

        //Make Updates calls
        this.update()

        //Draw elements on canvas
        this.draw()
    }

    private checkForCollisions() {
        for (let i = 0; i < this.bodyList.length; i++) {
            let bodyA: RigidBody = this.bodyList[i]

            for (let j = i + 1; j < this.bodyList.length; j++) {
                let bodyB: RigidBody = this.bodyList[j]

                let collision = SAT_Collisions.IntersectCircles(bodyA.pos, bodyA.Radius, bodyB.pos, bodyB.Radius)
                if(collision) {
                    bodyA.move(Vector.invert(collision.normal).multiply(collision.depth / 2 ))
                    bodyB.move(collision.normal.multiply(collision.depth / 2))
                }
            } 
        }
    }


    private draw() {
        this.checkForCollisions() //Check collisions
        //angle += 0.9

        if(angle > 360) angle = 0

        
        this.bodyList.forEach((body:RigidBody) => {
            let color = this.bodyList[0] === body ? 'blue' : 'red'
            let fill = this.bodyList[0] === body ? 'rgba(79, 79, 232, 1)' : 'rgba(232, 79, 79, 1)'

            if(body.ShapeType === ShapeType.Circle) {
                this.drawCircle(body.pos, body.Radius, angle, color, fill)
            } else {
                this.drawRectangle(body.pos, body.Width, body.Height, angle, color)
            }
        });
        
        
    }

    update() {
        
    }
}


////











export default Engine