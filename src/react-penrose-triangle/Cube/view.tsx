import { forwardRef } from 'react'

import { degToRad,
         arraify } from '../util'

import type { Group } from 'three'
import type { CubeViewProps,
              MaterialProps } from '../types'


const Material = ({
    type = 'standard',
    color = 'gold',
    checkDepth = false
} : MaterialProps
) => {
    switch(type) {
        case 'standard':
            return (
                <meshStandardMaterial
                    color={ color }
                    roughness={ 1 }
                    metalness={ 2 }
                    depthWrite={ checkDepth }
                />
            )
        case 'normal':
        default:
            return (
                <meshNormalMaterial
                    depthWrite={ checkDepth }
                />
            )
    }
}

const CubeView = forwardRef<Group, CubeViewProps>(({
    geometry,
    order = 1,
    coords = [0, 0],
    zIndex = 0,
    rotation: [x, y, z] = [0, 0, 0],
    isLast = false,
    checkDepth,
    material,
    color,
},  ref
) => (
    <group
        ref={ ref }
        position={[ ...coords, zIndex ]}
        rotation={ [degToRad(x), degToRad(y), degToRad(z) ] }
    >
        { arraify(geometry).map((geometry, idx) => (

            <mesh
                key={ 'face-group_' + idx }
                geometry={ geometry }
                renderOrder={ (idx && isLast) ? 0 : order }
            >
                <Material {...{
                    type: material,
                    color,
                    checkDepth
                }}/>
            </mesh>

        ))}
    </group>
));

export default CubeView
