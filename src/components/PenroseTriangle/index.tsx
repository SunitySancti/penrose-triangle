import PenroseTriangleView from './view'
import { useCubesData } from 'util/hooks'

import { PenroseTriangleProps } from 'interfaces/components'


const PenroseTriangle = ({
	cubesInSide = 4,
	gapRatio = 0.5,
    diameter = 6,
	// rotate = 0,
	// children = null,
}: PenroseTriangleProps ) => {
    const { groupedPoints, cubeSize } = useCubesData({ cubesInSide, gapRatio, diameter });
    
    return (
        <PenroseTriangleView {...{ groupedPoints, cubeSize }}/>
    )
};

export default PenroseTriangle
