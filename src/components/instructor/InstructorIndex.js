import React ,{useState, useEffect} from 'react';
import './InstructorStyle.css';
import db from '../../db/firebaseconfig';
import trashlogo from '../../assets/images/trash logo copy.png';
import editlogo from '../../assets/images/editlogo copy.png';

function Instructor() {
    
  const [instructors, setInstructors] = useState([])

  var [instructCode, setInstructCode] = useState('') 
  var [instructFName, setInstructFName] = useState('') 
  var [instructContactNum, setInstructContactNum] = useState('')
  var [instructAddress, setInstructAddress] = useState('')
  

  const [currID, setCurrID] = useState('')

    const forCRUD = () =>{

      if (instructCode === '' || instructFName === ''){
      
        }else{

        if (currID === ''){
            db.collection('instructorsCOLLECT').add({
              instCode: instructCode,
              instFName: instructFName,
              instContact: instructContactNum,
              instAddress: instructAddress
            })
        }else{
          
            try {
                  db.collection('instructorsCOLLECT').doc(currID).update(
                    {
                      instCode: instructCode,
                      instFName: instructFName,        
                      instContact: instructContactNum,
                      instAddress: instructAddress
                    } 
                  )
              
            } catch (error) {
            console.log(error)  
            }

          }
        }
    } 

    const forSubmit = (e) => {
        e.preventDefault();
        forCRUD();

        setInstructCode('')
        setInstructFName('')
        setInstructContactNum('')
        setInstructAddress('')
        setCurrID('')
    }      

    useEffect(() => {

          db.collection('instructorsCOLLECT').onSnapshot(snapshot =>{
            setInstructors(snapshot.docs.map(doc => 
              ({
                id: doc.id, 
                instCodeData: doc.data().instCode, 
                instFNameData: doc.data().instFName,
                instContactData: doc.data().instContact,
                instAddressData: doc.data().instAddress
              })))
          })

    }, [])




  return(
    <form autoComplete="off" onSubmit={forSubmit}>
    
         <div className="containing">
            <div className="pHeader">
                INSTRUCTOR'S INFORMATION
            </div>
        <div className="forBoxes">
        {/* Start Add Subj */}
        
          <div className="containerL">
              <div className="forTitleBoxL">
                <h1 className="titleBoxTag">Add New Instructor</h1>
              </div>
              <div className="forBoxL">
                
                <div className="firstL">
                        <div className="forLabelContainer">
                            <label className="leftLabels">Instructor's Code:</label>
                        </div>

                        <div className="forInputsContainer">
                            <input value = {instructCode} name="instructCode" onChange={e=>setInstructCode(e.target.value)}
                            className="forInputs" id = "addNewCode" type = "text" placeholder="Code Number" required/>
                        </div>

                        <div className="forLabelContainer">
                            <label className="leftLabels">Full name:</label>
                        </div>

                        <div className="forInputsContainer">
                            <input value={instructFName} name="instructFName" onChange={e=>setInstructFName(e.target.value)}
                            className="forInputs" id = "addNewFName" type = "text" placeholder="Full name" required/>
                        </div>
                </div>

                <div className="secondL">
                        <div className="forLabelContainer">
                            <label className="leftLabels">Contact Number:</label>
                        </div>

                        <div className="forInputsContainer">
                            <input value = {instructContactNum} name="instructContact" onChange={e=>setInstructContactNum(e.target.value)}
                            className="forInputs" id = "addNewContactNum" type = "text" placeholder="Contact Number" required/>
                        </div>

                        <div className="forLabelContainer">
                            <label className="leftLabels">Address:</label>
                        </div>

                        <div className="forInputsContainer">
                            <input value={instructAddress} name="instructFName" onChange={e=>setInstructAddress(e.target.value)}
                            className="forInputs" id = "addNewAddress" type = "text" placeholder="Address" required/>
                        </div>
                </div>
              </div>
              <div className="forSubmitButton">
                  <input disabled={!instructCode || !instructFName} onClick={forSubmit}
                  className="forSubmitBtn" id = "addNewBtn" type = "submit" value={currID===''?"Add New Instructor":"Update Details"}/>
                </div>
          </div> 


{/* end add subj */}

{/* start display instructors */}
        <div className="containerR" >
              <div className="forTitleBoxR">
                <h1 className="titleBoxTag">List of Instructors</h1>
              </div>
              <div className="forBoxR" >
                <table className="recordsTbl">
                  <thead>
                    <tr>
                      <th>Instructor's Code</th>
                      <th>Full Name</th>
                      <th>Contact Number</th>
                      <th>Address</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                    <tbody>
                    

                      {
                        Object.keys(instructors).map(ToGetID=>(
                          <tr key = {ToGetID}>
                            <td>
                              {instructors[ToGetID].instCodeData}
                            </td>
                            <td>
                              {instructors[ToGetID].instFNameData}
                            </td>
                            <td>
                              {instructors[ToGetID].instContactData}
                            </td>
                            <td>
                              {instructors[ToGetID].instAddressData}
                            </td>
                            <td>
                              <a className="forEditDelete">
                                <img src={editlogo} width="100%" alt="edit" onClick={() => {
                                    setCurrID(()=> instructors[ToGetID].id)
                                    setInstructCode(instructors[ToGetID].instCodeData)
                                    setInstructFName(instructors[ToGetID].instFNameData)                    
                                    setInstructContactNum(instructors[ToGetID].instContact)
                                    setInstructAddress(instructors[ToGetID].instAddressData)
                                  }  
                                }/>
                              </a>
                              <a className="forEditDelete">
                                <img src={trashlogo} width="100%" alt="trash" onClick={() => {db.collection('instructorsCOLLECT').doc(instructors[ToGetID].id).delete()}}/>
                              </a>
                            </td>

                          </tr>
                        ))
                      }
                  </tbody>
                </table>
              </div>
          </div>
{/* end display instructors */}
        </div>   
      </div>
    </form>
    )
}

export default Instructor
