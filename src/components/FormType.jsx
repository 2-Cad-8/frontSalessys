import { useEffect, useState } from "react";
import axios from "axios";


export default function FormType({edit,onSend=f=>f, onEdit = f =>f }){
    const opts = ['Product','Platform','Investments','Payment Method']


    const handleForm = (e)=>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const payload = Object.fromEntries(formData);
        const newdata = {
            "descripcion": payload.descripcion || "",
            "tipo": parseInt(payload.tipo) || 0,
            "delete": 0
        }
        console.log(payload)
        
        document.getElementById('addType').reset();
        
        if(!edit){
        axios.post('http://127.0.0.1:8000/api/v1/type/',newdata)
        .then(()=>{
            console.log('added') 
            onSend(true)
        }
        ).catch(console.error)
        
        }else{
            axios.put(`http://127.0.0.1:8000/api/v1/type/${edit.id}/`,newdata)
            .then(()=>{
                console.log('updated') 
                onSend(true)
                onEdit(null)
            }
            ).catch(console.error)
        }
    }

   
   
    return(
        <>
        <form onSubmit={handleForm} id= "addType">
           
            <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">Descripcion</label>
                <input  type="text" className="form-control" id="descripcion" name="descripcion" defaultValue={(edit? edit.descripcion:'')} />
            </div>
            <div className="row">
                <div className="col-12">
                    <select className="form-select " aria-label="Default select example" name="tipo">
                    
                        {edit?
                            opts.map((item,i)=>{
                                if(i == edit.tipo)return <option selected value ={i}>{item}</option>
                                return <option  value ={i}>{item}</option>
                            })
                            :
                            
                            opts.map((item,i)=>{
                                return <option  value ={i}>{item}</option>
                            })
                        }
                    </select>
                </div>
                
            </div>
            <div className="row justify-content-center mt-2">
                <button className="buttonGreen px-2 col-2" data-bs-dismiss="modal" aria-label="Close">Submit</button>
            </div>
        </form>
        </>
    );
}