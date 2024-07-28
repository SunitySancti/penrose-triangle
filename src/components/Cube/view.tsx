import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
// import { TransformControls } from '@react-three/drei'

import type { Mesh } from 'three'
import type { CubeViewProps } from 'interfaces/components'



// const Cube = forwardRef<Mesh, JSX.IntrinsicElements['mesh']>((_props, ref) => (
//     <mesh {...{
//         ref,
//         rotation: [45, 45, 0],
//         position: [0, 0, 0]
//     }}>  
//         <boxGeometry args={[1, 1, 1]} />  
//         <meshStandardMaterial color="lime" roughness={0.5} metalness={0.5}/>  
//     </mesh>
// ))

// function RotatingCube() {
//     const meshRef = useRef<Mesh>(null);

//     // Automatic cube rotation
//     useFrame((_state, delta) => {
//         if(meshRef.current) {
//             meshRef.current.rotation.x += delta;
//             meshRef.current.rotation.y += delta;
//         }
//     });
  
//     return meshRef.current // Manual cube rotation
//         ?   <TransformControls
//                 object={ meshRef.current }
//                 mode={ 'rotate' }
//                 children={ <Cube ref={ meshRef }/>}
//             />
//         :   <Cube ref={ meshRef }/>
// }

const CubeView = ({
    coords = [0,0],
    size = 1,
    isRotating = false,
} : CubeViewProps = {}
) => {
    const meshRef = useRef<Mesh>(null);

    useFrame((_state, delta) => {
        if(isRotating && meshRef.current) {
            meshRef.current.rotation.x += delta;
            meshRef.current.rotation.y += delta;
        }
    });

    return (
        <mesh
            ref={ meshRef }
            rotation={[ 45, 45, 0 ]}
            position={[...coords, 0]}
        >  
            <boxGeometry args={[ size, size, size ]} />  
            <meshStandardMaterial color="lime" roughness={0.5} metalness={0.5}/>  
        </mesh>
    )
};

export default CubeView
