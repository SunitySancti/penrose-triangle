import { useMemo,
         useState,
         useRef } from 'react'
import { makeAutoObservable } from 'mobx'

import { numberify } from './util'

import type { NumberLike,
              PenroseTriangleDefaultValues } from './types'


export class PenroseTriangleConfigStore {
    cubesInSide;
    gapRatio;
    diameter;
    rotation;
    rotationSpeed;
    isRotating;
    isInverted;
    
    constructor(defaultValues?: PenroseTriangleDefaultValues) {
        makeAutoObservable(this);
        const { cubesInSide, gapRatio, diameter, rotation, rotationSpeed, isRotating, isInverted } = defaultValues || {};

        this.cubesInSide = numberify(cubesInSide, 5)!;
        this.gapRatio = numberify(gapRatio, 0.2)!;
        this.diameter = numberify(diameter, 1)!;
        this.rotation = numberify(rotation, 0)!;
        this.rotationSpeed = numberify(rotationSpeed, 12)!;
        this.isRotating = isRotating === undefined ? true : isRotating;
        this.isInverted = !!isInverted

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

export const usePenroseTriangle = (defaultValues?: PenroseTriangleDefaultValues) => {
    const [ store ] = useState(() => new PenroseTriangleConfigStore(defaultValues));

    const { cubesInSide, gapRatio, diameter, rotation, rotationSpeed, isRotating, isInverted, setCubesInSide, setGapRatio, setDiameter, setRotation, rotate, setRotationSpeed, toggleAutoRotation, toggleRotationDirection, toggleGeometryInvertion } = store;

    const parentRef = useRef(null);

    const config = useMemo(() => ({
        cubesInSide,
        gapRatio,
        diameter,
        rotation,
        rotationSpeed,
        isRotating,
        isInverted,
        parentRef,
        rotate
    }),[ cubesInSide, gapRatio, diameter, rotation, rotationSpeed, isRotating, isInverted, parentRef, rotate ]);

    const controllers = useMemo(() => ({
        setCubesInSide,
        setGapRatio,
        setDiameter,
        setRotation,
        rotate,
        setRotationSpeed,
        toggleAutoRotation,
        toggleRotationDirection,
        toggleGeometryInvertion
    }),[ setCubesInSide, setGapRatio, setDiameter, setRotation, rotate, setRotationSpeed, toggleAutoRotation, toggleRotationDirection, toggleGeometryInvertion ]);

    return ({
        config,
        controllers,
        parentRef,
    })
}
