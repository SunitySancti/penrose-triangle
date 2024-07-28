import { useMemo } from 'react'
import { Vector2 } from 'three'

import { getPointsBetween,
         getCubeSize,
         getSideLength } from 'util'

import type { Vertices } from 'interfaces/util'


export const useCubesData = ({
    cubesInSide = 4,
    gapRatio = 0.5,     // gap size expressed in cube lengths
    diameter = 6,       // triangle circumcircle's diameter
}) => {
    const halfSideLength = diameter * Math.sqrt(3) / 4;
    const halfHeight = diameter * 3 / 8;

    const vertices: Vertices = {
        A: new Vector2(0, halfHeight),
        B: new Vector2(-halfSideLength, -halfHeight),
        C: new Vector2(halfSideLength, -halfHeight),
    }
    const { A, B, C } = vertices;
    
    const betweenAB = getPointsBetween(A, B, cubesInSide - 1);
    const betweenBC = getPointsBetween(B, C, cubesInSide - 1);
    const betweenCA = getPointsBetween(C, A, cubesInSide - 1);

    const groupedPoints = useMemo(() => [
        [ A, ...betweenAB ],
        [ B, ...betweenBC ],
        [ C, ...betweenCA ],
    ],[
        cubesInSide,
        gapRatio,
        diameter
    ]);

    const cubeSize = getCubeSize(getSideLength(A, B), gapRatio, cubesInSide);

    return { groupedPoints, cubeSize }
}
