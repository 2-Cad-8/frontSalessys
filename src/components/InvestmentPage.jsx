import TableCard from "./TableCard"
import FormInvest from "./FormInvest.jsx"; 
import { useEffect, useState } from "react";
import axios from "axios";


const titlesInv =['Fecha','Descripcion','Total','Fund','Acciones'];

export default function InvestmentPage(){
   const [edit, setEdit] = useState(null)
   const [investData, setInvestData] =  useState()
   const [sent, setSent] = useState(false)
   //************************************************************FUNCTIONS
   async function getData(){
    try{
    const res = await axios.get('http://127.0.0.1:8000/api/v1/investments/')
    const datos = res.data.filter((item)=> item.delete != 1)
    console.log(datos)

   
    setInvestData(datos)
    
    console.log(investData)
    }catch(error){
        console.error(error)
    }
}
useEffect(()=>{
    getData()
    if(sent== true) setSent(false)
    console.log(sent)
},[sent])

    return(
        <>
        <div className='container '>
         <div className="container gradient-bg-256 pb-4">   
        
         
            <div className='row justify-content-start ms-3'>
              <div className='fs-3 py-2 col-3 text-white'>Investments </div>
              <div className='col-2 ' >
                <button className='buttonGreen mt-2'
                  data-bs-toggle="modal" data-bs-target="#exampleModal"
                > Add</button>
              </div>
              
            </div>
            <div className="container">
              <div className="card border-light p-2" style={{borderRadius:"1.25rem"}}>
                <TableCard 
                    colTitles={titlesInv} 
                    data={investData}
                    target={'#exampleModal'}
                    from='investments'
                    onEdit={(data)=>{
                      setEdit(data)
                    }}
                    onSent={(data)=>{
                      setSent(data)
                    }}
                  />
              </div>
            </div>
        </div>

        {/* MODAL */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">New Investment</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <FormInvest  edit={edit} send ={(value)=>{
                    setSent(value)
                  }}
                  onEdit={(data)=>{
                    setEdit(data)
                  }}
                  />
              </div>
            </div>
          </div>
        </div>
        </div>
        </>
    )
}