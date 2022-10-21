import * as THREE from "three";
import React, { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import { shaderMaterial,  OrbitControls } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";
import "./../styling/startscreen.scss";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import styles from './../styling/frontpage.module.css'
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart, FaBiking, FaMicroblog, FaYoutube, FaMusic, FaTh } from 'react-icons/fa';
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
    vec3 noisePos = vec3(sqrt(pos.x * pos.x + pos.y * pos.y ) * 10.0 - 1.1 * uTime, pos.y, pos.z);
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


  const Start = () => {

    const h1Style = {
      "h1": {
        fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#fff",
        margin: "0",
        
       
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "1",
        fontWeight: "300",
        letterSpacing: "0.04em",
        whiteSpace: "nowrap"
      }
    };

    const locStyle = {
        styles : {
            fontFamily:'"Avenir", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
        }
    };


    const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
      setWidth(window.innerWidth);
      if (!isMobile){
        setIsCollapsed(true);
      }else {
        setIsCollapsed(false);
      }
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    var isMobile = width <= 768;

    const [isCollapsed, setIsCollapsed] = useState(!isMobile);
    
    function expandSide(e){
        setIsCollapsed(false);
    }
    
    function collapseSide(e){
      if (!isMobile){
        setIsCollapsed(true);
      }else {
        setIsCollapsed(false);
      }
  }
    //useScript('./drop.js');
    return (
      
    <>
    <div style={{display: "flex", background:'black' ,height: '100%', justifyContent: 'start'}}>
    <div >
    <ProSidebar onMouseEnter={expandSide} onMouseLeave={collapseSide}  collapsed = {isCollapsed}>
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
            <h1 style = {{margin:'auto', verticalAlign: 'middle', color: 'white', 
            fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            left: "50%", position: "absolute",  top: "12%", zIndex: "1",
            fontWeight: "50", transform: "translate(-50%, -50%)"}}> Amro A. </h1>
            <Scene style = {{width: '100%', zIndex: '-1' }}/>
    </div>
    
  </div>
  <div className = { `${styles["w3-container"]} ${styles["w3-light-grey"]}`} style={{padding:"128px 16px"}}>
  <div className= {styles["w3-row-padding"]}>
    <div className= { `${styles["w3-col"]}  ${styles["m6"]}`  }>
      <h3>We know design.</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod<br />tempor incididunt ut labore et dolore.</p>
      <p><a href="#work" className = {`${styles["w3-button"]} ${styles["w3-black"]} `} > <FaTh style ={{verticalAlign: "sub"}} /> View Our Works</a></p>
    </div>
    <div className ={ `${styles["w3-col"]}  ${styles["m6"]}`  }>
      <img className = {`${styles["w3-image "]} ${styles["w3-round-large"]}`} src={"/img/phone.jpg"} alt="Buildings" width="700" height="394" />
    </div>
  </div>
</div>
  <div>s</div>
      </>
    );
  };
  

  export default Start;