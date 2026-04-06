import { Canvas } from '@react-three/fiber';
import { SpinningCube } from './cube';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react'

export default function App() {
    const cubeRef = useRef()
    
    return (
        <Canvas 
            camera={{ position: [0, 0, 5], fov: 75 }}
            style={{ width: '100vw', height: '100vh' }}
            onPointerUp={() => cubeRef.current?.release()}
        >
            <ambientLight />
            {/* Floating cubes*/}
              {/* <SpinningCube speed={0.02} startX={0} startY={0} />
              <SpinningCube speed={0.02} startX={2} startY={1} />
              <SpinningCube speed={0.015} startX={-2} startY={-1} /> */}
            <SpinningCube ref={cubeRef} />
            <OrbitControls />
        </Canvas>
    );
}