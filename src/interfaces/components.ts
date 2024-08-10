import { useCubeSlicer } from 'util/hooks'

import type { RefObject, ReactNode } from 'react'
import type { GroupedPoints } from 'interfaces/util'
import type { Mesh, Group } from 'three'


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

export interface CubeViewProps {
    coords?: [number, number],
    size?: number,
    rotation?: [number, number, number],
    zIndex?: number,
    isRotating?: boolean,
    isLast?: boolean,
    isAbove?: boolean,
    material?: 'standard' | 'normal',
    cubeSlicerGeometry?: ReturnType<typeof useCubeSlicer>
}

export interface CubeForwardedRefs {
    groupRef: RefObject<Group>,
    cubeRef: RefObject<Mesh>,
}
