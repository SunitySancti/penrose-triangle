import { Vector2 } from 'three'

import type { GetCubesCentersParams,
              Vertices } from 'interfaces/util'


// Manipulations with vectors

export const getSideLength = (start: Vector2, end: Vector2) => {
    return Math.sqrt((start.x - end.x) ** 2 + (start.y - end.y) ** 2)
}

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

export const getCubesCenters = ({
    size = 6,
    cubesInLine = 4
}: GetCubesCentersParams = {}
) => {
    const halfSideLength = size * Math.sqrt(3) / 4;
    const halfHeight = size * 3 / 8;

    const vertices: Vertices = {
        A: new Vector2(0, halfHeight),
        B: new Vector2(-halfSideLength, -halfHeight),
        C: new Vector2(halfSideLength, -halfHeight),
    }
    const { A, B, C } = vertices;
    
    const betweenAB = getPointsBetween(A, B, cubesInLine - 1);
    const betweenBC = getPointsBetween(B, C, cubesInLine - 1);
    const betweenCA = getPointsBetween(C, A, cubesInLine - 1);

    return [
        [ A, ...betweenAB ],
        [ B, ...betweenBC ],
        [ C, ...betweenCA ],
    ]
}
