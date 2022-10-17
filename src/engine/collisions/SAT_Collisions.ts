import Engine from "../engine";
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

    static IntersectPolygons(VerticesA: Vector[], VerticesB: Vector[]) {
        
        for (let i = 0; i < VerticesA.length - 1; i++) {
            let p1 = VerticesA[i]
            let p2 = VerticesA[(i + 1) % VerticesA.length]

            let edge = Vector.subtract(p1, p2)

            let axis = new Vector(edge.y, -edge.x)

            let A: {min: number , max: number } = {min: null, max: null}
            let B: {min: number, max: number} = {min: null, max: null}
            

            
            VerticesA.forEach((v, index) => { ///Fing biggest value on each vertice
                let n = new Vector(-axis.y, axis.x)

                if(!A.min || Vector.dot(v, n) < A.min) {
                    A.min = Vector.dot(v, n)
                }
                if(!A.max || Vector.dot(v, n) > A.max) {
                    A.max = Vector.dot(v, n)
                }
            });

    
            VerticesB.forEach(v => { 
                let n = new Vector(-axis.y, axis.x)

                if(!B.min || Vector.dot(v, n) < B.min) {
                    B.min = Vector.dot(v, n)
                }
                if(!B.max || Vector.dot(v, n) > B.max) {
                    B.max = Vector.dot(v, n)
                }
            });
            
            
            if(A.min > B.max || B.min > A.max) return false

        }

        for (let i = 0; i < VerticesB.length - 1; i++) {
            let p1 = VerticesB[i]
            let p2 = VerticesB[(i + 1) % VerticesB.length]

            let edge = Vector.subtract(p1, p2)

            let axis = new Vector(edge.y, -edge.x)

            let A: {min: number | null, max: number | null} = {min: null, max: null}
            let B: {min: number | null, max: number | null} = {min: null, max: null}
            

            
            VerticesA.forEach((v, index) => { ///Fing biggest value on each vertice
                let n = new Vector(-axis.y, axis.x)

                if(!A.min || Vector.dot(v, n) < A.min) {
                    A.min = Vector.dot(v, n)
                }
                if(!A.max || Vector.dot(v, n) > A.max) {
                    A.max = Vector.dot(v, n)
                }

            });

    
            VerticesB.forEach(v => { 
                let n = new Vector(-axis.y, axis.x)

                if(!B.min || Vector.dot(v, n) < B.min) {
                    B.min = Vector.dot(v, n)
                }
                if(!B.max || Vector.dot(v, n) > B.max) {
                    B.max = Vector.dot(v, n)
                }
                
            });
            
            

            if(A.min > B.max || B.min > A.max) return false  
        }

        return true
    }

    static projectVertices() {

    }
 
    /*static IntersectPolygons(VerticesA: Vector[], VerticesB: Vector[], engine: Engine)  { //Passed polygons needs to be rotated and trasnformed
        for (let i = 0; i < VerticesA.length; i++) {
            let va = VerticesA[i]
            let vb = VerticesA[(i + 1) % VerticesA.length]

            let edge = Vector.subtract(vb, va)
            let axis = new Vector(-edge.y, edge.x) //If it dosen´t work change to new Vector(edge.y, -edge.x)

            let A = SAT_Collisions.projectVetices(VerticesA, axis)
            let B = SAT_Collisions.projectVetices(VerticesB, axis)

            engine.drawLine(new Vector(0,0), axis.multiply(2000))
            
            

            if(A.min >= B.max || B.min >= A.max) return false
        }

        for (let i = 0; i < VerticesB.length; i++) {
            let va = VerticesB[i]
            let vb = VerticesB[(i + 1) % VerticesB.length]

            let edge = Vector.subtract(vb, va)
            let axis = new Vector(-edge.y, edge.x) //If it dosen´t work change to new Vector(edge.y, -edge.x)

            let A = SAT_Collisions.projectVetices(VerticesA, axis)
            let B = SAT_Collisions.projectVetices(VerticesB, axis)

            if(A.min >= B.max || B.min >= A.max) return false
        }

        return true
    }

    private static projectVetices(vertices: Vector[], axis: Vector) : {min: number, max:number} {
             
        let min = 1.175494351E-38
        let max = 3.402823466E+38

        for (let i = 0; i < vertices.length; i++) {
            let v:Vector = vertices[i]

            let proj = Vector.dot(v, axis)
            
            if(proj < min) min = proj
            if(proj > max) max = proj
        }

    
        return {min: min, max: max}
    }*/
}

