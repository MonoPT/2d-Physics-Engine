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
}