import { makeAutoObservable } from 'mobx'

import { numberify,
         boolify } from '../util'

import type { NumberLike,
              GeometryConfig,
              GeometryInititalValues } from '../types'


export const defaultGeometry: GeometryConfig = Object.freeze({
    cubesInSide: 5,
    gapRatio: 0.2,
    diameter: 1,
    rotation: 0,
    rotationSpeed: 12,
    isRotating: true,
    isInverted: false,
});

class GeometryStore {
    cubesInSide: number
    gapRatio: number
    diameter: number
    rotation: number
    rotationSpeed: number
    isRotating: boolean
    isInverted: boolean
    
    constructor(initialValues: GeometryInititalValues = {}) {
        makeAutoObservable(this);
        const { cubesInSide, gapRatio, diameter, rotation, rotationSpeed, isRotating, isInverted } = initialValues;

        this.cubesInSide = numberify(cubesInSide, defaultGeometry.cubesInSide)!;
        this.gapRatio = numberify(gapRatio, defaultGeometry.gapRatio)!;
        this.diameter = numberify(diameter, defaultGeometry.diameter)!;
        this.rotation = numberify(rotation, defaultGeometry.rotation)!;
        this.rotationSpeed = numberify(rotationSpeed, defaultGeometry.rotationSpeed)!;
        this.isRotating = boolify(isRotating, defaultGeometry.isRotating);
        this.isInverted = boolify(isInverted, defaultGeometry.isInverted);
    }

    setCubesInSide = (value: NumberLike) => {
        this.cubesInSide = Math.floor(numberify(value, this.cubesInSide))
    }

    setGapRatio = (value: NumberLike) => {
        this.gapRatio = numberify(value, this.gapRatio)
    }

    setDiameter = (value: NumberLike) => {
        this.diameter = numberify(value, this.diameter)
    }

    setRotation = (value: NumberLike) => {
        let newValue = numberify(value, this.rotation);

        while(newValue > 360) newValue -= 360;
        while(newValue < 0) newValue += 360;

        this.rotation = newValue
    }

    rotate = (value: NumberLike) => {
        const num = numberify(value, undefined);
        if(num) {
            let newValue = Math.round((this.rotation + num) * 100) / 100
            
            while(newValue > 360) newValue -= 360;
            while(newValue < 0) newValue += 360;

            this.rotation = newValue
            
        }
    }

    setRotationSpeed = (value: NumberLike) => {
        this.rotationSpeed = numberify(value, this.rotationSpeed)
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

export default GeometryStore
