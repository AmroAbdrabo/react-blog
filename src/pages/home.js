import * as THREE from "three";
import React, { useRef, Suspense, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import { shaderMaterial,  OrbitControls } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";
import "./../styling/startscreen.scss";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import styles from './../styling/frontpage.module.css'
import flip from './../styling/flipcard.module.css'
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaEnvelope, FaHeart, FaBiking, FaMicroblog, FaYoutube, FaMusic, FaTh } from 'react-icons/fa';
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

    var isMobile = width <= 800;

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
  var imgWidth = "420 px"
  var imgHeight = "350 px"

  // smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
  });


    //useScript('./drop.js');
    return (
      
    <>
    <div style={{display: "flex", background:'black' ,height: '100%', justifyContent: 'start'}}>
    <div >
    <ProSidebar onMouseEnter={expandSide} onClick = {expandSide} onMouseLeave={collapseSide}  collapsed = {isCollapsed}>
    <Menu iconShape="square">
      <MenuItem style = {locStyle.styles} icon={<FaBiking />}> <a href="#aboutMe" style = {{all: "inherit"}}>About me</a> </MenuItem>
      <SubMenu title="Blogs" icon={<FaMicroblog />}  style = {locStyle.styles}>
        <MenuItem style = {locStyle.styles}> <Link to="/blog/security" style = {{fontWeight: "600", fontSize: "medium", fontFamily: `${locStyle["styles"]["fontFamily"]}`}}>Cyber Security </Link> </MenuItem>
        <MenuItem style = {locStyle.styles}> <Link to="/blog/ml" style = {{ fontWeight: "600", fontSize: "medium", fontFamily: `${locStyle["styles"]["fontFamily"]}`}}>Machine Learning </Link>  </MenuItem>
        <MenuItem style = {locStyle.styles}> <Link to="/blog/algo" style = {{ fontWeight: "600", fontSize: "medium", fontFamily: `${locStyle["styles"]["fontFamily"]}`}}>Algorithmicity </Link> </MenuItem>
      </SubMenu>
    
      <MenuItem style = {locStyle.styles} icon={<FaGithub />} > <a
  href="https://github.com/AmroAbdrabo/" style = {{all: "inherit"}}>GitHub</a></MenuItem>
      <MenuItem icon={<FaYoutube />} style = {locStyle.styles} ><a
  href="https://www.youtube.com/channel/UCFFDmwlW2Abn_NXB2MVLQ6Q" style = {{all: "inherit"}}>YouTube</a></MenuItem>    
    
      <MenuItem style = {locStyle.styles} icon={<FaMusic />} >  <a
  href="https://youtu.be/-t-hUSWdwYs" style = {{all: "inherit"}}>Music</a></MenuItem>
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
<div id = "aboutMe" className = { `${styles["w3-container"]} ${styles["w3-light-grey"]}`} style={{padding:"128px 16px"}}>
  <div className= {styles["w3-row-padding"]} style = {{marginLeft: "2vw"}}>
    <div className= { `${styles["w3-col"]}  ${styles["m6"]}`  }>
      <h3>About me</h3>
      <p>As an enthusiastic and motivated Master student in the Computer Science department of ETHZ, <br />I strive to learn more about Machine Learning and Information Security, as well as fields which intertwine both domains. I am a result-oriented coder, a team player who can also work independently. I can program in several programming languages wherein I prioritize code clarity as well as speed.</p>
      <p><a href="mailto:amro.abdrabo@gmail.com" className = {`${styles["w3-button"]} ${styles["w3-black"]} `} > <FaEnvelope style ={{verticalAlign: "sub"}} /> Contact me</a></p>
    </div>
    <div className ={ `${styles["w3-col"]}  ${styles["m6"]}`  }>
      <img className = {`${styles["w3-image "]} ${styles["w3-round-large"]}`} src={"/img/mask22.png"} alt="me" width={ isMobile ? "300 px" : "535 px"} height={ isMobile ? "280 px" : "490 px"} style  = {{marginTop: `${isMobile ? "40px" : "auto"}`,  marginLeft: `${isMobile ? "auto" : "4cm"}` }}/>
    </div>
  </div>
</div>
<h1 style = {{color: "#ffffff", paddingLeft: "3vw", paddingTop: "30px", marginTop: "0",backgroundColor: "black", marginBottom: "0", fontFamily: `${locStyle["styles"]["fontFamily"]}`}}>Projects</h1>
<div className = {flip["flex-container"]} style = {{paddingTop: "50px",   paddingBottom: "150px", backgroundColor: "black", color: "white"}}>
  <div className = {flip["flex-div"]} >
    <div className={flip["flip-card"]}  >
      <div className={flip["flip-card-inner"]} >
        <div className={flip["flip-card-front"]} style = {{backgroundColor: "rgb(24, 49, 83)", borderRadius: "20px", border: "1px solid darkblue", alignItems: "center", justifyContent: "center", paddingTop: "40px"}}>
          <img src={"/img/handfa2.png"} alt="Avatar" style={{display: "inline-block", height:"200px"}} />
        </div>
        <div className={flip["flip-card-back"]}>
          <h1>John Doe</h1> 
          <p>Architect & Engineer</p> 
          <p>We love that guy</p>
        </div>
      </div>
    </div>
  </div>


  <div className = {flip["flex-div"]}>
    <div className={flip["flip-card"]}  >
      <div className={flip["flip-card-inner"]}>
        <div className={flip["flip-card-front"]} style = {{backgroundColor: "rgb(24, 49, 83)", borderRadius: "20px", border: "1px solid darkblue", alignItems: "center", justifyContent: "center", paddingTop: "50px"}}>
          <img src={"/img/robotfa2.png"} alt="Avatar" style={{display: "inline-block", width:"200px", height:"200px"}} />
        </div>
        <div className={flip["flip-card-back"]}>
          <h1>John Doe</h1> 
          <p>Architect & Engineer</p> 
          <p>We love that guy</p>
        </div>
      </div>
    </div>
  </div>



  <div className = {flip["flex-div"]}>
    <div className={flip["flip-card"]}  >
      <div className={flip["flip-card-inner"]}>
        <div className={flip["flip-card-front"]} style = {{backgroundColor: "rgb(24, 49, 83)", borderRadius: "20px", border: "1px solid darkblue", alignItems: "center", justifyContent: "center", paddingTop: "40px"}}>
          <img src={"/img/datafa2.png"} alt="Avatar" style={{display: "inline-block", width:"200px", height:"200px"}} />
        </div>
        <div className={flip["flip-card-back"]}>
          <h1>John Doe</h1> 
          <p>Architect & Engineer</p> 
          <p>We love that guy</p>
        </div>
      </div>
    </div>
  </div>
  
  <div className = {flip["flex-div"]}>
    <div className={flip["flip-card"]}  >
      <div className={flip["flip-card-inner"]}>
        <div className={flip["flip-card-front"]} style = {{backgroundColor: "rgb(24, 49, 83)", borderRadius: "20px", border: "1px solid darkblue", alignItems: "center", justifyContent: "center", paddingTop: "40px"}}>
          <img src={"/img/ethfa.png"} alt="Avatar" style={{display: "inline-block", width:"200px", height:"200px"}} />
        </div>
        <div className={flip["flip-card-back"]}>
          <h1>John Doe</h1> 
          <p>Architect & Engineer</p> 
          <p>We love that guy</p>
        </div>
      </div>
    </div>
  </div>


  <div className = {flip["flex-div"]}>
    <div className={flip["flip-card"]}  >
      <div className={flip["flip-card-inner"]}>
        <div className={flip["flip-card-front"]} style = {{backgroundColor: "rgb(24, 49, 83)", borderRadius: "20px", border: "1px solid darkblue", alignItems: "center", justifyContent: "center", paddingTop: "40px"}}>
          <img src={"/img/brainfa.png"} alt="Avatar" style={{display: "inline-block", width:"200px", height:"200px"}} />
        </div>
        <div className={flip["flip-card-back"]}>
          <h1>John Doe</h1> 
          <p>Architect & Engineer</p> 
          <p>We love that guy</p>
        </div>
      </div>
    </div>
  </div>



  <div className = {flip["flex-div"]}>
    <div className={flip["flip-card"]}  >
      <div className={flip["flip-card-inner"]}>
        <div className={flip["flip-card-front"]} style = {{backgroundColor: "rgb(24, 49, 83)", borderRadius: "20px", border: "1px solid darkblue", alignItems: "center", justifyContent: "center", paddingTop: "40px"}}>
          <img src={"/img/heartfa2.png"} alt="Avatar" style={{display: "inline-block", width:"200px", height:"200px"}} />
        </div>
        <div className={flip["flip-card-back"]}>
          <h1>John Doe</h1> 
          <p>Architect & Engineer</p> 
          <p>We love that guy</p>
        </div>
      </div>
    </div>
  </div>


<div className = {flip["flex-div"]}>
    <div className={flip["flip-card"]}  >
      <div className={flip["flip-card-inner"]}>
        <div className={flip["flip-card-front"]} style = {{backgroundColor: "rgb(24, 49, 83)", borderRadius: "20px", border: "1px solid darkblue", alignItems: "center", justifyContent: "center", paddingTop: "40px"}}>
          <img src={"/img/androidfa.png"} alt="Avatar" style={{display: "inline-block", width:"200px", height:"200px"}} />
        </div>
        <div className={flip["flip-card-back"]}>
          <h1>John Doe</h1> 
          <p>Architect & Engineer</p> 
          <p>We love that guy</p>
        </div>
      </div>
    </div>
  </div>


<div className = {flip["flex-div"]}>
    <div className={flip["flip-card"]}  >
      <div className={flip["flip-card-inner"]}>
        <div className={flip["flip-card-front"]} style = {{backgroundColor: "rgb(24, 49, 83)", borderRadius: "20px", border: "1px solid darkblue", alignItems: "center", justifyContent: "center", paddingTop: "40px"}}>
          <img src={"/img/catfa.png"} alt="Avatar" style={{display: "inline-block", width:"200px", height:"200px"}} />
        </div>
        <div className={flip["flip-card-back"]}>
          <h1>John Doe</h1> 
          <p>Architect & Engineer</p> 
          <p>We love that guy</p>
        </div>
      </div>
    </div>
  </div>

  <div className = {flip["flex-div"]}>
    <div className={flip["flip-card"]}  >
      <div className={flip["flip-card-inner"]}>
        <div className={flip["flip-card-front"]} style = {{backgroundColor: "rgb(24, 49, 83)", borderRadius: "20px", border: "1px solid darkblue", alignItems: "center", justifyContent: "center", paddingTop: "40px"}}>
          <img src={"/img/visfa.png"} alt="Avatar" style={{display: "inline-block", width:"200px", height:"200px"}} />
        </div>
        <div className={flip["flip-card-back"]}>
          <h1>John Doe</h1> 
          <p>Architect & Engineer</p> 
          <p>We love that guy</p>
        </div>
      </div>
    </div>
  </div>


</div>

      </>
    );
  };
  

  export default Start;