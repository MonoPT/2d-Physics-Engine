import { Vector } from "../Vector";

export class SAT_Collisions {
    static IntersectCircles(circleCenterA: Vector, radiusCircleA: number ,circleCenterB: Vector, radiusCircleB: number) : false | {depth: number, normal: Vector} {
        let distance: number = Vector.distance(circleCenterA, circleCenterB)

        let radii = radiusCircleA + radiusCircleB

        if(distance >= radii) return false //Circles dont collide
        
        //Else collision occurred and get intersection (depth) value

        let normal = Vector.Zero
        let depth = 0
        
        normal = Vector.subtract(circleCenterB, circleCenterA).normal

        depth =  radii - distance

        return {depth: depth, normal: normal}
    }

    static IntersectPolygons(VerticesA: Vector[], VerticesB: Vector[]) : false | {depth: number, normal: Vector} {
        let output = {depth: Number.MAX_VALUE, normal: Vector.Zero}


        for (let i = 0; i < VerticesA.length - 1; i++) {
            let p1 = VerticesA[i]
            let p2 = VerticesA[(i + 1) % VerticesA.length]

            let edge = Vector.subtract(p1, p2)

            let axis = new Vector(edge.y, -edge.x)
            
            let A = SAT_Collisions.projectVetices(VerticesA, axis)
            let B = SAT_Collisions.projectVetices(VerticesB, axis)
            
            if(A.min > B.max || B.min > A.max) return false

            ///Check depth to resolve collision between polygons
            let axisDepth: number = Math.min(B.max - A.min, A.max - B.min)

            if (axisDepth < output.depth) {
                output.depth = axisDepth
                output.normal = axis
            }

        }

        for (let i = 0; i < VerticesB.length - 1; i++) {
            let p1 = VerticesB[i]
            let p2 = VerticesB[(i + 1) % VerticesB.length]

            let edge = Vector.subtract(p1, p2)

            let axis = new Vector(edge.y, -edge.x)

            let A = SAT_Collisions.projectVetices(VerticesA, axis)
            let B = SAT_Collisions.projectVetices(VerticesA, axis)
            

            if(A.min > B.max || B.min > A.max) return false  

            ///Check depth to resolve collision between polygons
            let axisDepth: number = Math.min(B.max - A.min, A.max - B.min)

            if (axisDepth < output.depth) {
                output.depth = axisDepth
                output.normal = axis
            }
        }

        output.normal = new Vector(-output.normal.y, output.normal.x)
        output.depth = output.depth / output.normal.length + 1

        
        let outVecNormalized = Vector.normalize(output.normal)
        let CenterA: Vector = this.findArithmeticMean(VerticesA)
        let CenterB: Vector = this.findArithmeticMean(VerticesB)

        let direction = Vector.subtract(CenterB, CenterA)

        if(Vector.dot(direction, outVecNormalized) < 0) {
            output.normal = Vector.invert(output.normal)
        }

        return output
    }

    private static findArithmeticMean(Vertices: Vector[]): Vector {
        let sumX: number = 0
        let sumY: number = 0


        for (let i = 0; i < Vertices.length; i++) {
            const v = Vertices[i];
            
            sumX += v.x
            sumY += v.y
        }

        return new Vector(sumX / Vertices.length, sumY / Vertices.length)
    }

    private static projectVetices(vertices: Vector[], axis: Vector) : {min: number, max:number} {
             
        let min:any = null
        let max:any = null

        for (let i = 0; i < vertices.length; i++) { //This code projects the vertice position to the edge normal axis
            let n = new Vector(-axis.y, axis.x) //Makes normal face right direction
            let v = vertices[i]
            
            if(!min || Vector.dot(v, n) < min) {
                min = Vector.dot(v, n)
            }
            if(!max || Vector.dot(v, n) > max) {
                max = Vector.dot(v, n)
            }
        }
    
        return {min: min, max: max}
    }
}

