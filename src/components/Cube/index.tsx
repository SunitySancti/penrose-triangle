import { useRef } from 'react'

import CubeView from './view.tsx'

import { useCubeGeometry,
         useCubeRotation } from 'util/hooks'

import type { Group } from 'three'


const Cube = ({
    size,
    isLast,
    isRotating,
    ...props
}: any
) => {
    const groupRef = useRef<Group>(null);
    const cubeSlicedGeometry = useCubeGeometry(size, true);
    useCubeRotation(groupRef, isRotating);

    return (
        <CubeView {...{
            ...props,
            geometry: cubeSlicedGeometry,
            isRotating,
            isLast,
            ref: groupRef,
        }}/>
    );
};

export default Cube
