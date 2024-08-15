import { useRef } from 'react'

import CubeView from './view.tsx'

import { useCubeGeometry,
         useCubeRotation } from 'util/hooks'

import type { Group } from 'three'
import type { CubeModelProps } from 'interfaces/components'


const Cube = ({
    isLast,
    size = 1,
    isRotating,
    checkDepth,
    ...props
}: CubeModelProps
) => {
    const groupRef = useRef<Group>(null);
    const cubeSlicedGeometry = useCubeGeometry(size, !isRotating && isLast);
    useCubeRotation(groupRef, isRotating);

    return (
        <CubeView {...{
            ...props,
            geometry: cubeSlicedGeometry,
            isLast,
            checkDepth: checkDepth || isRotating,
            ref: groupRef,
        }}/>
    );
};

export default Cube
