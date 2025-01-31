import { useFrame } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';

// import THREE.JS
import React, { useRef } from 'react';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';

export default function MyElement3D() {
  // drei : R3F에서 사용할 수 있는 유용한 컴포넌트들을 모아놓은 라이브러리
  // npm i --save @react-three/drei

  const refMesh = useRef();
  
 
  const model = useGLTF('/models/sartorius.glb');
  
  const navigate = useNavigate();
  function handleMove() {
    navigate('/home');
  }

  useFrame((state, delta) => {
    refMesh.current.rotation.y += delta
  });

  return (
    <>
      <directionalLight position={[0,1,1]} intensity={3} />
      <pointLight position={[-2, 2, -2]} intensity={5} />
      <pointLight position={[2, 2, -2]} intensity={5} />
      <pointLight position={[-2, 2, 2]} intensity={5} />
      <pointLight position={[2, 2, 2]} intensity={5} />
      <ambientLight intensity={1} />

      <OrbitControls />

      <Environment preset="sunset" />



      
      
      <mesh ref={refMesh} rotation-y={45*Math.PI/180}>
        {/* <boxGeometry /> */}
        <primitive scale={0.02} object={model.scene} onClick={handleMove}/>
        <meshStandardMaterial
          visible={false}
          opacity={0.5}
          color={0xFFF100}
          wireframe={true}
        />
      </mesh>

    </>
  )
}
