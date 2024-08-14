import { useRef } from 'react'
import { observer } from "mobx-react-lite"
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import styled from 'styled-components'
import * as THREE from 'three'

import PenroseTriangleView from './view'
import { useCubesData,
         useTriangleRotation } from 'util/hooks'
import { useTriangleConfig } from 'store/triangleConfig'

import { PenroseTriangleProps } from 'interfaces/components'


const PenroseTriangle = ({
	cubesInSide = 5,
	gapRatio = 0.2,
    diameter = 1,
    rotation = 0,
    rotationSpeed = 12,
	// children = null,
}: PenroseTriangleProps ) => {
    const { cubeCenters, cubeSize } = useCubesData({ cubesInSide, gapRatio, diameter });
    const rotationCenterRef = useRef<THREE.Group>(null);
    useTriangleRotation(rotationCenterRef, rotationSpeed);
    
    return (
        <PenroseTriangleView {...{
            cubeCenters,
            cubeSize,
            rotation,
            diameter,
            ref: rotationCenterRef
         }}/>
    )
};

// SCENE CONFIG //

const Container = styled.div`
    color: ${ props => props.theme.palette.textPrimary };
    position: fixed;
    width: 100vw;
    height: 100vh;
`

const Scene = observer((_props: PenroseTriangleProps) => {
    const { cubesInSide,
            gapRatio,
            diameter,
            rotation,
            rotationSpeed } = useTriangleConfig();


    return (
        <Container>
            <Canvas
                orthographic
                camera={{ zoom: 500, position: [0, 0, 100] }}
                style={{ height: '100%', width: '100%' }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[5, 5, 5]} intensity={500} />

                <PenroseTriangle {...{
                    cubesInSide,
                    gapRatio,
                    diameter,
                    rotation,
                    rotationSpeed
                }}/>

                <OrbitControls/>
            </Canvas>
        </Container>
    )
})

export default Scene
