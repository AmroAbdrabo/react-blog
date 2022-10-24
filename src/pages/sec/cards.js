import Card from "../../components/card"

const Cards = () => {
    return <div> <Card specs = {{description: "Side channel attacks, timing and power analysis attacks, hardware-based security, commodity device security, and so forth ", sub: "Guide for ETH students", date: "FEB 22, 2021", title: "System Security Lecture Notes", imgName: "notes.jpg", linkto: "https://amroabdrabo.github.io/amroa/pass.html"}} />
    <br/><br/>
    <Card specs = {{description: "Smart contracts, static verification, ML for program inspection, etc.", title: "Program Analysis for Security and Reliability", sub: "ETH course",  date: "APR 5, 2022", imgName: "ether.jpg", linkto: "https://amroabdrabo.github.io/amroa/pass.html"}} /> 
    <div style={{height: "120px", width: "10px", border: "1px solid rgba(1, 1, 1, 0)"}} ></div>
    </div>;
}
export default Cards;