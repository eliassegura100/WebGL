import { useRef, useState, forwardRef, useImperativeHandle} from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { Edges } from '@react-three/drei'

const vertexShader = `
    precision mediump float;

    void main() {
    vec4 pos = vec4(position, 1.0);
        gl_Position = projectionMatrix * modelViewMatrix * pos;
    }
`

const fragmentShader = `
    uniform float time;

    void main() {
        // Math.sin creates a value between -1 and 1 over time, which is perfect for creating a smooth color transition.
        // * 0.5 + 0.5 shifts it to between 0 an 1, which is what we need for RGB colors
        float r = sin(time) * 0.5 + 0.5;
        float g = sin(time + 2.0) * 0.5 + 0.5;
        float b = sin(time + 4.0) * 0.5 + 0.5;
        gl_FragColor = vec4(r, g, b, 1.0);
    }
`
const colors = ['red', 'lime', 'royalblue', 'orange', 'purple', 'cyan', 'hotpink']
const HOLD_THRESHOLD = 200 // milliseconds

export const SpinningCube = forwardRef(function SpinningCube(props, ref) {
    const meshRef = useRef()
    const [hovered, setHovered] = useState(false)
    const [held, setHeld] = useState(false)
    const [colorIndex, setColorIndex] = useState(0)
    const pressTime = useRef(0)
    const holdTimeout = useRef(0)
    const texture = useTexture('/senior.jpg')
    const shaderRef = useRef(0)


    // Cube Physics Imporvement: Express a release() function to the parent (App.jsx)
    useImperativeHandle(ref, () => ({
        release() {
            clearTimeout(holdTimeout.current)
            setHeld(false)
        }
    }))

    useFrame(({ clock }) => {
        if (!held) {
            meshRef.current.rotation.x += 0.01
            meshRef.current.rotation.y += 0.01
        }

        if (shaderRef.current) {
            shaderRef.current.uniforms.time.value = clock.getElapsedTime()
        }

        const targetScale = hovered ? 1.5 : 1
        meshRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.05)
    })

    function handlePointerDown() {
        pressTime.current = Date.now()
        holdTimeout.current = setTimeout(() => {
            setHeld(true)
        }, HOLD_THRESHOLD)
    }

    function handlePointerUp() {
        const holdDuration = Date.now() - pressTime.current
        clearTimeout(holdTimeout.current)
        setHeld(false)

        // if (holdDuration < HOLD_THRESHOLD) {
        //     setColorIndex((colorIndex + 1) % colors.length)
        // }
    }

    function handlePointerOut() {
        // Cancel hold if mouse leaves the cube while dragging
        clearTimeout(holdTimeout.current)
        setHeld(false)
        setHovered(false)
    }

    return (
        <mesh 
            ref={meshRef} 
            onPointerOver={() => setHovered(true)}
            onPointerOut={handlePointerOut}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            >
            {/* args: [width, height, depth, widthSegments, heightSegments, depthSegments] */}
            {/* <boxGeometry args={[1, 1, 1, 10, 10, 10]} /> */}
            <boxGeometry />
            <shaderMaterial
                ref={shaderRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={{ time: { value: 0} }}
            />
            
            <Edges color="black" lineWidth={2}/>

            {/* <meshStandardMaterial 
                    map={texture}
                    // color={colors[colorIndex]} 
                    roughness={0.2} 
                    metalness={0.3} 
                /> */}
        </mesh>
    )
})

// Previous useFrame code for floating cubes example
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

// --------------------------------------------------------------------
    // const texture = useTexture('/senior.jpg')
    // Put default-avatar.png in the public folder since Drei expects a URL string at runtime
        // putting the image in assets would have Vite process the file, hash the filename, and bundle it in a way that Drei's useTexture can't handle
        // If you want to import the image and place it in the assets folder, you would have to implement this:
            // import defaultAvatar from './assets/default-avatar.png'
            // const texture = useTexture(defaultAvatar)