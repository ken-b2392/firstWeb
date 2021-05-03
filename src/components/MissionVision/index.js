import React from 'react'
import './style.css'


function ForboxInfo (){

  return(
    <div className="forBoxInfoContainer">
        <div className="boxes">
            <div className="boxContentHeader">
                MISSION
            </div>
            <div className="boxContents">
                <p>
                The Community College aims to produce graduates with competitive skills by providing competent instructors, 
                adequate learning resources and scholarship grants and link them to employment opportunities. 
                Further, being a local government - owned institution, it supports
                the programs and projects of the government.
                </p>
            </div>            
        </div>
        <div className="boxes">
            <div className="boxContentHeader">
                VISION
            </div>
            <div className="boxContents">
                <p>
                    The Community College is a self-reliant higher educational institution providing affordable quality
                    education to produce pro-active and highly competitive graduates.
                </p>
            </div>               
        </div>
    </div>
   )

 }

export default ForboxInfo