import React, { useState, useEffect, useRef} from 'react';
import axios from 'axios';
//import Popup from 'reactjs-popup';
import {useReactToPrint} from "react-to-print";
import { useNavigate} from 'react-router-dom'




function PateintDetailsManagement() {

    const navigate = useNavigate();
    const [patientdetails, setpatientdetails] = useState([]);
    const componentPDF = useRef();
    const [searchQuery, setSearchQuery] = useState('');
   


    useEffect(() => {
        axios.get(`http://localhost:8083/patient/`)
            .then((patientdetails) => {
                setpatientdetails(patientdetails.data);
                console.log(patientdetails.data);
            })
            .catch((err) => {
                console.error(err.message);
            });
           
    }, []);

    

    {/*function deleteMovie(id) {
        axios.delete(`http://localhost:8083/patient/delete/${id}`)
            .then(() => {
                alert("Deleted Successfully");
            }).catch((err) => {
                alert("error : " + err);
            });
        window.location.reload();
    }*/}

   
      

      const filteredPatientDetails = patientdetails.filter(patient => patient.id.toLowerCase().includes(searchQuery.toLowerCase()));

    
    const generatePDF = useReactToPrint({
        content: () =>componentPDF.current,
        documentTitle:"Patientdata",
        onAfterPrint:()=>{
            alert("Data saved in PDF")
            navigate('/ManagePatient')
        }
    });

    return (


        
        <div>
            <div className="container">
            <div className="display-table mt-5">
                <div className="row display-table-row mt-5">
                    <div className="col-md-2 col-sm-1 hidden-xs display-table-cell v-align box" id="navigation">
                      
                        
                    </div>
                    <div className="col-md-10 col-sm-11 display-table-cell v-align">

                        <div className="row mb-4">
                            <header>
                                <div className="col-md-7">
                                    <nav className="navbar-default pull-left">
                                        <div className="navbar-header">
                                            <div className="header">
                                                
                                            </div>
                                        </div>
                                    </nav>

                                </div>
                                <div className="col-md-5">
                                    <div className="header-rightside">

                                    </div>
                                </div>
                            </header>


                        </div>

                        <div>
                            <br></br>
                            <br></br>

                          

                            <input type="text" placeholder="Search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />

                            <br></br>
                            <br></br>
                            {/*<div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <a href="/add" class="btn btn-primary btn-lg active" role="button" aria-pressed="true" >Add New Patient</a>

                            }
                            </div>*/}
                            <br></br>
                            <br></br>
                            
                            
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="table-wrap">
                                    {/*class="thead-dark"*/}
                                    <div ref={componentPDF} style={{width:'100%'}}>
                                        
                                        <table class="table" border="1">
                                            <thead >
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Age</th>
                                                    <th scope="col">Gender</th>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Admit Date</th>
                                                    <th scope="col">Discharge Date</th>
                                                   
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    filteredPatientDetails.map((val, key) => {
                                                    //code to display the filtered patient details
                                                    return (
                                                        <tr>
                                                            <td style={{ width: "" }}>{val.name }</td>
                                                            <td style={{ width: "" }}>{val.age}</td>
                                                            <td style={{ width: "" }}>{val.gender}</td>
                                                            <td style={{ width: "" }}>{val.id}</td>
                                                            <td style={{ width: "" }}>{val.admit_Date}</td>
                                                            <td style={{ width: "" }}>{val.discharge_Date}</td>
                                                            {/*<td style={{ width: "" }}> <a href={`/update/` + val} className='btn btn-warning btn-sm mr-10'>Update</a>
                                                            
                                                                <Popup
                                                                    trigger={<button className="btn btn-danger btn-sm ml-10[0"> Delete </button>}
                                                                    modal
                                                                    nested
                                                                >
                                                                    {close => (
                                                                        <div className="container-fluid" style={{ padding: 5 }}>



                                                                            <div className="h-100 p-5 bg-light border rounded-3">
                                                                                <h1 className="card-title">Delete This Field ?</h1>
                                                                                <div className>
                                                                                    <br></br>
                                                                                    <button
                                                                                        className="btn btn-success"
                                                                                        onClick={() => {
                                                                                            console.log('modal closed ');
                                                                                            close();
                                                                                        }}
                                                                                    >
                                                                                        Cancle
                                                                                    </button> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                                                                    <button className='btn btn-danger' onClick={() => deleteMovie(val._id)}>Delete</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </Popup>
                                                                                    </td>
                                                                                    <td style={{ width: "" }}> <button className="btn btn-success" onClick={() =>generatePDF(val._id)}>PDF</button></td>*/}
                                                            
                                                        </tr>
                                                    )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button className="btn btn-success" onClick={generatePDF}>PDF</button>
                                    </div>
                                </div >     
                            </div >
                        </div>
                    </div >
                </div>
            </div>
        </div>
    </div>
</div>

    );
}

export default PateintDetailsManagement;