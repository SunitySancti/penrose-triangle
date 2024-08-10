import { useRef } from 'react'

import CubeView from './view.tsx'

import { useCubeSlicer,
         useCubeRotation } from 'util/hooks'

import type { Mesh, Group } from 'three'


const Cube = ({ isRotating, isLast, ...props }: any) => {
    const groupRef = useRef<Group>(null);
    const cubeRef = useRef<Mesh>(null);
    const ref = useRef({ groupRef, cubeRef });

    const cubeSlicerGeometry = useCubeSlicer(cubeRef, isLast);
    useCubeRotation(groupRef, isRotating);

    return (
        <CubeView {...{
            ...props,
            isRotating,
            isLast,
            cubeSlicerGeometry,
            ref,
        }}/>
    );
};

export default Cube
