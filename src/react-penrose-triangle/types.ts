import { useCubeGeometry } from './util/hooks'
import GeometryStore from './store/GeometryStore'
import MaterialStore from './store/MaterialStore'
import LightStore from './store/LightStore'

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

// HELPERS //

type Required<T> = {
    [K in keyof T]-?: T[K];
}
type Optional<T extends {[prop: string]: any}> = {
    [K in keyof T]?: T[K]
}
type Properties<T> = {  
    [K in keyof T]: T[K] extends Function ? never : K  
}[keyof T];  

type Config<Store> = Pick<Store, Properties<Store>>;
type Actions<Store> = Omit<Store, keyof Config<Store>>

type GroupedPoints = Vector2[][];
type GeometryLike = ReturnType<typeof useCubeGeometry>;
export type NumberLike = number | string; 

// STORES //

export type GeometryConfig = Config<GeometryStore>
export type MaterialConfig = Config<MaterialStore>
export type LightConfig = Omit<Config<LightStore>, 'geometryStore' | 'angle'>

export type GeometryControllers = Actions<GeometryStore>
export type MaterialControllers = Actions<MaterialStore>
export type LightControllers = Actions<LightStore>

export interface GroupedConfig {
    geometry: GeometryConfig,
    material: MaterialConfig,
    light: LightConfig,
}
export interface GroupedControllers {
    geometry: GeometryControllers,
    material: MaterialControllers,
    light: LightControllers,
}
export interface GeometrySlice {
    config: GeometryConfig,
    controllers: GeometryControllers,
}
export interface MaterialSlice {
    config: MaterialConfig,
    controllers: MaterialControllers,
}
export interface LightSlice {
    config: LightConfig,
    controllers: LightControllers,
}

export type PenroseTriangleDefaultValues = Optional<GeometryConfig & MaterialConfig & LightConfig>
export interface PenroseTriangleProps extends Required<PenroseTriangleDefaultValues> {
    parentRef: RefObject<HTMLElement>,
    rotate: (degrees: NumberLike) => void,
}

// COMPONENT INTERFACES //    

interface TriangleCommonProps {
    diameter?: number,      // диаметр описанной окружности в единицах Canvas
	rotation?: number,      // угол поворота треугольника по часовой стрелке в градусах
    isInverted?: boolean,   // направление отрисовки геометрии
    color?: string,
}

export interface PenroseTriangleModelProps extends TriangleCommonProps {
    rotate: (value: number | string) => void,
	cubesInSide?: number,   // количество кубов в стороне треугольника
	gapRatio?: number,      // расстояние между кубами, выраженное в длинах куба [0,1]
    rotationSpeed?: number, // скорость вращения треугольника (по часовой стрелке)
    isRotating?: boolean,
}

export interface SceneProps extends PenroseTriangleProps {
}

export interface PenroseTriangleViewProps extends TriangleCommonProps {
    cubeCenters: GroupedPoints,
    cubeSize: number,
}

interface CubeCommonProps {
    order?: number,
    positionX?: number,
    positionY?: number,
    positionZ?: number,
    rotationY?: number,
    rotationZ?: number,
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
