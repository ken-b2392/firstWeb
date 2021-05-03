import React, {useState, useEffect} from 'react'
import './AddStudent.css'
import db from '../../db/firebaseconfig';
import trashlogo from '../../assets/images/trash logo copy.png';
import editlogo from '../../assets/images/editlogo copy.png';

function AddStudent() {

    const [studID, setStudID] = useState('')
    const [studFN, setStudFN] = useState('')
    const [studADD, setStudADD] = useState('')
    const [studCONTACT, setStudCONTACT] = useState('')
    const [displayStud, setDisplayStud] = useState('')
    const [studCurrID, setStudCurrID] = useState('')

    const addStud=()=>{
        db.collection('studentsCOLLECT').add({
            studId: studID,
            studFn: studFN,
            studAdd: studADD,
            studContact: studCONTACT
          })
    }

    const updateStud=()=>{
        db.collection('studentsCOLLECT').doc(studCurrID).update(
            {
                studId: studID,
                studFn: studFN,
                studAdd: studADD,
                studContact: studCONTACT
            } 
        )
    }

    const verifInputs=()=>{
        if (studCurrID === '' && studID === '' && studFN === '' && studADD === '') {
            document.getElementById("forstudadd").value("Add Student")
            setStudCurrID('')
        }else{
            document.getElementById("forstudadd").value("Update Student")
        }

    }

    useEffect(() => {
        try {
          db.collection('studentsCOLLECT').onSnapshot(snapshot =>{
            setDisplayStud(snapshot.docs.map(doc => ({
                id: doc.id, 
                studidDATA: doc.data().studId,
                studfnDATA: doc.data().studFn,
                studAddDATA: doc.data().studAdd,
                studContactDATA: doc.data().studContact})))
          })  
        } catch (error) {
            console.log("error loading student lists!!!", error)
        }
          

    }, [])


    const CRUD=()=>{
        var verifID = document.getElementById("studid").value;
        var verifFN= document.getElementById("studfn").value;
        var verifADD= document.getElementById("studadd").value;
        var verifCONTACT= document.getElementById("studcontact").value;
        if(studCurrID === ''){
            try {
                addStud();    
                console.log('added')
            } catch (error) {
                console.log("YOW! ", error)
            }
            
        }else if (verifID !== '' || verifFN !== '' || verifADD !== '' || verifCONTACT !== ''){
            try {
                updateStud();    
            } catch (error) {
                console.log("error updating")
            }   
        }

            setStudID('')
            setStudFN('')
            setStudADD('')
            setStudCONTACT('')
    }
    

    return (
        
                <div className="containerbox">
                    <div className="containerAdd">
                        <div className="addStudH">
                            Add Student
                        </div>
                        <div className="addStudentContainer">
                            <div className="forlabels">
                                <label>Student ID:</label>
                                <label>Full name:</label>
                                <label>Address:</label>
                                <label>Contact Number:</label>
                            </div>
                                
                            <div className="forInputss">
                                <input id="studid" type="text" className="SID" value={studID} onChange={e => setStudID(e.target.value)}></input>
                                <input id="studfn" type="text" className="SFName" value={studFN} onChange={e => setStudFN(e.target.value)}></input>
                                <input id="studadd" type="text" className="SAddress" value={studADD} onChange={e => setStudADD(e.target.value)}></input>
                                <input id="studcontact" type="text" className="SContact" 
                                value={studCONTACT} 
                                onChange={
                                    e => setStudCONTACT(e.target.value)
                                    }></input>
                            </div>
                        </div>
                        <div className="forAddStud">
                            <input disabled={!studID || !studFN || !studADD || !studCONTACT} 
                            id="forstudadd" 
                            type="submit" 
                            className="toAddStud" 
                            value={studCurrID===''?"Add Student":"Update Student" || verifInputs}
                            onClick={CRUD} />
                        </div>
                    </div>
                    
                    <div className="listOfStudents">
                        <div className="ListStudH">
                            <table className="studTBL">
                                <thead>
                                    <tr>
                                    <th>Student ID</th>
                                    <th>Full Name</th>
                                    <th>Address</th>
                                    <th>Contact Number</th>
                                    <th>Action</th>
                                    </tr>
                                </thead>
                                    <tbody>
                                    {
                                        Object.keys(displayStud).map(ToGetID=>(
                                        <tr key = {ToGetID}>
                                            <td>
                                            {displayStud[ToGetID].studidDATA}
                                            </td>
                                            <td>
                                            {displayStud[ToGetID].studfnDATA}
                                            </td>
                                            <td>
                                            {displayStud[ToGetID].studAddDATA}
                                            </td>
                                            <td>
                                            {displayStud[ToGetID].studContactDATA}
                                            </td>
                                            <td>
                                            <a className="forEditDelete">
                                                <img src={editlogo} width="100%" alt="edit" onClick={() => {
                                                    setStudCurrID(()=> displayStud[ToGetID].id)
                                                    console.log(studCurrID)
                                                    setStudID(displayStud[ToGetID].studidDATA)
                                                    setStudFN(displayStud[ToGetID].studfnDATA)
                                                    setStudADD(displayStud[ToGetID].studAddDATA)
                                                    setStudCONTACT(displayStud[ToGetID].studContactDATA)
                                                }  
                                                }/>
                                            </a>
                                            <a className="forEditDelete">
                                                <img src={trashlogo} width="100%" alt="trash" onClick={() => {db.collection('studentsCOLLECT').doc(displayStud[ToGetID].id).delete()}}/>
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
    )
}


export default AddStudent
