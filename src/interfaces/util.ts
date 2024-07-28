import { Vector2 } from 'three'

export interface GetCubesCentersParams {
    size?: number, // диаметр описанной окружности в пикселях
    cubesInLine?: number, // количество кубов в стороне треугольника
}

export interface Vertices {
    [vertex: string]: Vector2
}

export type GroupedPoints = Vector2[][]
