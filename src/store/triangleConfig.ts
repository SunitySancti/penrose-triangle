import { createContext,
         useContext } from 'react'
import { makeAutoObservable } from 'mobx'

import { numberify } from 'util'


type NumberLike = number | string;

class TriangleConfigStore {
    cubesInSide = 5;
    gapRatio = 0.2;
    diameter = 1;
    rotation = 0;
    rotationSpeed = 12;
    
    constructor() {
        makeAutoObservable(this);
    }

    setCubesInSide = (value: NumberLike) => {
        const num = numberify(value);
        if(num) {
            this.cubesInSide = Math.floor(num)
        }
    }

    setGapRatio(value: NumberLike) {
        const num = numberify(value);
        if(num) {
            this.gapRatio = num
        }
    }

    setDiameter(value: NumberLike) {
        const num = numberify(value);
        if(num) {
            this.diameter = num
        }
    }

    setRotation(value: NumberLike) {
        const num = numberify(value);
        if(num) {
            this.rotation = num
        }
    }

    setRotationSpeed(value: NumberLike) {
        const num = numberify(value);
        if(num) {
            this.rotationSpeed = num
        }
    }

    toggleRotationDirection() {
        this.rotationSpeed = -this.rotationSpeed
    }
}

export const triangleConfigStoreInstance = new TriangleConfigStore();
export const TriangleConfigContext = createContext(triangleConfigStoreInstance);
export const useTriangleConfig = () => useContext(TriangleConfigContext);
