import { Canvas } from '@react-three/fiber';
import { SpinningCube } from './cube';
import { OrbitControls } from '@react-three/drei';
import { Starfield } from './stars';
import { CameraIntro } from './CameraIntro';
import { useRef } from 'react'

export default function App() {
    const cubeRef = useRef()
    
    return (
        <Canvas 
            camera={{ position: [0, 0, 5], fov: 75 }}
            style={{ width: '100vw', height: '100vh' }}
            onPointerUp={() => cubeRef.current?.release()}
        >
            <color attach="background" args={['#000010']} />
            <ambientLight intensity={0.5}/>
            <directionalLight position={[5, 5, 5]} intensity={0.5} />
            {/* <pointLight position={[-5, -5, -5]} intensity={0.5} /> */}
            <Starfield speed={0.15} spread={100} />
            <Starfield speed={0.05} spread={200} />
            <SpinningCube ref={cubeRef} />
            <CameraIntro />
            <OrbitControls />
        </Canvas>
    );
}

{/* Floating cubes*/}
              {/* <SpinningCube speed={0.02} startX={0} startY={0} />
              <SpinningCube speed={0.02} startX={2} startY={1} />
              <SpinningCube speed={0.015} startX={-2} startY={-1} /> */}