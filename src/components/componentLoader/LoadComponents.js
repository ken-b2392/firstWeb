import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Instructor from '../instructor/InstructorIndex';
import AssignsubjIndex from '../assignsubjects/AssignsubjIndex';
import Forfooter from '../footer';
import ForNavBar from '../navbar';
import Forsubjects from '../subjects';
import ForboxInfo from '../MissionVision';
import Addstudent from '../students/AddStudent';

function LoadComponents() {
    return (
    <Router>
      
      <div>
        <ForNavBar/>
        <Route path="/" exact component={ForboxInfo}/>
        <Route path="/Subjects" component={Forsubjects}/>
        <Route path="/Instructors" component={Instructor}/>
        <Route path="/AssignSubjects" component={AssignsubjIndex}/>
        <Route path="/Students" component={Addstudent}/>
        <Forfooter/>
      </div>
    
    </Router>
    )
}

export default LoadComponents
