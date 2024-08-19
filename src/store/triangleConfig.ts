import { createContext,
         useContext } from 'react'
import { makeAutoObservable } from 'mobx'

import { numberify } from 'util'


type NumberLike = number | string;

class TriangleConfigStore {
    cubesInSide = 5;
    gapRatio = 0.2;
    diameter = 1;
    rotation = 60;
    rotationSpeed = 12;
    isRotating = true;
    isInverted = false;
    
    constructor() {
        makeAutoObservable(this);
    }

    setCubesInSide = (value: NumberLike) => {
        const num = numberify(value);
        if(num) {
            this.cubesInSide = Math.floor(num)
        }
    }

    setGapRatio = (value: NumberLike) => {
        const num = numberify(value);
        if(num !== undefined) {
            this.gapRatio = num
        }
    }

    setDiameter = (value: NumberLike) => {
        const num = numberify(value);
        if(num) {
            this.diameter = num
        }
    }

    setRotation = (value: NumberLike) => {
        const num = numberify(value);
        if(num) {
            this.rotation = num
        }
    }

    rotate = (value: NumberLike) => {
        const num = numberify(value);
        if(num) {
            let newValue = Math.round((this.rotation + num) * 100) / 100
            
            if(newValue > 360) {
                this.rotation = newValue - 360
            } else if(newValue < 0) {
                this.rotation = newValue + 360
            } else {
                this.rotation = newValue
            }
            
        }
    }

    setRotationSpeed = (value: NumberLike) => {
        const num = numberify(value);
        if(num) {
            this.rotationSpeed = num
        }
    }

    toggleAutoRotation = () => {
        this.isRotating = !this.isRotating
    }

    toggleRotationDirection = () => {
        this.rotationSpeed = -this.rotationSpeed
    }

    toggleGeometryInvertion = () => {
        this.isInverted = !this.isInverted
    }
}

export const triangleConfigStoreInstance = new TriangleConfigStore();
export const TriangleConfigContext = createContext(triangleConfigStoreInstance);
export const useTriangleConfig = () => useContext(TriangleConfigContext);
