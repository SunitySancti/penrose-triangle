import { useRef } from 'react'

import CubeView from './view.tsx'

import { useCubeGeometry,
         useCubeRotation } from 'util/hooks'
import { cubeRotationY } from 'util/magicNumbers'

import type { Group } from 'three'
import type { CubeModelProps } from 'interfaces/components'


const Cube = ({
    isLast,
    size = 1,
    rotation,
    isRotating,
    isInverted,
    checkDepth,
    ...props
}: CubeModelProps
) => {
    const groupRef = useRef<Group>(null);
    const cubeSlicedGeometry = useCubeGeometry(size, !isRotating && isLast, isInverted);
    useCubeRotation(groupRef, isRotating);

    return (
        <CubeView {...{
            ...props,
            geometry: cubeSlicedGeometry,
            isLast,
            rotation: [0, isInverted ? -cubeRotationY : cubeRotationY, 45],
            checkDepth: checkDepth || isRotating,
            ref: groupRef,
        }}/>
    );
};

export default Cube
