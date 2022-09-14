import Cards from "./cards"
import '../../styling/card.css'
import styled, {keyframes} from "styled-components";
import headerData from '../../components/blogHeader.json';

function Page(props){
     // The typing effect: the width 43vw depends on the length of whatever it is you want to typewrite. The longer the text, the bigger this value. 
     // https://stackoverflow.com/questions/6510094/can-you-change-css3-animation-keyframe-attributes-inline-i-e-in-the-html-style
     // second answer is the best for adaptively updating keyframes
     

    // In case you want to tweak (fine tune) a property of the header: 
    // const customHeading = headerData.heading;
    // customHeading.marginTop = "0.1cm"

    const tweakAnimation = headerData.typewriter;
    tweakAnimation["--to-width"] = "34vw";
    tweakAnimation["--steps"] = "13";
    return <body>
        <div style={headerData.heading}>
            <div>
                <h1 style = {tweakAnimation}>cd ~/compsec</h1>
            </div>
        </div>
        <Cards/>
        
    </body> 
}

export default Page;