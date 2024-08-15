import { Vector2 } from 'three'

import { cubeSizeCoefficient } from 'util/magicNumbers'


export const getPointsBetween = (
    startPoint: Vector2,
    endPoint: Vector2,
    numPoints: number
) => {
    const points = [];

    for (let i = 1; i < numPoints; i++) {
        const weight = i / numPoints;
        const point = new Vector2().lerpVectors(startPoint, endPoint, weight);
        points.push(point);
    }

    return points;
}

export const getSideLength = (start: Vector2, end: Vector2) => {
    return Math.sqrt((start.x - end.x) ** 2 + (start.y - end.y) ** 2)
}

export const getCubeSize = (
    triangleSideLength: number, // calculated length of triangle side
    gapRatio = 0.5,             // gap size expressed in cube lengths
    cubesInSide = 4,
) => {
    const n = Math.max(3, Math.floor(cubesInSide));
    const g = gapRatio;
    const l = triangleSideLength;
    const k = cubeSizeCoefficient;

    return k * l / ((n - 1) * (g + 1))
}

export const degToRad = (degrees: number) => Math.PI * degrees / 180;

export const degPerSecond = (degrees: number, delta: number) => (
    degrees * delta * Math.PI / 180
);

export const numberify = (value: string | number) => {
    if(typeof value === 'string') {
        value = Number(value)
    }
    if(Number.isNaN(value)) {
        return undefined
    } else {
        return value
    }
}

export const arraify = (value: any) => {
    if(Array.isArray(value)) {
        return value
    } else {
        return [ value ]
    }
}