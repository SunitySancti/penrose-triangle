import { useMemo,
         useState,
         useEffect, 
         useCallback} from 'react'
import { useDeepCompareEffect } from 'use-deep-compare'
import { Vector2,
         Vector3 } from 'three'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

import { getPointsBetween,
         getCubeSize,
         getSideLength,
         degPerSecond } from 'util'

import type { RefObject } from 'react'
import type { Vertices } from 'interfaces/util'
import type { Mesh,
              Group } from 'three'


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

    const cubeCenters = useMemo(() => [
        [ A, ...betweenAB ],
        [ B, ...betweenBC ],
        [ C, ...betweenCA ],
    ],[
        cubesInSide,
        gapRatio,
        diameter
    ]);

    const cubeSize = getCubeSize(getSideLength(A, B), gapRatio, cubesInSide);

    return { cubeCenters, cubeSize }
}

export const useCubeSlicer = (cubeRef: RefObject<Mesh>, shouldRun: boolean) => {
    const [ geometry, setGeometry ] = useState<
        THREE.BufferGeometry<THREE.NormalBufferAttributes> | undefined
    >(undefined);
    
    useDeepCompareEffect(() => {
        const positionAttribute = cubeRef?.current?.geometry.attributes.position;
        const matrixWorld = cubeRef?.current?.matrixWorld;

        if(positionAttribute && matrixWorld && shouldRun) {
            const vertices = [];
      
            for (let i = 0; i < 8; i++) {
                const vector = new Vector3();
                vector.fromBufferAttribute(positionAttribute, i);
                vector.applyMatrix4(matrixWorld);
                vertices.push(vector);
            }
            const [ C, , , B, , D, A ] = vertices;
            const sectionPlane = [ A, B, C, D ]; 
            console.log({sectionPlane})

            if(A && B && D) {
                const vec1 = new Vector3().subVectors(B, A);
                const vec2 = new Vector3().subVectors(D, A);
                const normal = new Vector3().crossVectors(vec1, vec2).normalize();

                const vertices: number[] = []; 
                const uvs: number[] = [];

                // Calculating Lower Face vertices
                sectionPlane.forEach(({ x, y, z }: Vector3, idx: number) => {
                    vertices.push(x, y, z);
                    uvs.push(idx % 2, Math.floor(idx / 2))
                });
            
                // Upper Face vertices                
                const height = sectionPlane[0].distanceTo(sectionPlane[1]);
                const upperPoints = sectionPlane && normal
                    ? sectionPlane.map((point: Vector3) => {
                        return new Vector3().addVectors(point, normal.clone().multiplyScalar(height))
                    })
                    : []
        
                upperPoints.forEach(({ x, y, z }: Vector3, idx: number) => {
                    vertices.push(x, y, z);
                    uvs.push(idx % 2, Math.floor(idx / 2) + 1)
                });
        
                const indices = [  
                    0, 1, 2, 2, 3, 0, // Lower Face 
                    4, 5, 6, 6, 7, 4, // Upper Face
                    0, 1, 5, 5, 4, 0, // Sides
                    1, 2, 6, 6, 5, 1,  
                    2, 3, 7, 7, 6, 2,  
                    3, 0, 4, 4, 7, 3,  
                ];
        
                const result = new THREE.BufferGeometry();  
                result.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));  
                result.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2)); // Добавляем UV координаты  
                result.setIndex(indices);  
                result.computeVertexNormals(); // Рассчитываем нормали для освещения
        
                setGeometry(result)
            }
        } 
    },[
        cubeRef
    ]);

    return geometry
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
    isRotating: boolean,
) => {
    useFrame((_state, delta) => {
        const { current } = ref || {};
        if(isRotating && current) {
            current.rotation.x += delta;
            current.rotation.y += delta;
        }
    });
}
