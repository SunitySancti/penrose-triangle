import { forwardRef } from 'react'

import { degToRad,
         arraify } from 'util'
import { cubeRotationY } from 'util/magicNumbers'

import type { Group } from 'three'
import type { CubeViewProps,
              MaterialProps } from 'interfaces/components'


const Material = ({
    type = 'standard',
    color = 'coral',
    checkDepth = false
} : MaterialProps
) => {
    switch(type) {
        case 'standard':
            return (
                <meshStandardMaterial
                    color={ color }
                    roughness={0.5}
                    metalness={0.5}
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
    rotation: [x, y, z] = [0, cubeRotationY, 45],
    isLast = false,
    checkDepth = false,
    material = 'standard',
    color = 'gold',
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
