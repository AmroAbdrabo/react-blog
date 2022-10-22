import Card from "../../components/card"

const Cards = () => {
    return <div> <Card specs = {{title: "Machine Learning Lecture Notes", imgName: "notes.jpg", linkto: "./pass"}} />
    <br/><br/>
    <Card specs = {{description: "dsff sgsfg gsdfgsf dsg fsg sfg sfg sfg sg sfg adfagdsagsdg gd gd dg sg dg gs ", title: "digital ashjhj afhj  signatures", imgName: "notes.jpg", linkto: "./pass"}} /> 
    <div style={{height: "120px", width: "10px", border: "1px solid rgba(1, 1, 1, 0)"}} ></div>
    </div>;
}
export default Cards;