import { Vector2 } from 'three'


// Manipulations with vectors

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
    triangleSideLength: number,  // calculated length of triangle side
    gapRatio = 0.5,     // gap size expressed in cube lengths
    cubesInSide = 4,
) => {
    const n = Math.floor(cubesInSide);
    const g = gapRatio;
    const l = triangleSideLength;

    if(n > 2) {
        return l / ((n - 1) * (g + 1))
    } else {
        return 1
    }
}
