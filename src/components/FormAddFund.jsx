import { useEffect, useState } from "react";
import axios from "axios";

export default function FormAddFund ({edit,onSend = f=>f, onEdit = f =>f}){
    const [precio, setPrecio]=useState(edit? edit.precio : 0)
    const [cantidad, setCantidad]=useState(edit? edit.cantidad : 0)
    const [investType, setInvestType]=useState()

    const getType = async (type)=>{
        const data = await axios.get('https://backendsalessys.onrender.com/api/v1/type')
        const pureData = await data.data;
        const opts = await pureData.filter((opt)=> opt.tipo === type)
        console.log(opts)
        setInvestType(opts)
    } 

    const handleForm = (e)=>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const payload = Object.fromEntries(formData);
        const newdata = {
            "description": payload.description || '',
            "initial":  0,
            "available": 0,
            "percentage":  payload.percentage || 0,
            "delete": 0
        }
        /*
        Object.keys(newdata).map((key)=>{
            if(key === 'total'){
                newdata[key]= precio*cantidad
                
            }else{
                newdata[key] = payload[key]
            }
            
        })*/
        console.log(newdata)
        
        
        if (!edit) {
            axios.post('https://backendsalessys.onrender.com/api/v1/budget/', newdata)
              .then(() => {
                console.log('Added');
                onSend(true);
              })
              .catch(console.error);
          } else {
            axios.put(`https://backendsalessys.onrender.com/api/v1/budget/${edit.id}/`, newdata)
              .then(() => {
                console.log('Updated');
                onSend(true);
                onEdit(null);
              })
              .catch(console.error);
          }

          document.getElementById('addFund').reset();
            setCantidad(1)
            setPrecio(1)
        }
        console.log(JSON.stringify(edit))
    useEffect(()=>{
        getType(2)
    },[])
   
    return(
        <>
        <form onSubmit={handleForm} id= "addFund">
            <div className="mb-3" >
                <label htmlFor="fecha" className="form-label">Descripción</label>
                <input  defaultValue={(edit ? edit.description : '' )} type="text" className="form-control" id="description" name='description' aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">Percentage</label>
                <input  defaultValue={(edit ? edit.percentage : '' )} type="text" className="form-control" id="percentage" name="percentage" />
            </div>
            
            <div className="row justify-content-center mt-2">
                <button className="buttonGreen px-2 col-2" data-bs-dismiss="modal" aria-label="Close">Submit</button>
            </div>
        </form>
        </>
    );
}
