import styled from 'styled-components'
import { Canvas } from '@react-three/fiber'
// import { Vector2, DoubleSide, AxesHelper } from 'three'
// import { TransformControls, OrbitControls } from '@react-three/drei'

import Cube from 'components/Cube'
import type { PenroseTriangleViewProps } from 'interfaces/components'


const Container = styled.div`
    background-color: ${ props => props.theme.palette.bg };
    color: ${ props => props.theme.palette.textPrimary };
    position: fixed;
    width: 100vw;
    height: 100vh;
`

const PenroseTriangleView = ({
    groupedPoints = [[]],
    cubeSize = 1
} : PenroseTriangleViewProps
) => {
    return (
        <Container>
            <Canvas style={{ height: '100vh', width: '100vw' }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[5, 5, 5]} intensity={500} />
                
                { groupedPoints.map(line => line.map((vertex, idx) => (
                    <Cube
                        key={idx}
                        coords={[ vertex.x, vertex.y ]}
                        size={ cubeSize }
                        isRotating
                    />
                )))}
                <Cube
                    coords={[ 0, -0.8 ]}
                    size={ cubeSize }
                    isRotating
                />

                {/* <OrbitControls/> */}
            </Canvas>  
        </Container>
    );
};

export default PenroseTriangleView
