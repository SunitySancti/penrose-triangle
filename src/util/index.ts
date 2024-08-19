import { Vector2 } from 'three'

import { cubeSizeCoefficient } from 'util/magicNumbers'

import type { MouseEvent } from 'react'


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

export const degreesPerDelta = (degrees: number, delta: number) => (
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

export const getDistanceToCenterAndAngleY = (
    event: MouseEvent<SVGSVGElement>,
    centerX: number,
    centerY: number,
    maxAngle = 180,
) => {
    const svg = (event.target as SVGSVGElement).closest('svg')!;
    const rect = svg.getBoundingClientRect();
    const pointX = rect.x + centerX;
    const pointY = rect.y + centerY;

    const mouseX = event.nativeEvent.clientX;
    const mouseY = event.nativeEvent.clientY;
    
    const dx = mouseX - pointX;
    const dy = mouseY - pointY;
    const distance = Math.sqrt(dx ** 2 + dy ** 2);

    const radians = Math.atan2(mouseY - pointY, mouseX - pointX);
    const degrees = (180 * radians / Math.PI) + 90;

    const positiveAngle = degrees < 0 ? degrees + 360 : degrees;
    const balancedAngle = degrees > 180 ? degrees - 360 : degrees

    return {
        distance,
        positiveAngle: Math.floor(positiveAngle),
        balancedAngle: balancedAngle >= 0
            ?  Math.min(balancedAngle, maxAngle)
            :  Math.max(balancedAngle, -maxAngle)
    }
}
