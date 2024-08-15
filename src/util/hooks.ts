import { useMemo,
         useState,
         useEffect, 
         useCallback } from 'react'
import { Vector2 } from 'three'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

import { getPointsBetween,
         getCubeSize,
         getSideLength,
         degPerSecond } from 'util'

import type { RefObject } from 'react'
import type { Group } from 'three'
import type { Vertices,
              CubesDataParams } from 'interfaces/util'


export const useCubesData = ({
    cubesInSide,
    gapRatio,       // gap size expressed in cube lengths
    diameter,       // triangle circumcircle's diameter
} : CubesDataParams
) => {
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

    const cubeCenters = useMemo(() => [
        [ A, ...betweenAB ],
        [ B, ...betweenBC ],
        [ C, ...betweenCA ],
    ],[ cubesInSide,
        gapRatio,
        diameter
    ]);

    const cubeSize = getCubeSize(getSideLength(A, B), gapRatio, cubesInSide);

    return { cubeCenters, cubeSize }
}

export const useCubeGeometry = (size: number, shouldSlice = false) => {
    return useMemo(() => {
        const boxGeometry = new THREE.BoxGeometry(size, size, size);

        if(shouldSlice) {
            const indices = [...(boxGeometry.index?.array || [])];
            const triangles: number[][] = [];
    
            while(indices?.length) {
                const triangle = indices.splice(0,3);
                triangles.push(triangle)
            }
            // here define indices of triangles of mesh should be removed into slice:
            const sliceMeshTrianglesIndices = [ 3, 8, 9 ];
            
            const mainMeshTriangles = triangles.filter((_triangle, idx) => !sliceMeshTrianglesIndices.includes(idx));
    
            const sliceMeshIndices: number[] = [];
            const mainMeshIndices: number[] = [];
    
            sliceMeshTrianglesIndices.forEach(idx => {
                sliceMeshIndices.push(...triangles[idx])
            });
            mainMeshTriangles.forEach(triangle => {
                mainMeshIndices.push(...triangle)
            });
    
            const slice = boxGeometry.clone().setIndex(sliceMeshIndices);
            const main = boxGeometry.clone().setIndex(mainMeshIndices);
    
            return [slice, main]
        } else {
            return boxGeometry
        }
    },[ size, shouldSlice ]);
}

export const useElementSizes = (ref?: RefObject<HTMLElement> | undefined) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const setWindowSizes = useCallback(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight)
    },[])

    useEffect(() => {
        if(ref) {
            const { current } = ref;
            if(current) {
                const resizeObserver = new ResizeObserver(() => {
                    setWidth(current.offsetWidth);
                    setHeight(window.innerHeight)
                });
                resizeObserver.observe(current);

                return () => {
                    resizeObserver.disconnect();
                }
            } else {
                window.addEventListener('resize', () => setWindowSizes);

                return () => {
                    window.removeEventListener('resize', () => setWindowSizes)
                }
            }
        }
        
    },[ ref, ref?.current ]);

    return { width, height }
}

export const useTriangleRotation = (
    ref: RefObject<Group>,
    degreesPerSecond: number,
) => {
    useFrame((_state, delta) => {
        if(ref.current) {
            ref.current.rotation.z -= degPerSecond(degreesPerSecond, delta);
        }
    });
}

export const useCubeRotation = (
    ref: RefObject<Group>,
    isRotating = false,
) => {
    useFrame((_state, delta) => {
        const { current } = ref || {};
        if(isRotating && current) {
            current.rotation.x += delta;
            current.rotation.y += delta;
        }
    });
}
