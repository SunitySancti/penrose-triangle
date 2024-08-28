import { makeAutoObservable } from 'mobx'

import type { MaterialConfig,
              MaterialInititalValues } from '../types'


export const defaultMaterial: MaterialConfig = Object.freeze({
    color: '#c081de'
});

class MaterialStore {
    color: string
    
    constructor(defaultValues: MaterialInititalValues = {}) {
        makeAutoObservable(this);
        const { color } = defaultValues;

        this.color = color || defaultMaterial.color
    }

    setColor = (value: string) => {
        this.color = value
    }
}

export default MaterialStore
