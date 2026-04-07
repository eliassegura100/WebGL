import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { mx_fractal_noise_float } from 'three/src/nodes/TSL.js'

const START_Z = 2000
const END_Z = 5
const SPEED = 0.02

export function CameraIntro() {
    const { camera } = useThree()
    const done = useRef(false)
        camera.position.z = START_Z

        useFrame(() => {
            if (done.current) return

            camera.position.z += (END_Z - camera.position.z) * SPEED

            if (Math.abs(camera.position.z - END_Z) < 0.1) {
                camera.position.z = END_Z
                done.current = true
            }
        })

        return null
}