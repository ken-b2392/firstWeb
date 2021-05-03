import React, {useState, useEffect} from 'react';
import './AssignsubjStyle.css';
import trashlogo from '../../assets/images/trash logo copy.png';
import db from '../../db/firebaseconfig'


function AssignsubjIndex() {

    const [displaySubj, setDisplaySubj] = useState('')
    const [displayInst, setDisplayInst] = useState('')

    const [instCurrID, setInstCurrID] = useState('')
    const [subjCurrID, setSubjCurrID] = useState('')
    const [subjTitle, setSubjTitle] = useState('')


    const [displayAssignedSubj, setDisplayAssignedSubj] = useState ('')

    useEffect(() => {

        db.collection('subjectsCOLLECT').onSnapshot(snapshot =>{
            setDisplaySubj(snapshot.docs.map(doc => 
                ({
                    id: doc.id, 
                    subjTiTleData: doc.data().subjectTitle})))
        })
    }, [])

    useEffect(() => {
        db.collection('instructorsCOLLECT').onSnapshot(snapshot =>{
            setDisplayInst(snapshot.docs.map(doc => 
            ({
            id: doc.id,
            instFNameData: doc.data().instFName
            })))
        })
    }, [])

    

    var instID =''
    var subjCode=''
    var subjTile=''
   


    return (
        <div>
            <div className="Maincontainer">
                <div className="Lcontainer">
                    <div className="containerH">
                            INSTRUCTORS   
                        </div>
                        <div className="containerContent">
                            <div className="table1">
                                <table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Name of the Instructor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        Object.keys(displayInst).map(ToGetID=>(
                                            <tr key = {ToGetID}>
                                                <td>
                                                    <input type="radio" name="selectInst" id={"getInstDocID"+[ToGetID]} onChangeCapture={()=>{
                                                        if (document.getElementById("getInstDocID"+[ToGetID]).checked === true){
                                                            instID = displayInst[ToGetID].id;
                                                            // setInstCurrID(c => instID)
                                                            // setInstCurrID(currID => (currID, instID))
                                                            setInstCurrID(displayInst[ToGetID].id)
                                                            
                                                    
                                                            db.collection('assignedSubjCOLLECT').doc(instID).collection('listsubjects').onSnapshot(snapshot =>{
                                                            // db.collection('assignedSubjCOLLECT').doc(instCurrID).collection('listsubjects').onSnapshot(snapshot =>{
                                                                setDisplayAssignedSubj(snapshot.docs.map(doc => 
                                                                    ({
                                                                        id: doc.id, 
                                                                        subjTiTleData: doc.data().subjectTitle
                                                                    })))
                                                            })

                                                            // displayAssignedSubj
                                                            // setInstCurrID(displayInst[ToGetID].id);
                                                            // document.getElementById("submitassign").disabled=false;
                                                        }else{
                                                            instID = ''
                                                            // document.getElementById("submitassign").disabled=true;
                                                        }
                                                    }}/>
                                                </td>
                                                <td>
                                                    {displayInst[ToGetID].instFNameData}
                                                </td>
                                                
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                </div>

                <div className="Mcontainer">
                    <div className="containerH">
                        SUBJECTS 
                    </div>
                    <div className="containerContent">
                        <div className="table1">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Subject Title</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    Object.keys(displaySubj).map(ToGetID=>(
                                        <tr key = {ToGetID}>
                                            <td>
                                                {
                                                    displaySubj[ToGetID].subjTiTleData
                                                }
                                            </td>
                                            <td>
                                                <input type="submit" id="submitassign" className="assignbtn" value=">>" 
                                                onClick={
                                                    ()=>{
                                                        try {
                                                            subjCode = displaySubj[ToGetID].id 
                                                            subjTile = displaySubj[ToGetID].subjTiTleData
                                                            

                                                            db.collection('assignedSubjCOLLECT').doc(instCurrID).collection('listsubjects').doc(subjCode).set
                                                                    ({
                                                                        subjectCode: subjCode,
                                                                        subjectTitle: subjTile
                                                                    })                                                

                                                        } catch (error) {
                                                            console.log("HEY! ", error)
                                                        }
                                                    }
                                                }/>
                                            </td>

                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="Rcontainer">
                    <div className="containerH">
                            ASSIGNED SUBJECTS    
                        </div>
                        <div className="containerContent">
                            <div className="table1">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Subject Title</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        
                                        Object.keys(displayAssignedSubj).map(ToGetID=>(
                                            <tr key = {ToGetID}>
                                                <td>
                                                    {displayAssignedSubj[ToGetID].subjTiTleData}
                                                </td>
                                                <td>
                                                    <a className="forEditDelete">
                                                        <img src={trashlogo} 
                                                            width="100%" 
                                                            alt="trash"
                                                            onClick={()=>{
                                                                try {
                                                                    
                                                                    console.log("instCurrID-->> ", instCurrID, "document--->>> ", displayAssignedSubj[ToGetID].id)   
                                                                    console.log(db.collection('assignedSubjCOLLECT').doc(instCurrID).collection('listsubjects').doc(displayAssignedSubj[ToGetID].id).delete())
                                                                } catch (error) {
                                                                    console.log('HOY! ', error)
                                                                }
                                                                db.collection('assignedSubjCOLLECT').doc(instCurrID).collection('listsubjects').
                                                                    doc(displayAssignedSubj[ToGetID].id).delete() 
                                                            }}/>
                                                            {/* onClick={() => 
                                                                {db.collection('instructorsCOLLECT').doc(instructors[ToGetID].id).delete()}}/> */}
                                                    </a>
                                                </td>

                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default AssignsubjIndex
