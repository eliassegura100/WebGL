import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

const STAR_COUNT = 10000

export function Starfield() {
    const meshRef = useRef()

    const positions = useMemo(() => {
        const pos = new Float32Array(STAR_COUNT * 3)
        for (let i = 0; i < STAR_COUNT; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 10000
            pos[i * 3 + 1] = (Math.random() - 0.5) * 1000
            pos[i * 3 + 2] = (Math.random() - 0.5) * 1000
        }
        return pos
    }, [])

    useFrame(() => {
        meshRef.current.position.x -= 3

        if (meshRef.current.position.x < -950) {
            meshRef.current.position.x = 1000
        }
    })

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                color="white"
                size={0.3}
                sizeAttenuation={true}
                transparent={true}
                opacity={0.8}
            />
        </points>
    )
}