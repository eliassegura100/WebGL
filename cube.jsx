import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export function SpinningCube({ speed = 0.02, startX = 0, startY = 0 }) {
    const meshRef = useRef()

    // useFrame(() => {
    //     meshRef.current.rotation.x += 0.005
    //     meshRef.current.rotation.y += 0.01
    //     meshRef.current.position.x += speed
    //     meshRef.current.position.y += speed * 0.5
        
    //     // Wrap arround when it drifts too far off screen
    //     if (meshRef.current.position.x > 6) meshRef.current.position.x = -6
    //     if (meshRef.current.position.y > 6) meshRef.current.position.y = -6
    // })

    useFrame(({ clock }) => {
        meshRef.current.rotation.x += 0.01
        meshRef.current.rotation.y += 0.01
        // clock.getElapsedTime() gives you seconds since the app started
        meshRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.5
        // meshRef.current.position.x = Math.cos(clock.getElapsedTime()) * 0.5
    })

    return (
        <mesh ref={meshRef} position={[startX, startY, 0]}>
            <boxGeometry />
            <meshPhongMaterial color={"blue"} emissive="purple" />
        </mesh>
    )
}
