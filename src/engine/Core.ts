import { Vector } from "./Vector";
import { inputHandler } from "./controls/inputHandler";

export class World {
    static readonly MinBodySize = 1
    static readonly MaxBodySize = 64 * 64 * 64
    static readonly MinDensity = 0.5
    static readonly MaxDensity = 21.4
}


class Core{
    ///Base engine
    protected canvasElement: HTMLCanvasElement
    readonly ctx: CanvasRenderingContext2D;

    protected secondsPassed: number = 0;
    protected oldTimeStamp: number = 0;
    protected _fps: number = 0;

    //Input manager
    readonly InputHandler = new inputHandler()

    constructor(canvas: HTMLCanvasElement) {
        this.canvasElement = canvas
        this.ctx = this.canvasElement.getContext('2d') as CanvasRenderingContext2D
    }

    protected engineUpdate(deltaTime:number): void {
        this.InputHandler.update()
    }

    get fps() {
        return this._fps
    }

    get canvasCenter() {
        return new Vector(this.canvasElement.width / 2, this.canvasElement.height / 2)
    }
}

interface Core {
    drawLine(startPos : Vector, endPos: Vector, color?: string): void;
    drawCircle(startPos: Vector, radius: number, angle?:number, color?: string, fill?: string): void
    drawRectangle(position: Vector, width: number, height: number, angle?:number ,color?: string, fill?: string) : void
}


Core.prototype.drawLine = function (startPos, endPos, color = 'black')  {
    let ctx = this.ctx;
    ctx.save()
    ctx.beginPath();
    ctx.moveTo(startPos.x, startPos.y);
    ctx.lineTo(endPos.x + startPos.x, endPos.y + startPos.y)
    ctx.restore()
    ctx.stroke();
}

Core.prototype.drawCircle = function(centerPos, radius, angle = 0, color = 'black', fill = "rgba(232, 79, 79, 1)") {
    let ctx = this.ctx;
    
    //Draw circle
    ctx.save();
    ctx.beginPath();
    ctx.translate(centerPos.x, centerPos.y);
    ctx.rotate(angle);
    ctx.arc(0, 0, radius, 0, 2 * Math.PI, false);
    ctx.strokeStyle = color
    ctx.stroke()
    ctx.fillStyle = fill
    ctx.fill()
    ctx.closePath()

    //Draw line
    ctx.beginPath();
    ctx.moveTo(0, 0)
    ctx.lineTo(radius, 0)
    ctx.strokeStyle = 'red'
    ctx.stroke()
    ctx.restore();
    
}

Core.prototype.drawRectangle = function(position, width, height, angle = 0 ,color = 'black', fill = "rgba(232, 79, 79, 1)" ) {
    let ctx = this.ctx;
    
    //Draw Rect
    ctx.save();
    ctx.beginPath();
    ctx.translate(position.x, position.y);
    ctx.rotate(angle);
    ctx.rect(-width / 2, -height / 2, width, height);
    ctx.strokeStyle = color
    ctx.stroke()
    ctx.fillStyle = fill
    ctx.fill()
    ctx.closePath()
    
    //Draw line
    ctx.beginPath();
    ctx.moveTo(0,0)
    ctx.lineTo(width / 2,0)
    ctx.strokeStyle = 'red'
    ctx.stroke()
    ctx.restore();
    
}







export default Core
