import { useRef, useState, forwardRef, useImperativeHandle} from 'react'
import { useFrame } from '@react-three/fiber'

const colors = ['red', 'lime', 'royalblue', 'orange', 'purple', 'cyan', 'hotpink']
const HOLD_THRESHOLD = 500 // milliseconds

export const SpinningCube = forwardRef(function SpinningCube(props, ref) {
    const meshRef = useRef()
    const [hovered, setHovered] = useState(false)
    const [held, setHeld] = useState(false)
    const [colorIndex, setColorIndex] = useState(0)
    const pressTime = useRef(0)

    // Cube Physics Imporvement: Express a release() function to the parent (App.jsx)
    useImperativeHandle(ref, () => ({
        release() {
            setHeld(false)
        }
    }))

    useFrame(() => {
        if (!held) {
            meshRef.current.rotation.x += 0.01
            meshRef.current.rotation.y += 0.01
        }

        const targetScale = hovered ? 1.5 : 1
        meshRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.05)
    })

    function handlePointerDown() {
        pressTime.current = Date.now()
        setHeld(true)
    }

    function handlePointerUp() {
        const holdDuration = Date.now() - pressTime.current
        setHeld(false)

        if (holdDuration < HOLD_THRESHOLD) {
            setColorIndex((colorIndex + 1) % colors.length)
        }

        
    }

    return (
        <mesh 
            ref={meshRef} 
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            >
            <boxGeometry />
            <meshPhongMaterial color={colors[colorIndex]} />
        </mesh>
    )
})


// useFrame(() => {
    //     meshRef.current.rotation.x += 0.005
    //     meshRef.current.rotation.y += 0.01
    //     meshRef.current.position.x += speed
    //     meshRef.current.position.y += speed * 0.5
        
    //     // Wrap arround when it drifts too far off screen
    //     if (meshRef.current.position.x > 6) meshRef.current.position.x = -6
    //     if (meshRef.current.position.y > 6) meshRef.current.position.y = -6
    // })

    // clock.getElapsedTime() gives you seconds since the app started
            // meshRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.5
            // meshRef.current.position.x = Math.cos(clock.getElapsedTime()) * 0.5