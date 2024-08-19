import type { ReactNode,
              MouseEventHandler, 
              RefObject} from 'react'
import type { GroupedPoints,
              GeometryLike } from 'interfaces/util'


interface TriangleCommonProps {
    diameter?: number,      // диаметр описанной окружности в единицах Canvas
	rotation?: number,      // угол поворота треугольника по часовой стрелке в градусах
    isInverted?: boolean,   // направление отрисовки геометрии
}

export interface PenroseTriangleProps extends TriangleCommonProps {
    parent?: RefObject<HTMLElement>,
	cubesInSide?: number,   // количество кубов в стороне треугольника
	children?: ReactNode,   // список элементов, которые будут маппиться в центры кубов
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

export interface TriangleRotationControllerProps {
    innerValue: number,
    outerValue: number,
    onInnerChange(newValue: number): void,
    onOuterChange(newValue: number): void,
    outerMaxValue?: number,                  // upper (and lower) limit
    outerMaxAngle?: number,                  // in degrees
    styles?: {
        colors?: {
            fill_1?: string,
            fill_2?: string,
            fill_3?: string,
            stroke_1?: string,
            stroke_2?: string,
        },
        strokeWidths?: {
            thin?: number,
            bold?: number,
        }
    }
}

export interface TriangleRotationControllerViewProps {
    handleMouseMove: MouseEventHandler,
    handleMouseDown: MouseEventHandler,
    cleanUp: MouseEventHandler,
    isHovering: boolean,
    innerAngle: number,
    outerAngle: number,
    styleConfig: {
        colors: {
            fill_1: string,
            fill_2: string,
            fill_3: string,
            stroke_1: string,
            stroke_2: string,
        },
        strokeWidths: {
            thin: number,
            bold: number,
        }
    },
    geometryConfig: {
        outerCircle: {
            cx: number,
            cy: number,
            r: number,
        },
        innerCircle: {
            cx: number,
            cy: number,
            r: number,
        },
    }
}

export interface ExpandableCardProps {
    trigger: ReactNode,
    children: ReactNode,
    isBottom?: boolean,
    isLeft?: boolean,
}
