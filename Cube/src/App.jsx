import { Canvas } from '@react-three/fiber';
import { SpinningCube } from './cube';
import { OrbitControls } from '@react-three/drei';
import { Starfield } from './stars';
import { CameraIntro } from './CameraIntro';
import { useRef } from 'react'
import { Faye_Valentine_Ship } from './Faye_Valentine_Ship';

export default function App() {
    const cubeRef = useRef()
    
    return (
        <Canvas 
            camera={{ position: [10, 10, 10], fov: 80 }}
            style={{ width: '100vw', height: '100vh' }}
            onPointerUp={() => cubeRef.current?.release()}
        >
            <color attach="background" args={['#000010']} />
            <ambientLight intensity={0.5}/>
            <directionalLight position={[2, 5, -3]} intensity={3} />
            {/* <pointLight position={[-5, -5, -5]} intensity={0.5} /> */}
            <Starfield spread={1000} />
            <Starfield spread={1000} />
            {/* <SpinningCube ref={cubeRef} /> */}
            <Faye_Valentine_Ship />
            {/* <CameraIntro /> */}
            <OrbitControls />
        </Canvas>
    );
}

{/* Floating cubes*/}
              {/* <SpinningCube speed={0.02} startX={0} startY={0} />
              <SpinningCube speed={0.02} startX={2} startY={1} />
              <SpinningCube speed={0.015} startX={-2} startY={-1} /> */}