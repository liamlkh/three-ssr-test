import { Canvas } from '@react-three/fiber'
import { Environment, PerspectiveCamera, Stage } from '@react-three/drei'
import { Suspense } from 'react'
import GLTFModel from '../components/gltf-model'
import { useRouter } from 'next/router'
import Model from '@/components/model'

const handleOnLoaded = () => {
  console.log('Model loaded')
  window.status = 'ready'
}

export default function ViewerPage() {
  const router = useRouter()
  const { rot } = router.query
  // if (!model) return <>No model provided</>

  return (
    <Canvas gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }} camera={{ fov: 35 }} shadows>
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[0, 0, 80]} fov={60} zoom={0.9} />
        <ambientLight intensity={0.5} />
        <Model onLoaded={handleOnLoaded} rot={rot ? Number(rot) : undefined}/>
        {/* <mesh rotation={[0, rot ? Number(rot) * Math.PI / 180 : 0, 0]}>
          <boxGeometry args={[10, 10, 10]} />
          <meshStandardMaterial color={'orange'} />
        </mesh> */}
        {/* <GLTFModel model={"/DamagedHelmet.glb"} shadows={true} onLoaded={handleOnLoaded}/> */}
        <Environment preset='warehouse' />
      </Suspense>
    </Canvas>
  )
}
