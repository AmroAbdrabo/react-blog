import Card from "../../components/card"
import { MathComponent } from "mathjax-react";

const Cards = () => {
    return <div> <Card specs = {{title: "In-memory compute", description: "How to surpass Von Neumann's data transfer bound for faster data-intensive processes ", sub: "Self \ \  study", date: "APR 2022",  imgName: "res.jpg", linkto: "https://amroabdrabo.github.io/amroa/inmem.html"}} />
    <br/><br/>
    <Card specs = {{title: "Fast Numerical Code", sub: "ETH course", description: "Programming practices for when you want to finish a single-core computation before your meeting with your great-grandfather", date: "MAR 2021", imgName: "amd.jpg", linkto: "https://amroabdrabo.github.io/amroa/fastcode.html"}} /> 
    <br/><br/>
    <Card specs = {{title:  <MathComponent tex={String.raw` \text{max}_{i < j} (a[i]+a[j])(j-i) `} display={false}/>, sub: "From Asia Seoul Regional 2021 - L",description: ["Divide and conquer solution with ", <MathComponent tex={String.raw` O(n\log n)`} display={false}/>, " complexity"], date: "FEB 2021", imgName: "mathart.png", linkto: "https://amroabdrabo.github.io/amroa/pr1.html"}} /> 
    <br/><br/>
    <Card specs = {{sub: "From a local EPFL-ETHZ contest 2019", title:  <MathComponent tex={String.raw` \sum \limits_{\alpha + \beta + \gamma + \delta = K}{N\choose A+ \alpha,B+\beta,G+\gamma ,D+\delta} `} display={false}/>, description:  ["An  ", <MathComponent tex={String.raw` O(n)`} display={false}/>, " solution. Naive solution has ", <MathComponent tex={String.raw` O(n^3)`} display={false}/>, " complexity"], date: "JUN 2022", imgName: "math3.png", linkto: "https://amroabdrabo.github.io/amroa/fastcode.html"}} /> 
    <div style={{height: "120px", width: "10px", border: "1px solid rgba(1, 1, 1, 0)"}} ></div>
    </div>;
}
export default Cards;