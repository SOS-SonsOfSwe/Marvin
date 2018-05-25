import React from 'react';

var arrayData = [
    {degreeCourse: "informatica", didacticActivity: "analisi", typology: "scritto",
     professor: "Francescopaolo Montefalcone", place: "Paolotti Lum250", date: "15-06-2018",
     time: "9.30", studentsRegistered: "link"},
]

const Row = ({degreeCourse, didacticActivity, typology, professor, place, date, time, studentsRegistered}) => (
    <div>
      <p>Degree course: {degreeCourse}</p>
      <p>Didactic activity: {didacticActivity}</p>
      <p>Typology: {typology}</p>
      <p>Professor: {professor}</p>
      <p>Place: {place}</p>
      <p>Date: {date}</p>
      <p>Time: {time}</p>
      <p>Students registered: {studentsRegistered}</p>
    </div>
  );

class ExamPage extends React.Component{

    render(){
        const rows = arrayData.map( (rowData) => <Row {...rowData} />);

        return(
            <main className='container'>
                <div class="pure-g">
                    <h1>Exam specific page</h1>
                    <p>Here there are the specific page of the exam</p>
                        <form className="pure-form pure-form-stacked">
                            <fieldset>
                                <body>
                                    {rows}
                                </body>
                            </fieldset>
                        </form>
                </div>
            </main>    
        )
    }    
}

export default ExamPage;