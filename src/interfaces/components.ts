import type { ReactNode } from 'react'
import type { GroupedPoints,
              GeometryLike } from 'interfaces/util'


export interface PenroseTriangleProps {
	cubesInSide?: number,   // количество кубов в стороне треугольника
	children?: ReactNode,   // список элементов, которые будут маппиться в центры кубов
    diameter?: number,      // диаметр описанной окружности в единицах Canvas
	rotation?: number,      // угол поворота треугольника по часовой стрелке в градусах
	gapRatio?: number,      // расстояние между кубами, выраженное в длинах куба [0,1]
    rotationSpeed?: number  // скорость вращения треугольника (по часовой стрелке)
}

export interface PenroseTriangleViewProps {
    cubeCenters: GroupedPoints,
    cubeSize: number,
    rotation?: number,
    diameter?: number,
}

export interface CubeCommonProps {
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
}

export interface CubeViewProps extends CubeCommonProps {
    geometry?: GeometryLike,
}

export interface MaterialProps {
    type?: 'standard' | 'normal',
    color?: string,
    checkDepth?: boolean,
}
