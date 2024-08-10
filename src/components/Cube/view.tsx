import { forwardRef } from 'react'
import { Geometry,
         Base,
         Intersection } from '@react-three/csg'

import { degToRad } from 'util'

import type { MutableRefObject } from 'react'
import type { CubeViewProps,
              CubeForwardedRefs } from 'interfaces/components'


const CubeView = forwardRef<CubeForwardedRefs, CubeViewProps>(({
    coords = [0, 0],
    size = 1,
    rotation: rotationDegrees = [0, 55, 45],
    isRotating = false,
    zIndex = 0,
    isLast = false,
    isAbove = false,
    material = 'normal',
    cubeSlicerGeometry
} , ref
) => {
    const { groupRef, cubeRef } = (ref as MutableRefObject<CubeForwardedRefs | null>)?.current || {};
    const [ x, y, z ] = rotationDegrees;

    const Material = () => {
        const depthWrite = isRotating ? true : isAbove;
        switch(material) {
            case 'standard':
                return (
                    <meshStandardMaterial
                        color="lime"
                        roughness={0.5}
                        metalness={0.5}
                        depthWrite={ depthWrite }
                    />
                )
            case 'normal':
            default:
                return <meshNormalMaterial depthWrite={ depthWrite }/>
        }
    }

    return (
        <>
            <group
                ref={ groupRef }
                position={[ ...coords, zIndex ]}
                rotation={ [degToRad(x), degToRad(y), degToRad(z) ] }
            >
                
                <mesh
                    ref={ cubeRef }
                    renderOrder={ isLast ? 0 : 1 }
                >
                    <boxGeometry args={[ size, size, size ]}/>
                    <Material/>
                </mesh>

                { cubeSlicerGeometry &&

                    <mesh renderOrder={ 1 }>
                        <Material/>
                        <Geometry>
                            <Base>
                                <boxGeometry args={[ size, size, size ]}/>
                            </Base>
                            <Intersection geometry={ cubeSlicerGeometry }/>
                        </Geometry>
                    </mesh>
                }
            </group>
        </>
    )
})

export default CubeView
