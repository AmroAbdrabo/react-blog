import * as THREE from "three";
import React, { useRef, Suspense } from "react";
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import { shaderMaterial,  OrbitControls } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";
import "./../styling/startscreen.scss";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart, FaBiking, FaMicroblog, FaYoutube, FaMusic } from 'react-icons/fa';
//import "./../styling/sidebar.css";

import useScript from './../components/hooks/useScript';

const WaveShaderMaterial = shaderMaterial(
  // Uniform
  {
    uTime: 0,
    uColor: new THREE.Color(0.0, 0.0, 0.0),
    uTexture: new THREE.Texture()
  },
  // Vertex Shader
  glsl`
  precision mediump float;
  varying vec2 vUv;
  uniform float uTime;

  void main() {
    vUv = uv;

    vec3 pos = position;
    float noiseFreq = 15.5;
    float noiseAmp = 0.15; 
    vec3 noisePos = vec3(sqrt(pos.x * pos.x + pos.y * pos.y ) * 10.0 - 3.1 * uTime, pos.y, pos.z);
    pos.z += sin(noisePos.x) * noiseAmp;
    //pos.x += sin(sqrt(noisePos.x*noisePos.x + noisePos.y*noisePos.y)) * noiseAmp;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
    //console.log(pos.x);
  }
  `,
  // Fragment Shader
  glsl`
    precision mediump float;

    varying vec2 vUv;

    void main() {
      gl_FragColor = vec4(0.1, 0.2, 1., 1.);
    }
  `
);

extend({ WaveShaderMaterial });

const Wave = () => {
  const ref = useRef();
  useFrame(({ clock }) => (ref.current.uTime = clock.getElapsedTime()));

  

  return (
    <mesh scale={[1, 1, 1]}>
      <planeBufferGeometry args={[3.8, 3.8, 40, 40]} />
      <waveShaderMaterial uColor={"hotpink"} ref={ref} wireframe />
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas  camera={{ fov: 20, position: [0, 8.4, 4.2] }}>
      <OrbitControls target={[0.0, 0.0, -0.4]}/>
      <Suspense fallback={null}>
        <Wave />
      </Suspense>
    </Canvas>
  );
};


const content = [
    {
      icon: 'icon-class-name',
      label: 'Label of Item',
      to: 'a-route-path',
    },
    {
      icon: 'icon-class-name',
      label: 'Second Item',
      content: [
        {
          icon: 'icon-class-name',
          label: 'Sub Menu of Second Item',
          to: 'another-route-path',
        },
      ],
    },
  ];





  const Start = () => {
    const locStyle = {
        styles : {
            fontFamily:'"Avenir", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
        }
    };
    
    //useScript('./drop.js');
    return (
      
      <>
           {/* <div className= "sidenav">
      <a href="#about">About</a>
      <a href="#services">Services</a>
      <a href="#clients">Clients</a>
      <a href="#contact">Contact</a>
      <button className="dropdownbtn">Drdown 
        <i class="fa fa-caret-down"></i>
      </button>
      <div className = "dropdowncontainer">
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
      </div>
    <a href="#contact">Search</a>
  </div> */}
  <div style={{display: "flex", background:'black' ,height: '100%', justifyContent: 'start'}}>
    <div >
  <ProSidebar  collapsed = {false}>
  <Menu iconShape="square">
    <MenuItem style = {locStyle.styles} icon={<FaBiking />}>About me</MenuItem>
    <SubMenu title="Blogs" icon={<FaMicroblog />}  style = {locStyle.styles}>
        <MenuItem style = {locStyle.styles}>Cyber Security</MenuItem>
        <MenuItem style = {locStyle.styles}>Machine Learning</MenuItem>
        <MenuItem style = {locStyle.styles}>Algorithmicity</MenuItem>
    </SubMenu>
    
    <MenuItem style = {locStyle.styles} icon={<FaGithub />} >GitHub</MenuItem>
    <MenuItem icon={<FaYoutube />} style = {locStyle.styles} >YouTube</MenuItem>
    
    <MenuItem style = {locStyle.styles} icon={<FaMusic />} >Music</MenuItem>
  </Menu>
</ProSidebar>
</div>
<div  style = {{ width: '100%', position:'absolute', textAlign:'center', height: '100%' }}>
        <h1 style = {{margin:'auto', verticalAlign: 'middle', color: 'white', paddingLeft: '50px', paddingRight: '50px'}}>Amro A. </h1>
        <Scene style = {{width: '100%', zIndex: '-1' }}/>
        </div>
        </div>
      </>
    );
  };
  

// class Start extends React.Component {
//     constructor() {
//       super();
//     }
  
//     componentDidMount() {
//       const s = document.createElement('script');
//       s.type = 'text/javascript';
//       s.async = true;
//       s.innerHTML = `var dropdown = document.getElementsByClassName('dropdownbtn'); var i;
      
//       for (i = 0; i < dropdown.length; i++) {
//         dropdown[i].addEventListener("click", function() {
//           this.classList.toggle("active");
//           var dropdownContent = this.nextElementSibling;
//           if (dropdownContent.style.display === "block") {
//             dropdownContent.style.display = "none";
//           } else {
//             dropdownContent.style.display = "block";
//           }
//         });
//       } ";
//       this.instance.appendChild(s);
//     }`;
//     this.instance.appendChild(s);
//     }
  
//     render() {
//         return (
    
//             <>
//             <div className= "sidenav">
//             <a href="#about">About</a>
//             <a href="#services">Services</a>
//             <a href="#clients">Clients</a>
//             <a href="#contact">Contact</a>
//             <button className="dropdownbtn">Drdown 
//               <i class="fa fa-caret-down"></i>
//             </button>
//             <div className = "dropdowncontainer">
//               <a href="#">Link 1</a>
//               <a href="#">Link 2</a>
//               <a href="#">Link 3</a>
//             </div>
//           <a href="#contact">Search</a>
//         </div>
//               <h1>AMRO A.</h1>
//               <Scene />
//             </>
//           );
//     }
//   }

  export default Start;