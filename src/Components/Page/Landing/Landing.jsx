import React from 'react';
import { Canvas } from '@react-three/fiber'
// import Style css
import "./Landing.css";
import MyElement3D from '../../Threejs/MyElement3D';

// import IMAGE
// import image01 from '../../../Sources/image_logo/Background_photo_01.png';

export default function Landing() {


  return (
    <div className='Landing_Container'>
      <Canvas className='Landing_Container_Box' 
        camera={{
          near: 1,
          far: 100,
          position: [7, 0, 7]
        }}>
        <MyElement3D />
        
        {/* 아래는 Canvas상에서 HTML 을 표현할 수 있다. */}
        {/* <Html position={[-1.2, -2, 0]}>
          <div style={{
            width: '300px',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            background: 'black',
            padding: '5px',
            borderRadius: '5px',
            fontWeight: '500',
          }}>
          BioProducts에 오신것을 환영해요!😜
          </div>
        </Html> */}

      </Canvas>

    </div>
  )
}