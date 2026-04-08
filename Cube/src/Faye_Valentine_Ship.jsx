import { use, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'


export function Faye_Valentine_Ship() {
    const shipRef = useRef()
    const { scene } = useGLTF('/faye_valentines_redwing.glb')

    useFrame(({ clock }) => {
        // shipRef.current.rotation.y += 0.01
        const t = clock.getElapsedTime()
        
        // Base orientation offset + gentle animation layered on top
        // Adjust the Math.PI values to change which direction the ship faces
        shipRef.current.rotation.y = Math.PI / 2 + Math.sin(t * 0.8) * 0.08
        shipRef.current.rotation.x = 0 + Math.sin(t * 0.1) * 0.2
        shipRef.current.rotation.z = 0 + Math.sin(t * 0.5) * 0.15

        // Bobbing up and down
        shipRef.current.position.y = Math.sin(t * 0.8) * 0.3

        // Slight left and right drift
        shipRef.current.position.x = Math.sin(t * 0.5) * 0.2
    })

    return (
        <primitive
            ref={shipRef}
            object={scene}
            scale={0.4}
            position={[0, 0, 1]}
        />
    )
}
