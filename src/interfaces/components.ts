import type { ReactNode } from 'react'
import type { GroupedPoints } from 'interfaces/util'


export interface PenroseTriangleProps {
    diameter?: number // диаметр описанной окружности в единицах Canvas
	rotate?: number // угол поворота треугольника по часовой стрелке в градусах
	cubesInSide?: number // количество кубов в стороне треугольника
	gapRatio?: number // расстояние между кубами, выраженное в длинах куба [0,1]
	children?: ReactNode // список элементов, которые будут маппиться в центры кубов
}

export interface PenroseTriangleViewProps {
    groupedPoints: GroupedPoints,
    cubeSize: number,
}

export interface CubeViewProps {
    coords?: [number, number],
    size?: number,
    isRotating?: boolean,
}
