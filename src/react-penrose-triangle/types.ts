import { usePenroseTriangle } from './store'
import { useCubeGeometry } from './util/hooks'

import GeometryStore from './store/GeometryStore'
import MaterialStore from './store/MaterialStore'
import LightStore from './store/LightStore'

import type { Vector2 } from 'three'
import { RefObject } from 'react'


// HELPERS //

type Optional<T extends {[prop: string]: any}> = {
    [K in keyof T]?: T[K]
}

type Properties<T> = {
    [K in keyof T]: T[K] extends Function ? never : K
}[keyof T]

// HOOKS //

type GroupedPoints = Vector2[][];
type GeometryLike = ReturnType<typeof useCubeGeometry>;
export type NumberLike = number | string;

export interface Vertices {
    [vertex: string]: Vector2
}

export interface CubesDataParams {
    cubesInSide: number,
    gapRatio: number,
    diameter: number,
    isInverted: boolean
}

export interface TriangleRotationParams {
    rotation: number,
    rotationSpeed: number,
    isRotating: boolean,
    setRotation?: (value: number | string) => void,
    lightRotation: number,
    binding: false | number,
}

// STORES //

type Config<Store> = Pick<Store, Properties<Store>>;
type Actions<Store> = Omit<Store, keyof Config<Store>>
export type HookReturn = ReturnType<typeof usePenroseTriangle>

export type GroupedConfig = HookReturn['config']
export type GroupedControllers = HookReturn['controllers']
export type GeometrySlice = HookReturn['geometry']
export type MaterialSlice = HookReturn['material']
export type LightSlice = HookReturn['light']

export type GeometryConfig = GeometrySlice['config']
export type MaterialConfig = Config<MaterialStore>
export type LightConfig = Omit<Config<LightStore>, 'geometryStore' | 'angle'>

export type GeometryControllers = Actions<GeometryStore>
export type MaterialControllers = Actions<MaterialStore>
export type LightControllers = Actions<LightStore>

export type GeometryInititalValues = Optional<Config<GeometryStore>>
export type MaterialInititalValues = Optional<Config<MaterialStore>>
export type LightInititalValues = Optional<Config<LightStore>>

export interface PenroseTriangleInitialValues {
    geometry?: GeometryInititalValues,
    material?: MaterialInititalValues,
    light?: LightInititalValues,
}

// COMPONENTS //

export interface PenroseTriangleProps {
    geometry?: Optional<GeometryConfig>,
    material?: Optional<MaterialConfig>,
    light?: Optional<LightConfig>,
    parentRef?: RefObject<HTMLElement>,
    setRotation?: (value: NumberLike) => void,
}

export interface SceneProps {
    geometry: GeometryConfig,
    material: MaterialConfig,
    light: LightConfig,
    parentRef?: RefObject<HTMLElement>,
    setRotation?: (value: NumberLike) => void,
}

interface TriangleCommonProps {
    diameter: number,
	rotation: number,
    isInverted: boolean,
    color: string,
}

export interface PenroseTriangleModelProps extends TriangleCommonProps {
    useAutoRotation: () => void,
	cubesInSide: number,
	gapRatio: number,
    rotationSpeed: number,
    isRotating: boolean,
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