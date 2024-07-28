import PenroseTriangleView from './view'
import { getCubesCenters } from 'util'


const PenroseTriangle = (_props: any) => {
    const groupedPoints = getCubesCenters({
        size: 6,
        cubesInLine: 4,
    });
    
    return (
        <PenroseTriangleView {...{ groupedPoints }}/>
    )
};

export default PenroseTriangle
