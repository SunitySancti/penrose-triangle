import { makeAutoObservable } from 'mobx'

import type { MaterialConfig,
              PenroseTriangleDefaultValues } from '../types'


const initial: MaterialConfig = Object.freeze({
    color: '#ddd200'
});

class MaterialStore {
    color: string
    
    constructor(defaultValues?: PenroseTriangleDefaultValues) {
        makeAutoObservable(this);
        const { color } = defaultValues || {};

        this.color = color || initial.color
    }

    setColor = (value: string) => {
        this.color = value
    }
}

export default MaterialStore
