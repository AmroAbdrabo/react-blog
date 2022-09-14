import Card from "../../components/card"

const Cards = () => {
    return <div> <Card specs = {{title: "System Security Lecture Notes", imgName: "notes.jpg", linkto: "./pass"}} />
    <br/><br/>
    <Card specs = {{title: "digital signatures", imgName: "notes.jpg", linkto: "./pass"}} /> 
    <div style={{height: "120px", width: "10px", border: "1px solid rgba(1, 1, 1, 0)"}} ></div>
    </div>;
}
export default Cards;