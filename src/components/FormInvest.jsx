import { useEffect, useState } from "react";
import axios from "axios";

export default function FormInvest ({edit,send = f=>f, onEdit = f =>f}){
    const [precio, setPrecio]=useState(edit? edit.precio : 0)
    const [cantidad, setCantidad]=useState(edit? edit.cantidad : 0)
    const [investType, setInvestType]=useState()

    const getType = async ()=>{
        const data = await axios.get('http://127.0.0.1:8000/api/v1/budget')
        const pureData = await data.data;
        console.log(pureData)
        setInvestType(pureData)
    } 

    const handleRestFund = (amount,idFund)=>{
        
        axios.get(`http://localhost:8000/api/v1/budget/${idFund}/`)
        .then(async res =>{
            console.log(res.data)
            res.data.available =  res.data.available - amount
            console.log(res.data)
          axios.put(`http://localhost:8000/api/v1/budget/${idFund}/`,res.data)
            .then(()=> {
                console.log('rested from fund')
                
            })
            .catch(error => console.error(error))
    }). catch(e => console.error('ERROR EN RESTPRODUCT FORM ADD SALES: '+e))
    }

    const handleForm = (e)=>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const payload = Object.fromEntries(formData);
        const newdata = {
            "fecha": payload.fecha || "2024-06-11",
            "descripcion": payload.descripcion || '',
            "delete": 0,
            "total": parseFloat(payload.total),
            "fund": parseInt(payload.fund) || 0
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
            axios.post('http://127.0.0.1:8000/api/v1/investments/', newdata)
              .then(() => {
                console.log('Added');
                send(true);
                handleRestFund(newdata.total,newdata.fund)
              })
              .catch(console.error);
          } else {
            axios.put(`http://127.0.0.1:8000/api/v1/investments/${edit.id}/`, newdata)
              .then(() => {
                console.log('Updated');
                send(true);
                onEdit(null);
              })
              .catch(console.error);
          }

          //document.getElementById('addInvest').reset();
            //setCantidad(1)
            //setPrecio(1)
        }
        console.log(JSON.stringify(edit))
    useEffect(()=>{
        getType()
    },[])
   
    return(
        <>
        <form onSubmit={handleForm} id= "addInvest">
            <div className="mb-3" >
                <label htmlFor="fecha" className="form-label">Fecha</label>
                <input  defaultValue={(edit ? edit.fecha : '' )} type="date" className="form-control" id="fecha" name='fecha' aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">Descripcion</label>
                <input  defaultValue={(edit ? edit.descripcion : '' )} type="text" className="form-control" id="descripcion" name="descripcion" />
            </div>
            <div className="row">
                <div className="mb-3 col-4">
                    <label htmlFor="total" className="form-label">Total </label>
                    <input  type="number" className="form-control" id="total"  name="total"/>
                </div> 
                    
                <div className="mb-3 col-8">
                <label htmlFor="fund" className="form-label">Cuenta</label>
                    <select  className="form-select " name="fund"  >
                        <option >select a product</option>
                        {
                           investType?
                            investType.map((fund,i) =>{
                                console.log(fund.id)
                                if(edit && edit.id == fund.id)  return <option value={fund.id}  key={i} selected>{fund.description} </option>
                                return <option value={fund.id}  key={i}>{fund.description} </option>
                            })
                            :
                            <option>otro</option>
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
