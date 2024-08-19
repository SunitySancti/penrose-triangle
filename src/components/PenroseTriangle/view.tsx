import { forwardRef } from 'react'

import Cube from 'components/Cube'

import { degToRad } from 'util'
import { triangleShiftY } from 'util/magicNumbers'

import type { Group } from 'three'
import type { PenroseTriangleViewProps } from 'interfaces/components'


const PenroseTriangleView = forwardRef<Group, PenroseTriangleViewProps>(({
    cubeCenters,
    cubeSize,
    diameter = 1,
    rotation = 0,
    isInverted = false
},  ref
) => (
    <group
        ref={ ref }
        rotation={[ 0, 0, -degToRad(rotation) ]}
    >
        <group position={[ 0, triangleShiftY * diameter, 0 ]}>

            { cubeCenters.map((line, lineIdx) => line.map(({ x, y }, idx) => {
                const totalLength = line.length * cubeCenters.length;
                const idxInTotal = (lineIdx * line.length) + idx;
                return (
                    <Cube
                        key={ 'cube_' + idxInTotal }
                        order={ idxInTotal + 1 }
                        size={ cubeSize }
                        coords={[ x, y ]}
                        isLast={ idxInTotal === totalLength - 1 }
                        isInverted={ isInverted }
                        // material='standard'
                        // isRotating
                    />
                )
            }))}

        </group>
    </group>
));

export default PenroseTriangleView
