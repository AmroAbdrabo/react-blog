import Card from "../../components/card"

const Cards = () => {
    return <div> <Card specs = {{title: "Advanced Machine Learning Lecture Notes", date: "JAN 2021", description: "The course covers density estimation, linear regression, Gaussian processes, linear methods for classification, SVM, ensembles, deep learning, non-parametric Bayesian methods, and PAC learning", sub: "Guide for ETHZ students",  imgName: "notes.jpg", linkto: "https://amroabdrabo.github.io/amroa/mlnotes.html"}} />
    <br/><br/>
    <Card specs = {{title: "2020 AML Exam", description: "Unofficial solutions for the 2020 advanced machine learning exam (75% complete)", date: "JAN 2021", imgName: "examico.jpg", linkto: "https://amroabdrabo.github.io/amroa/aml2020.html"}} /> 
    <div style={{height: "120px", width: "10px", border: "1px solid rgba(1, 1, 1, 0)"}} ></div>
    </div>;
}
export default Cards;