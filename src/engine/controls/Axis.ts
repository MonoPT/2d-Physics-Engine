type AxisType = {
    positiveKey: string,
    negativeKey: string
}

export class Axis {
    value = 0
    positiveKey:string
    negativeKey:string

    constructor({positiveKey, negativeKey} : AxisType) {
        this.positiveKey = 'Key' + positiveKey.toUpperCase()
        this.negativeKey = 'Key' + negativeKey.toUpperCase()

    }

    update(keysPressed:string[]) {
        let axisPositiveIndex = keysPressed.indexOf(this.positiveKey);
        let axisNegativeIndex = keysPressed.indexOf(this.negativeKey);

        if(keysPressed.includes(this.positiveKey) || keysPressed.includes(this.negativeKey)) {
            //Positive Axis
            if(axisPositiveIndex >= 0) {
                if (!(axisNegativeIndex >= 0 && axisNegativeIndex < axisPositiveIndex)) {
                    this.value = 1
                } else if(axisPositiveIndex >= 0) {
                    this.value = -1
                }
            }

            //Negative axis
            if(axisNegativeIndex >= 0) {
                if (!(axisPositiveIndex >= 0 && axisPositiveIndex < axisNegativeIndex)) {
                    this.value = -1
                } else if (axisNegativeIndex >= 0) {
                    this.value = 1
                }
            }
        } else {
            this.value = 0
        }
    }
}