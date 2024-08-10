import { useRef } from 'react'
import styled from 'styled-components'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

import PenroseTriangleView from './view'
import { useCubesData,
         useTriangleRotation } from 'util/hooks'

import { PenroseTriangleProps } from 'interfaces/components'


const PenroseTriangle = ({
	cubesInSide = 4,
	gapRatio = 0,
    diameter = 6,
    rotation = 0,
    rotationSpeed = 0,
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
    background-color: ${ props => props.theme.palette.bg };
    color: ${ props => props.theme.palette.textPrimary };
    position: fixed;
    width: 100vw;
    height: 100vh;
`

const Scene = (props: PenroseTriangleProps) => {
    return (
        <Container>
            <Canvas
                orthographic
                camera={{ zoom: 100, position: [0, 0, 100]}}
                style={{ height: '100vh', width: '100vw' }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[5, 5, 5]} intensity={500} />

                <PenroseTriangle {...props}/>

                <OrbitControls/>
            </Canvas>
        </Container>
    )
}

export default Scene
