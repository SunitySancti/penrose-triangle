import { observer } from "mobx-react-lite"
import { Canvas,
         useFrame } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'

import PenroseTriangleView from './view'
import { useCubesData,
         useElementSizes } from '../util/hooks'
import { zoomCoefficient } from '../util/magicNumbers'

import { PenroseTriangleProps } from '../types'


const PenroseTriangle = ({
    rotate,
	cubesInSide = 5,
	gapRatio = 0.2,
    diameter = 1,
    rotation = 0,
    rotationSpeed = 12,
    isRotating = false,
    isInverted = false
}: PenroseTriangleProps ) => {
    const { cubeCenters, cubeSize } = useCubesData({ cubesInSide, gapRatio, diameter, isInverted });

    useFrame((_state, delta) => {
        if(isRotating) {
            rotate(rotationSpeed * delta)
        }
    });
    
    return (
        <PenroseTriangleView {...{
            cubeCenters,
            cubeSize,
            rotation,
            diameter,
            isInverted,
         }}/>
    )
};

const Scene = observer(({ parentRef, ...config }: PenroseTriangleProps) => {
    const { width, height } = useElementSizes(parentRef);

    return (
        <Canvas style={{ height: '100%', width: '100%' }}>

            <OrthographicCamera  
                makeDefault  
                zoom={ Math.min(width, height) * zoomCoefficient }  
                position={[0, 0, 100]}  
            />  

            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={500} />

            <PenroseTriangle {...config }/>
            
        </Canvas>
    )
})

export default Scene
