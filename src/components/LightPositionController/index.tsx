import { useMemo,
         useState,
         useCallback } from 'react'
         
import LightPositionControllerView from './view.tsx'

import { getDistanceToCenterAndAngleY } from 'util'

import type { MouseEventHandler } from 'react'
import type { LightPositionControllerProps } from 'interfaces/components'


const LightPositionController = ({
    innerValue = 0,
    outerValue = 0,
    onOuterChange = console.log,
    styles
} : LightPositionControllerProps
) => {
    const hoverDistance = 10;   // Active area around circle in px
    const outerCircle = { cx: 180, cy: 180,
        r: 150,
    }
    const innerCircle = { cx: 180, cy: 180,
        r: 100,
    }
    
    const [ isOuterHovering, setIsOuterHovering ] = useState(false);
    const [ isOuterActive, setIsOuterActive ] = useState(false);

    const geometryConfig = useMemo(() => ({
        outerCircle,
        innerCircle
    }),[])

    const handleMouseMove = useCallback<MouseEventHandler<SVGSVGElement>>((event) => {
        const { distance, positiveAngle } = getDistanceToCenterAndAngleY(event, outerCircle.cx, outerCircle.cy);

        setIsOuterHovering( distance <= outerCircle.r + hoverDistance
                        &&  distance >= outerCircle.r - hoverDistance
        );
   
        if(isOuterActive) {
            onOuterChange(positiveAngle);
        }
   
    },[ getDistanceToCenterAndAngleY,
        setIsOuterHovering,
        onOuterChange,
        isOuterActive,
        outerCircle.cx,
        outerCircle.cy,
    ]);

    const handleMouseDown = useCallback<MouseEventHandler<SVGSVGElement>>((event) => {
        if(isOuterHovering) {
            const { positiveAngle } = getDistanceToCenterAndAngleY(event, outerCircle.cx, outerCircle.cy);
            onOuterChange(positiveAngle);
            setIsOuterActive(true);
        }
    },[ getDistanceToCenterAndAngleY,
        setIsOuterActive,
        onOuterChange,
        isOuterHovering,
        outerCircle.cx,
        outerCircle.cy,
    ]);

    const cleanUp = useCallback(() => {
        setIsOuterActive(false);
    },[ setIsOuterActive ]);


    return (
        <LightPositionControllerView {...{
            handleMouseMove,
            handleMouseDown,
            cleanUp,
            isHovering: isOuterHovering,
            innerAngle: innerValue,
            outerAngle: outerValue,
            styleConfig: styles,
            geometryConfig,
        }}/>
    );
};

export default LightPositionController
