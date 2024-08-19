import { useCubeGeometry } from 'util/hooks'
import type { Vector2 } from 'three'


export interface Vertices {
    [vertex: string]: Vector2
}

export type GroupedPoints = Vector2[][];

export interface CubesDataParams {
    cubesInSide: number,
    gapRatio: number,
    diameter: number,
    isInverted: boolean
}

export type ArrayElement<ArrType> = ArrType extends readonly (infer ElementType)[]
    ? ElementType
    : never;

export type GeometryLike = ReturnType<typeof useCubeGeometry>
