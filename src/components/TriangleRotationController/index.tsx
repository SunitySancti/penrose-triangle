import { useMemo,
         useState,
         useCallback } from 'react'
import { useDeepCompareMemo } from 'use-deep-compare'
         
import TriangleRotationControllerView from './view.tsx'

import { getDistanceToCenterAndAngleY } from 'util'

import type { MouseEventHandler } from 'react'
import type { TriangleRotationControllerProps } from 'interfaces/components'


const TriangleRotationController = ({
    innerValue = 0,
    outerValue = 0,
    onInnerChange = console.log,
    onOuterChange = console.log,
    outerMaxValue = 1,
    outerMaxAngle = 180,
    styles
} : TriangleRotationControllerProps
) => {
    const hoverDistance = 10;   // Active area around circle in px
    const outerCircle = { cx: 180, cy: 180,
        r: 150,
    }
    const innerCircle = { cx: 180, cy: 180,
        r: 100,
    }
    outerMaxAngle = Math.min(outerMaxAngle, 180);
    const valueCoefficient = outerMaxValue / outerMaxAngle;
    const outerAngle = outerValue / valueCoefficient;
    
    const [ isOuterHovering, setIsOuterHovering ] = useState(false);
    const [ isInnerHovering, setIsInnerHovering ] = useState(false);
    const [ isOuterActive, setIsOuterActive ] = useState(false);
    const [ isInnerActive, setIsInnerActive ] = useState(false);
    
    const styleConfig = useDeepCompareMemo(() => ({
        colors: {
            fill_1: '#EEE',
            fill_2: '##E3E3E3',
            fill_3: '#C5C5C5',
            stroke_1: '#C5C5C5',
            stroke_2: '#000',
            ...styles?.colors || {}
        },
        strokeWidths: {
            thin: 1,
            bold: 3,
            ...styles?.strokeWidths || {}
        }
    }),[ styles ]);

    const geometryConfig = useMemo(() => ({
        outerCircle,
        innerCircle
    }),[])

    const handleMouseMove = useCallback<MouseEventHandler<SVGSVGElement>>((event) => {
        const { distance, positiveAngle, balancedAngle } = getDistanceToCenterAndAngleY(event, outerCircle.cx, outerCircle.cy, outerMaxAngle);

        setIsOuterHovering( distance <= outerCircle.r + hoverDistance
                        &&  distance >= outerCircle.r - hoverDistance
        );

        setIsInnerHovering( distance <= innerCircle.r + hoverDistance
                        &&  distance >= innerCircle.r - hoverDistance
        );
   
        if(isOuterActive) {
            onOuterChange(balancedAngle * valueCoefficient);
        }
   
        if(isInnerActive) {
            onInnerChange(positiveAngle);
        }
    },[ getDistanceToCenterAndAngleY,
        setIsOuterHovering,
        setIsInnerHovering,
        onOuterChange,
        onInnerChange,
        isOuterActive,
        isInnerActive,
        outerCircle.cx,
        outerCircle.cy,
        outerMaxAngle,
        valueCoefficient
    ]);

    const handleMouseDown = useCallback<MouseEventHandler<SVGSVGElement>>((event) => {
        if(isOuterHovering) {
            const { balancedAngle } = getDistanceToCenterAndAngleY(event, outerCircle.cx, outerCircle.cy, outerMaxAngle);
            onOuterChange(balancedAngle * valueCoefficient);
            setIsOuterActive(true);
        }
        if(isInnerHovering) {
            const { positiveAngle } = getDistanceToCenterAndAngleY(event, innerCircle.cx, innerCircle.cy);
            onInnerChange(positiveAngle);
            setIsInnerActive(true);
        }
    },[ getDistanceToCenterAndAngleY,
        setIsOuterActive,
        setIsInnerActive,
        onOuterChange,
        onInnerChange,
        isOuterHovering,
        isInnerHovering,
        outerCircle.cx,
        outerCircle.cy,
        innerCircle.cx,
        innerCircle.cy,
        outerMaxAngle,
        valueCoefficient,
    ]);

    const cleanUp = useCallback(() => {
        setIsOuterActive(false);
        setIsInnerActive(false);
    },[ setIsOuterActive,
        setIsInnerActive
    ]);


    return (
        <TriangleRotationControllerView {...{
            handleMouseMove,
            handleMouseDown,
            cleanUp,
            isHovering: isOuterHovering || isInnerHovering,
            innerAngle: innerValue,
            outerAngle,
            styleConfig,
            geometryConfig,
        }}/>
    );
};

export default TriangleRotationController;