export class MathLib {
    static clamp(v:number, min:number, max:number) :number {
        if(min === max) return min

        if(min > max) throw console.error("Min is greater than Max");

        if(v < min) return min

        if(v > max) return max

        return v
    }

    static randomInBeetween(min:number, max:number) : number {
        return Math.floor(Math.random() * max) + min;
    }
}