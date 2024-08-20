import type { ReactNode,
              MouseEventHandler } from 'react'

import type { PenroseTriangleConfig,
              PenroseTriangleControllers } from 'react-penrose-triangle/types'

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

export interface ConfigMenuProps {
    config: PenroseTriangleConfig,
    controllers: PenroseTriangleControllers,
}
