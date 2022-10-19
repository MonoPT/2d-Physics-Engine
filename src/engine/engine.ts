import { Vector } from "./math/Vector";
import { MathLib } from "./math/mathLib";
import Core from "./core/Core";
import { PhysicsWorld } from "./core/PhysicsWorld";
import { RigidBody, ShapeType } from "./physicsBodies/RigidBody"

class Engine extends Core {
    bodyList: RigidBody[] = []
    private physicsWorld: PhysicsWorld

    constructor({canvasElementId}: {canvasElementId: string}) {
        //Validate and create Canvas
        if(canvasElementId.length < 1) throw console.error("Please provide an Id for a canvas element")
        let canvas = document.querySelector(`#${canvasElementId}`)
        if(canvas?.nodeName !== "CANVAS") throw console.error(`Element id ${canvasElementId} doesn't belong to a canvas element`);
        super(canvas as HTMLCanvasElement);

        this.physicsWorld = new PhysicsWorld(this)
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
        for (let index = 0; index < 12; index++) {
            let type = Math.random() < .5 ? ShapeType.Box : ShapeType.Circle
            let x = Math.round(MathLib.randomInBeetween(300, this.canvasElement.width / 2))
            let y = Math.round(MathLib.randomInBeetween(120, this.canvasElement.height / 2))
            
                        
            if(type === ShapeType.Circle) {
                let body = RigidBody.createCircleBody(30, new Vector(x,y), 2, false, 0.5)
                if(body) this.physicsWorld?.addBody(body)
            } else {
                let body = RigidBody.createBoxBody(60, 60, new Vector(x,y), 2, false, 0.5) as RigidBody
                if(body) this.physicsWorld?.addBody(body)
            }
            
            
        }
    }

    protected engineUpdate(deltaTime: number) :void {
        ///Note: Collisions are calculated before draw and after handling inputs
        super.engineUpdate(deltaTime);

        //Handle movement
        let moveAmt = Vector.normalize(this.InputHandler.movementAxis).multiply(500 * deltaTime)

        let player = this.physicsWorld?.getBody(0)

        if(player) player.move(moveAmt)

        

        //Make Updates calls
        this.update(deltaTime)

        //Apply physics
        this.physicsWorld?.Step(deltaTime)
        
        
        //Draw elements on canvas
        this.draw()
        
        //Add fps to screen
        let fpsContainer = document.querySelector("#fps .fps") as HTMLElement
        fpsContainer.textContent = `${this.fps}`

    }

  

    

    
    private draw() {
        //angle += 0.9
        for (let i = 0; i < this.physicsWorld.bodyCount; i++) {
            let body = this.physicsWorld.getBody(i) as RigidBody
            
            let color = this.physicsWorld.getBody(0) === body ? 'blue' : 'red'
            
            if(body.ShapeType === ShapeType.Circle) {
                this.drawCircle(body.pos, body.Radius, body.angle, color, body.fill)
            } else {
                this.drawRectangle(body.pos, body.Width, body.Height, body.angle, color, body.fill)
            }
        }
         
    }

    update(deltaTime: number) {}
       

        
    
}


export default Engine