import * as THREE from "three";
import SmoothScroll from "./smoothscroll";
import React, { useRef, Suspense, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import { shaderMaterial,  OrbitControls } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";
import "./../styling/startscreen.scss";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import styles from './../styling/frontpage.module.css'
import timeline_style from './../styling/timeline.module.css'
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
      <planeBufferGeometry args={[3.4, 3.4, 40, 40]} />
      <waveShaderMaterial uColor={"hotpink"} ref={ref} wireframe />
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas  camera={{ fov: 20, position: [0, 8.0, 3.2] }}>
      <OrbitControls target={[0.0, 0.0, -0.0]}/>
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

  
    return (
      
    <>
     <SmoothScroll />
    <div style={{display: "flex", background:'black' ,height: '100%', justifyContent: 'start'}}>
    <div >
    <ProSidebar onMouseEnter={expandSide} onClick = {expandSide} onMouseLeave={collapseSide}  collapsed = {isCollapsed}>
    <Menu iconShape="square">
    <MenuItem style = {locStyle.styles} icon={<FaBiking />}> <a href="#aboutMe" style = {{all: "inherit"}}>About me</a> </MenuItem>
      <SubMenu title="Blogs" icon={<FaMicroblog />}  style = {locStyle.styles}>
        <MenuItem style = {locStyle.styles}> <Link to="/blog/security" style = {{fontWeight: "600", fontSize: "medium", fontFamily: `${locStyle["styles"]["fontFamily"]}`}}>Cyber Security </Link> </MenuItem>
        <MenuItem style = {locStyle.styles}> <Link to="/blog/ml" style = {{ fontWeight: "600", fontSize: "medium", fontFamily: `${locStyle["styles"]["fontFamily"]}`}}>Machine Learning </Link>  </MenuItem>
        <MenuItem style = {locStyle.styles}> <Link to="/blog/alg" style = {{ fontWeight: "600", fontSize: "medium", fontFamily: `${locStyle["styles"]["fontFamily"]}`}}>Algorithmicity </Link> </MenuItem>
        <MenuItem style = {locStyle.styles}> <Link to="/blog/life" style = {{ fontWeight: "600", fontSize: "medium", fontFamily: `${locStyle["styles"]["fontFamily"]}`}}>Life Experiences </Link> </MenuItem>
      </SubMenu>
    
      <MenuItem style = {locStyle.styles} icon={<FaGithub />} > <a
  href="https://github.com/AmroAbdrabo/" style = {{all: "inherit"}}>GitHub</a></MenuItem>
      <MenuItem icon={<FaYoutube />} style = {locStyle.styles} ><a
  href="https://www.youtube.com/channel/UCFFDmwlW2Abn_NXB2MVLQ6Q" style = {{all: "inherit"}}>YouTube</a></MenuItem>    
    
      <MenuItem style = {locStyle.styles} icon={<FaMusic />} >  <a
  href="https://youtu.be/Rq-bT7Gw5hQ" style = {{all: "inherit"}}>Music</a></MenuItem>
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
          <h1>3D hand pose estimation</h1> 
          <p>Given images of hands in-the-wild, scored a Procrustes loss of
around 9 for the Machine Perception course. I implemented all
the 4 models used and contributed to writing a final report which can be found <a href="https://github.com/AmroAbdrabo/mp-hand-pose-estimation">here</a>.</p> 
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
          <h1> Tangible <br />Classroom Orchestration  </h1> 
          <p>Computer-human interaction project with the goal of classroom orchestration. Programmed classroom orchestration tool using Cellulo robots, <a href="https://github.com/AmroAbdrabo/orchestrationChili">programmed</a> in QML, that receive feedback from students and commands from a teacher via <a href="https://github.com/chili-epfl/FROG">FROG</a> web interface. </p> 
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
          <h1>Yelp DB Project</h1> 
          <p>Designed an ER-schema for a Yelp database. Cleansed data in CSV format, and
imported it to a database in Oracle SQL. Then, the data was query optimized and
queried to gain insights into the data. Available <a href="https://github.com/AmroAbdrabo/yelp-ETL">here</a>.</p> 
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
          <h1>Static analysis on <br/> Ethereum smart contracts</h1> 
          <p>Given a series of smart contracts for Ethereum, the task was
to label each contract vulnerable or safe using static analysis. I
thus implemented a 1000 LOC taint analyser for smart contracts
written in Solidity. Available <a href="https://github.com/AmroAbdrabo/ethereum-sc-taint-analyzer">here</a>.</p> 
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
          <h1>Sleep stage scoring</h1> 
          <p>Three-stage sleep classification was performed on EMG and EEG(1,2) data from mice
to determine the state of the mouse in a 4 second epoch (REM, non-REM, and
awake). Several algorithms including CNN and SVM were formulated (available <a href = "https://github.com/AmroAbdrabo/task4">here</a>) 
in Python.</p> 
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
          <h1>Arrhythmia classification</h1> 
          <p>Given an imbalanced learning problem consisting of four types of heartbeats:
healthy, atrial fibrillation, an undisclosed type of arrhythmia, and a noisy
non-interpretable beat. Several research papers were studied and combined for
the final implementation in Python which can be found <a href = "https://github.com/AmroAbdrabo/ecg-feature-extraction/blob/main/ecg_features.ipynb">here</a>. </p> 
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
          <h1>Run0rD1e</h1> 
          <p>Physical location-based game in Java for Android. The game consists of a player surrounded by evil bots that one must escape. The game’s entities are displayed on a map. Specifically, each entity has a radius and the player loses health if his circle intersects with a bots circle. Agile software development was used. <a href = "https://www.youtube.com/watch?v=3h8_igFeRb4">Trailer</a> and <a href = "https://github.com/Zeavee/Run0rD1e">project</a>. </p> 
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
          <h1>Catrine</h1> 
          <p> First-person cat avatar game using MonoGame and C++ for the physics engine. I was responsible for the skybox, physics-free player movement, and camera. Click  <a href = "https://youtu.be/WIuS6iGwTIA">here</a> for the trailer (game link in description).</p> 
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
          <h1> VIScon Hackathon</h1> 
          <p>Gamified version of ASVZ gym app done in 48 hours in React and R3F, and Python. GitHub project available <a href = "https://github.com/Sau1707/VisconHackaton2022">here</a>. </p>
        </div>
      </div>
    </div>
  </div>


</div>






 





  <h1 style = {{color: "#AE0096", paddingLeft: "3vw", paddingTop: "30px", marginTop: "0",backgroundColor: "#E2FFFD", marginBottom: "0", fontFamily: `${locStyle["styles"]["fontFamily"]}`}}>Experience</h1>
   <div style = {{paddingTop: "60px", backgroundColor: "#E2FFFD", paddingBottom: "10vw"}}>

      <div className={timeline_style["timeline"]}>
        <div className={`${timeline_style["container"]} ${timeline_style["left"]}`} >
          
          <div className={timeline_style["content"]} style = {{paddingBottom: "50px"}}>
          <img src={"/img/juniors.jpg"} alt="Avatar" style={{boxSizing: "border-box", display: "block", marginLeft: "auto", marginRight: "auto",width:"60%"}} />
            <h2 style={{marginTop: "20px"}}>Nov 2022 - Jan 2023</h2>
            <p>
             Software Engineer at ETH Juniors <br/> <p style={{color: "gray"}}> Developing photogrammetry software <br/>
              <ul>
                <li> Worked across the entire stack in C#, JS, HTML, Python, Docker (full stack development)  </li>
                <li> Reduced backend processing time by around 23% </li>
                <li> Designed architecture and identified security risks for guest login </li>
                <li> Designed computational geometric methods for scale determination </li>
                <li> Used statistical techniques to enhance 3D models </li>
                <li> Presented in both English and German </li>
                
              </ul>
            </p>
             </p>
          </div>
        </div>
        <div className={`${timeline_style["container"]} ${timeline_style["right"]}`}>
          <div className={timeline_style["content"]}>
          <img src={"/img/epfl.png"} alt="Avatar" style={{boxSizing: "border-box", display: "block", marginLeft: "auto", marginRight: "auto",width:"40%"}} />
            <h2 style={{marginTop: "20px"}}>Sept 2019 - Dec </h2>
            <p>
            Student teaching assistant in Analysis at EPFL
            <p style={{color: "gray"}}> supervised by Prof. Dr. Lachowska </p>
             
            </p>
          </div>
        </div>
        <div className={`${timeline_style["container"]} ${timeline_style["left"]}`}>
          <div className={timeline_style["content"]}>
          <img src={"/img/dawson.jpg"} alt="Avatar" style={{boxSizing: "border-box", display: "block", marginLeft: "auto", marginRight: "auto",width:"48%"}} />
          <h2 style={{marginTop: "20px"}}>May 2015 - Jun</h2>
            <p>
            Group Summer Internship on Brain Imaging at Dawson College and Cerebral Imaging Centre 
            <p style={{color: "gray"}}>Phase correction for MRI signal acquisition under supervision of Prof. Dr. Nadeau.  <br/>
         <a href="https://www.slideshare.net/MyriamDimanche/brainimaging2015100622h29-70517931">Final Presentation</a>  </p>
            </p>
          </div>
        </div>
        
      </div>
      </div>






    


      </>
    );
  };
  

  export default Start;