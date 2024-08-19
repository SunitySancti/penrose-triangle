import { useRef } from 'react'
import { observer } from "mobx-react-lite"
import { Canvas } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import * as THREE from 'three'

import PenroseTriangleView from './view'
import { useCubesData,
         useElementSizes,
         useTriangleRotation } from 'util/hooks'
import { zoomCoefficient } from 'util/magicNumbers'
import { useTriangleConfig } from 'store/triangleConfig'

import { PenroseTriangleProps } from 'interfaces/components'


const PenroseTriangle = ({
	cubesInSide = 5,
	gapRatio = 0.2,
    diameter = 1,
    rotation = 0,
    rotationSpeed = 12,
    isRotating = false,
    isInverted = false
	// children = null,
}: PenroseTriangleProps ) => {
    const { cubeCenters, cubeSize } = useCubesData({ cubesInSide, gapRatio, diameter, isInverted });
    const rotationCenterRef = useRef<THREE.Group>(null);
    useTriangleRotation(rotationSpeed, isRotating);
    
    return (
        <PenroseTriangleView {...{
            cubeCenters,
            cubeSize,
            rotation,
            diameter,
            isInverted,
            ref: rotationCenterRef
         }}/>
    )
};

// SCENE CONFIG //

const Scene = observer(({ parent }: PenroseTriangleProps) => {
    const { cubesInSide,
            gapRatio,
            diameter,
            rotation,
            rotationSpeed,
            isRotating,
            isInverted } = useTriangleConfig();

    const { width, height } = useElementSizes(parent);
    const limiter = Math.min(width, height);

    return (
            <Canvas style={{ height: '100%', width: '100%' }}>

                <OrthographicCamera  
                    makeDefault  
                    zoom={ limiter * zoomCoefficient }  
                    position={[0, 0, 100]}  
                />  

                <ambientLight intensity={0.5} />
                <pointLight position={[5, 5, 5]} intensity={500} />

                <PenroseTriangle {...{
                    cubesInSide,
                    gapRatio,
                    diameter,
                    rotation,
                    rotationSpeed,
                    isRotating,
                    isInverted,
                }}/>
                
            </Canvas>
    )
})

export default Scene
