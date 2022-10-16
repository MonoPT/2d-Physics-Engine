import { Vector } from "../Vector"
import { Axis } from "./axis"

export class inputHandler {
    keysPressed:string[] = []
    
    private xAxis: Axis
    private yAxis: Axis


    constructor() {
        this.xAxis = new Axis({positiveKey: 'D', negativeKey: 'A'})
        this.yAxis = new Axis({positiveKey: 'S', negativeKey: 'W'})

        this.addEventListeners()
    }

    addEventListeners() {
        window.addEventListener('keydown', (e) => {
            if(!this.keysPressed.includes(e.code)) {
                this.keysPressed.unshift(e.code)
            }
        })
        window.addEventListener('keyup', (e) => {
            this.keysPressed.splice(this.keysPressed.indexOf(e.code), 1)
        })
    }

    update() {
        this.handleInput();
    }

    handleInput() {
        ///Check Axis
        this.xAxis.update(this.keysPressed)
        this.yAxis.update(this.keysPressed)
    }

    get movementAxis() {
        return new Vector(this.xAxis.value, this.yAxis.value)
    }
}


