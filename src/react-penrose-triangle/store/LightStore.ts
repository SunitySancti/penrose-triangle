import { makeAutoObservable } from 'mobx'

import { numberify } from '../util'
import GeometryStore from './GeometryStore';

import type { NumberLike,
              LightConfig,
              LightInititalValues } from '../types'


export const defaultLight: LightConfig = Object.freeze({
    elevation: 2.5,
    rotation: 30,
    binding: false,
    intensity: 12.5,
    brightness: 1.25,
});

class LightStore {
    geometryStore: GeometryStore
    angle: number       // angle in degrees, clockwise

    binding: false | number
    elevation: number
    intensity: number
    brightness: number

    
    constructor(geometryStore: GeometryStore, defaultValues: LightInititalValues = {}) {
        makeAutoObservable(this);
        this.geometryStore = geometryStore;

        const { rotation, binding, elevation, intensity, brightness } = defaultValues || {};
        
        this.angle = numberify(rotation, defaultLight.rotation);
        this.binding = binding === undefined ? defaultLight.binding
                             : binding === false     ? false
                                                             : numberify(binding, 0);
        this.elevation = numberify(elevation, defaultLight.elevation);
        this.intensity = numberify(intensity, defaultLight.intensity);
        this.brightness = numberify(brightness, defaultLight.brightness);
    }

    // UNDO MARK

    get rotation() {
        return typeof(this.binding) === 'number'
            ? this.geometryStore.rotation + this.binding
            : this.angle
    }

    setIntensity = (value: NumberLike) => {
        this.intensity = numberify(value, this.intensity)
    }

    setBrightness = (value: NumberLike) => {
        this.brightness = numberify(value, this.brightness)
    }

    setRotation = (value: NumberLike) => {
        let newValue = numberify(value, this.angle);
        
        while(newValue > 360) newValue -= 360;
        while(newValue < 0) newValue += 360;

        if(typeof this.binding === 'number') {
            this.binding = Math.round((newValue - this.geometryStore.rotation) * 100) / 100
        }

        this.angle = newValue
    }

    setElevation = (value: NumberLike) => {
        this.elevation = numberify(value, this.elevation)
    }

    toggleBinding = () => {
        if(this.binding === false) {
            this.binding = Math.round((this.rotation - this.geometryStore.rotation) * 100) / 100 
        } else {
            this.angle = this.rotation;
            this.binding = false
        }
    }
}

export default LightStore
