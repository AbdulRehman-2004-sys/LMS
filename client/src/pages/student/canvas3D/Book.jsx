import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'

useGLTF.preload("/medieval_fantasy_book.glb")
const Book = () => {
    const { scene, animations } = useGLTF("/medieval_fantasy_book.glb")
    const group = useRef();

    // const { camera } = useThree();

    // Adjust the camera position and rotation
    // const { cameraPosition, cameraRotation } = useControls({
    //     cameraPosition: {
    //         value: { x: 14, y: 10, z: 20 },
    //         step: 0.05,
    //     },
    //     cameraRotation: {
    //         value: { x: 0, y: 0, z: 0 },
    //         step: 0.05,
    //     }
    // })

    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        if (actions["The Life"]) {
            actions["The Life"].play();
            actions["The Life"].setEffectiveTimeScale(1); // normal speed
            actions["The Life"].setEffectiveWeight(1); // full influence
        }
    }, [actions]);


    //  useFrame(() => {
    //     camera.position.x = cameraPosition.x
    //     camera.position.y = cameraPosition.y
    //     camera.position.z = cameraPosition.z

    //     camera.rotation.x = cameraRotation.x;
    //     camera.rotation.y = cameraRotation.y;
    //     camera.rotation.z = cameraRotation.z;
    // });

    return (
        <group>
            <mesh
                position={[0, 5, -4]}
            >
                <primitive ref={group} object={scene} />
            </mesh>

        </group>
    )
}

export default Book
