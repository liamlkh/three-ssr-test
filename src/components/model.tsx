import { useLayoutEffect, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { STLLoader } from 'three-stdlib'

interface ModelProps {
  onLoaded: any,
  rot?: number,
}

export default function Model(props: ModelProps) {
  const { onLoaded, rot } = props;

  useEffect(() => {
    onLoaded();
  }, [onLoaded])

  const upperJaw = useLoader(STLLoader, '/UpperJaw.stl')
  const lowerJaw = useLoader(STLLoader, '/LowerJaw.stl')

  return (
    <group rotation={[0, rot ? Number(rot) * Math.PI / 180 : 0, 0]}>
      <group position={[0, 0, 30]}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <mesh>
            <primitive object={upperJaw}/>
            <meshStandardMaterial color="grey"/>
          </mesh>
          <mesh>
            <primitive object={lowerJaw}/>
            <meshStandardMaterial color="grey"/>
          </mesh>
        </group>
      </group>
    </group>
  );
}
