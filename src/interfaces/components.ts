import type { ReactNode,
              MouseEventHandler } from 'react'

import type { GeometrySlice,
              MaterialSlice,
              LightSlice } from 'react-penrose-triangle/types'


interface CircleGeometryProps {
    cx: number,
    cy: number,
    r: number,
}

export interface ControllerStyles {
    colors: {
        fill_1: string,
        fill_2: string,
        fill_3: string,
        fill_controller: string,
        stroke_1: string,
        stroke_2: string,
    },
    strokeWidths: {
        thin: number,
        bold: number,
    },
}

interface ControllerModelCommonProps {
    innerValue: number,
    outerValue: number,
    onOuterChange(newValue: number): void,
    styles: ControllerStyles,
}

export interface TriangleRotationControllerProps extends ControllerModelCommonProps {
    onInnerChange(newValue: number): void,
    outerMaxValue?: number,                  // upper (and lower) limit
    outerMaxAngle?: number,                  // in degrees
}
export type LightPositionControllerProps = ControllerModelCommonProps

interface ControllerViewCommonProps {
    handleMouseMove: MouseEventHandler,
    handleMouseDown: MouseEventHandler,
    cleanUp: MouseEventHandler,
    isHovering: boolean,
    innerAngle: number,
    outerAngle: number,
    styleConfig: ControllerStyles,
}

export type TriangleRotationControllerViewProps = ControllerViewCommonProps & {
    geometryConfig: {
        outerCircle: CircleGeometryProps,
        innerCircle: CircleGeometryProps,
    },
}

export type LightPositionControllerViewProps = ControllerViewCommonProps & {
    geometryConfig: {
        outerCircle: CircleGeometryProps,
    },
}

export interface ExpandableCardProps {
    isExpanded: boolean,
    toggleExpansion: MouseEventHandler,
    trigger: ReactNode,
    children: ReactNode,
    isBottom?: boolean,
    isLeft?: boolean,
}

interface ControlledMenu {
    isActive: boolean,
    toggleActive: MouseEventHandler,
    controllerStyles: ControllerStyles
}

export interface GeometryMenuProps extends ControlledMenu {
    geometry: GeometrySlice,
}

export interface MaterialMenuProps extends ControlledMenu {
    geometry: GeometrySlice,
    material: MaterialSlice,
    light: LightSlice,
}

export interface MenuControllerProps {
    geometry: GeometrySlice,
    material: MaterialSlice,
    light: LightSlice,
}
