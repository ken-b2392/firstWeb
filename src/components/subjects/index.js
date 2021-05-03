import React ,{useState, useEffect} from 'react';
import './style.css';
import db from '../../db/firebaseconfig';
import trashlogo from '../../assets/images/trash logo copy.png';
import editlogo from '../../assets/images/editlogo copy.png';


const Forsubjects = () => {
  
  const [subjects, setSubjects] = useState([])

  var [subjCode, setSubjCode] = useState('') 
  var [subjTitle, setSubjTitle] = useState('') 


  const [currID, setCurrID] = useState('')

    const forCRUD = () =>{

      if (subjCode === '' || subjTitle === ''){
      
        }else{
          
        if (currID === ''){
            db.collection('subjectsCOLLECT').add({
              subjectCode: subjCode,
              subjectTitle: subjTitle
            })
        }else{
          
            try {
                  db.collection('subjectsCOLLECT').doc(currID).update(
                    {
                      subjectCode: subjCode,
                      subjectTitle: subjTitle        
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

        setSubjCode('')
        setSubjTitle('')
        setCurrID('')
    }      

    useEffect(() => {

          db.collection('subjectsCOLLECT').onSnapshot(snapshot =>{
            setSubjects(snapshot.docs.map(doc => ({id: doc.id, subjCodeData: doc.data().subjectCode, subjTiTleData: doc.data().subjectTitle})))
          })

    }, [])




  return(
    <form autoComplete="off" onSubmit={forSubmit}>
    
         <div className="subjContains">
            <div className="subjectsHeader">
                SUBJECTS INFORMATION
            </div>
        <div className="subjectBoxes">
        {/* Start Add Subj */}
      
          <div className="subjectContainerL">
              <div className="forTitleSubjBoxL">
                <h1 className="titleSubjOpt">Add New Subject</h1>
              </div>
              <div className="subjectsBoxL">
                <div className="forLabelContainer">
                  <label className="leftLabels">Subject Code:</label>
                </div>
                <div className="forInputsContainer">
                  
                  <input value = {subjCode} name="subjCode" onChange={e=>setSubjCode(e.target.value)}
                  className="forInputs" id = "AddsubjCode" type = "text" placeholder="Subject code" required/>
                 
                </div>

                <div className="forLabelContainer">
                  <label className="leftLabels">Subject Title:</label>
                  
                </div>
                <div className="forInputsContainer">
                  
                  <input value={subjTitle} name="subjTitle" onChange={e=>setSubjTitle(e.target.value)}
                  className="forInputs" id = "AddsubjName" type = "text" placeholder="Subject name" required/>
               

                </div>


                <div className="forSubmitButton">
                  <input disabled={!subjCode || !subjTitle} onClick={forSubmit}
                  className="forSubmitBtn" id = "addNewSubj" type = "submit" value={currID===''?"Add New Subject":"Update Subject"}/>
                </div>

              </div>
          </div> 


{/* end add subj */}

{/* start display subjects */}
        <div className="subjectContainerR" >
              <div className="forTitleSubjBoxR">
                <h1 className="titleSubjOpt">List of Subjects</h1>
              </div>
              <div className="subjectsBoxR" >
                <table>
                  <thead>
                    <tr>
                      <th>Subject Code</th>
                      <th>Subject Title</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  

                    {
                      Object.keys(subjects).map(ToGetID=>(
                        <tr key = {ToGetID}>
                          <td>
                            {subjects[ToGetID].subjCodeData}
                          </td>
                          <td>
                            {subjects[ToGetID].subjTiTleData}
                          </td>
                          <td>
                            <a className="forEditDelete">
                              <img src={editlogo} width="100%" alt="edit" onClick={() => {
                                  setCurrID(()=> subjects[ToGetID].id)
                                  setSubjCode(subjects[ToGetID].subjCodeData)
                                  setSubjTitle(subjects[ToGetID].subjTiTleData)                    
                                }  
                              }/>
                            </a>
                            <a className="forEditDelete">
                              <img src={trashlogo} width="100%" alt="trash" onClick={() => {db.collection('subjectsCOLLECT').doc(subjects[ToGetID].id).delete()}}/>
                            </a>
                          </td>

                        </tr>
                      ))
                    }
                </tbody>
                </table>
              </div>
          </div>
{/* end display subjects */}
        </div>   
      </div>
    </form>
    )
 }

export default Forsubjects