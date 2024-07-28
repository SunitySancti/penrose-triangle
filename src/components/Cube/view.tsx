import { useRef,
         forwardRef } from 'react'
import { Canvas,
         useFrame } from '@react-three/fiber'
import { TransformControls, OrbitControls } from '@react-three/drei'

import type { Mesh } from 'three'


interface CubeViewProps {

}

const Cube = forwardRef<Mesh, JSX.IntrinsicElements['mesh']>((_props, ref) => (
    <mesh ref={ ref } rotation={[45, 45, 0]}>  
        <boxGeometry args={[1, 1, 1]} />  
        <meshStandardMaterial color="lime" roughness={0.5} metalness={0.5}/>  
    </mesh>
))

function RotatingCube() {
    const meshRef = useRef<Mesh>(null);

    // Automatic cube rotation
    useFrame((_state, delta) => {
        if(meshRef.current) {
            meshRef.current.rotation.x += delta;
            meshRef.current.rotation.y += delta;
        }
    });
  
    return meshRef.current // Manual cube rotation
        ?   <TransformControls
                object={ meshRef.current }
                mode={ 'rotate' }
                children={ <Cube ref={ meshRef }/>}
            />
        :   <Cube ref={ meshRef }/>
}  

const CubeView = ({

} : CubeViewProps
) => {  
    return (
        <Canvas style={{ height: '100vh' }}>  
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={500} />
            {/* POV rotation */}
            <OrbitControls/>

            <RotatingCube/>
        </Canvas>  
    )
};

export default CubeView
