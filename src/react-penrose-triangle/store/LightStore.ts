import { makeAutoObservable } from 'mobx'

import { numberify } from '../util'

import type { NumberLike,
              LightConfig,
              PenroseTriangleDefaultValues } from '../types'
import GeometryStore from './GeometryStore';


const initial: LightConfig = Object.freeze({
    lightElevation: 2,
    lightRotation: 30,
    lightBinding: false,
    lightIntensity: 10,
    brightness: 1,
    lightPosition: Object.freeze([1,1,1] as const),
});

class LightStore {
    geometryStore: GeometryStore
    angle: number       // angle in degrees, clockwise

    lightBinding: false | number
    lightElevation: number
    lightIntensity: number
    brightness: number

    
    constructor(geometryStore: GeometryStore, defaultValues?: PenroseTriangleDefaultValues) {
        makeAutoObservable(this);
        this.geometryStore = geometryStore;

        const { lightRotation, lightBinding, lightElevation, lightIntensity, brightness } = defaultValues || {};
        
        this.angle = numberify(lightRotation, initial.lightRotation);
        this.lightBinding = lightBinding === undefined ? initial.lightBinding
                             : lightBinding === false     ? false
                                                             : numberify(lightBinding, 0);
        this.lightElevation = numberify(lightElevation, initial.lightElevation);
        this.lightIntensity = numberify(lightIntensity, initial.lightIntensity);
        this.brightness = numberify(brightness, initial.brightness);
    }

    // UNDO MARK

    get lightRotation() {
        return typeof(this.lightBinding) === 'number'
            ? this.geometryStore.rotation + this.lightBinding
            : this.angle
    }

    get lightPosition() {
        const radians = Math.PI * (90 - this.lightRotation) / 180;

        return ([
            Math.cos(radians),
            Math.sin(radians),
            this.lightElevation
        ]) as const
    }

    setlightIntensity = (value: NumberLike) => {
        this.lightIntensity = numberify(value, this.lightIntensity)
    }

    setBrightness = (value: NumberLike) => {
        this.brightness = numberify(value, this.brightness)
    }

    setLightRotation = (value: NumberLike) => {
        let newValue = numberify(value, this.angle);
        
        while(newValue > 360) newValue -= 360;
        while(newValue < 0) newValue += 360;

        if(typeof this.lightBinding === 'number') {
            this.lightBinding = Math.round((newValue - this.geometryStore.rotation) * 100) / 100
        }

        this.angle = newValue
    }

    setlightElevation = (value: NumberLike) => {
        this.lightElevation = numberify(value, this.lightElevation)
    }

    togglelightBinding = () => {
        if(this.lightBinding === false) {
            this.lightBinding = Math.round((this.lightRotation - this.geometryStore.rotation) * 100) / 100 
        } else {
            this.angle = this.lightRotation;
            this.lightBinding = false
        }
    }
}

export default LightStore
