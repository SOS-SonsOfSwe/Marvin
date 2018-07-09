import React from 'react';

class Help extends React.Component{

    render(){
        return(
            <main className='container'>
                <div className='pure-u-1-1'>
                    <h1>Help</h1>
                    <p>In this page you can find a guide to Marvin</p>
                    <h2>F.A.Q.</h2>
                    <ul>
                        <li><a href="#faq1">Domanda 1</a></li>
                        <li><a href="#faq2">Domanda 2</a></li>
                        <li><a href="#faq3">Domanda 3</a></li>
                        <li><a href="#faq4">Domanda 4</a></li>
                        <li><a href="#faq5">Domanda 5</a></li>
                    </ul>

                    <h3 className="faq" id="faq1">
                        <p>domanda1</p>
                        <br/>
                        <br/>
                        <br/>
                    </h3>
                    <h3 className="faq" id="faq2">
                        <p>domanda2</p>
                        <br/>
                        <br/>
                        <br/>
                    </h3>
                    <h3 className="faq" id="faq3">
                        <p>domanda3</p>
                        <br/>
                        <br/>
                        <br/>
                    </h3>
                    <h3 className="faq" id="faq4">
                        <p>domanda4</p>
                        <br/>
                        <br/>
                        <br/>
                    </h3>
                    <h3 className="faq" id="faq5">
                        <p>domanda5</p>
                        <br/>
                        <br/>
                        <br/>
                    </h3>
                </div>
            </main>



        )
    }
}
export default Help;