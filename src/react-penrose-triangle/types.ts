import { useCubeGeometry } from './util/hooks'
import { PenroseTriangleConfigStore } from './store'

import type { RefObject} from 'react'
import type { Vector2 } from 'three'


export interface Vertices {
    [vertex: string]: Vector2
}
export interface CubesDataParams {
    cubesInSide: number,
    gapRatio: number,
    diameter: number,
    isInverted: boolean
}

type RequiredProperties<T> = {
    [K in keyof T]-?: T[K];
};
type Actions<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : never;
};

type GroupedPoints = Vector2[][];
type GeometryLike = ReturnType<typeof useCubeGeometry>;
export type NumberLike = number | string; 

// CONFIG //

export interface PenroseTriangleDefaultValues {
    cubesInSide?: number,
    gapRatio?: number,
    diameter?: number,
    rotation?: number,
    rotationSpeed?: number,
    isRotating?: boolean,
    isInverted?: boolean,
}

export interface PenroseTriangleConfig extends RequiredProperties<PenroseTriangleDefaultValues> {
    parentRef: RefObject<HTMLElement>,
    rotate: (degrees: NumberLike) => void,
}

export type PenroseTriangleControllers = Actions<PenroseTriangleConfigStore>

// COMPONENT INTERFACES //    

interface TriangleCommonProps {
    diameter?: number,      // диаметр описанной окружности в единицах Canvas
	rotation?: number,      // угол поворота треугольника по часовой стрелке в градусах
    isInverted?: boolean,   // направление отрисовки геометрии
}

export interface PenroseTriangleProps extends TriangleCommonProps {
    rotate: (value: number | string) => void,
    parentRef?: RefObject<HTMLElement>,
	cubesInSide?: number,   // количество кубов в стороне треугольника
	// children?: ReactNode,   // список элементов, которые будут маппиться в центры кубов
	gapRatio?: number,      // расстояние между кубами, выраженное в длинах куба [0,1]
    rotationSpeed?: number, // скорость вращения треугольника (по часовой стрелке)
    isRotating?: boolean,
}

export interface PenroseTriangleViewProps extends TriangleCommonProps {
    cubeCenters: GroupedPoints,
    cubeSize: number,
}

interface CubeCommonProps {
    order?: number,
    coords?: [number, number],
    zIndex?: number,
    rotation?: [number, number, number],
    isLast?: boolean,
    checkDepth?: boolean,
    material?: 'standard' | 'normal',
    color?: string,
}

export interface CubeModelProps extends CubeCommonProps {
    size?: number
    isRotating?: boolean,
    isInverted?: boolean,
}

export interface CubeViewProps extends CubeCommonProps {
    geometry?: GeometryLike,
}

export interface MaterialProps {
    type?: 'standard' | 'normal',
    color?: string,
    checkDepth?: boolean,
}
