import { forwardRef } from 'react'

import Cube from 'components/Cube'

import { degToRad } from 'util'

import type { Group } from 'three'
import type { PenroseTriangleViewProps } from 'interfaces/components'


const PenroseTriangleView = forwardRef<Group, PenroseTriangleViewProps>(({
    cubeCenters,
    cubeSize,
    diameter = 6,
    rotation = 0,
} , ref
) => (
    <group
        ref={ ref }
        rotation={[ 0, 0, -degToRad(rotation) ]}
    >
        <group position={[ 0, (0.75 * diameter / 6), 0 ]}>

            { cubeCenters.map((line, lineIdx) => line.map((point, idx) => (
                <Cube
                    key={ idx }
                    coords={[ point.x, point.y ]}
                    size={ cubeSize }
                    rotation={[ 0, 55, 45 ]}
                    isLast={ (idx === line.length - 1)
                            && (lineIdx === cubeCenters.length - 1)
                    }
                    // isRotating
                />
            )))}

        </group>
    </group>
));

export default PenroseTriangleView
