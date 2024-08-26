import { memo } from 'react'
import { Canvas,
         useFrame } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'

import PenroseTriangleView from './view'
import { useCubesData,
         useElementSizes } from '../util/hooks'
import { zoomCoefficient } from '../util/magicNumbers'

import { SceneProps,
         PenroseTriangleModelProps,
        //  PenroseTriangleProps 
        } from '../types'


const PenroseTriangle = memo(({
    rotate,
	cubesInSide = 5,
	gapRatio = 0.2,
    diameter = 1,
    rotation = 0,
    rotationSpeed = 12,
    isRotating = false,
    isInverted = false,
    color,
}: PenroseTriangleModelProps
) => {
    const { cubeCenters, cubeSize } = useCubesData({ cubesInSide, gapRatio, diameter, isInverted });

    useFrame((_state, delta) => {
        if(isRotating && rotationSpeed) {
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
            color
         }}/>
    )
});

const Scene = ({
    parentRef,
    lightPosition: [x, y, z] = [5, 5, 5],
    lightIntensity = 10,
    brightness = 50,
    lightBinding,
    ...config
}: SceneProps
) => {
    const { width, height } = useElementSizes(parentRef);
    const zoom = Math.min(width, height) * zoomCoefficient;

    return (
        <Canvas style={{ height: '100%', width: '100%' }}>

            <OrthographicCamera  
                makeDefault  
                zoom={ zoom }  
                position={[0, 0, 100]}  
            />  

            <ambientLight intensity={ brightness } />
            <directionalLight
                position={[ x, y, z ]}
                intensity={ lightIntensity }
            />

            <PenroseTriangle {...config }/>
            
        </Canvas>
    )
}

// const MemoLayer = (props: PenroseTriangleProps) => {
//     return <Scene {...props }/>
// }

export default Scene
