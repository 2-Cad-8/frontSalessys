import TableCard from "./TableCard"
import FormAddProducts from "./FormProduct";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PageInventory(){
    const [edit, setEdit] = useState(null)
    const [data, setData] = useState([])  
    const [sent, setSent] = useState(false)

    const titlesSales =['Cod_product','Name','Units','Price','Category','Acciones'];

     async function getData(){
        try{
        const res = await axios.get('http://127.0.0.1:8000/api/v1/inventory/')
        const datos = res.data.filter((item)=>{if (item.delete !=1){
          return item
        }})
        console.log(datos)

       
        setData(datos)
        
        console.log(data)
        }catch(error){
            console.error(error)
        }
    }
    

    useEffect(()=>{
        getData()
        if(sent== true) setSent(false)
    },[sent])
    return(
        <>
          <div className="container gradient-bg-256 pb-4">
            <div className='container mt-1 '>
              <div className='row justify-content-start ms-3'>
                <div className='fs-3 py-2 col-2 text-white'>Inventory </div>
                <div className='col-1'>
                  <button className='buttonGreen mt-2'
                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                  > Add</button>
                </div>
                
              </div>
              <div className="container">
              <div className="card border-light p-2" style={{borderRadius:"1.25rem"}}>
              {data ? 
                <TableCard 
                colTitles={titlesSales} 
                data={data} 
                target={"#exampleModal"} 
                from="inventory"
                  onEdit={(data)=>{
                    setEdit(data)
                  }}
                  onSent={(data)=>{
                    setSent(data)
                  }}
                  inventory={['units',0]}
                />
                :
                <p>Sin Datos</p>
              }
              </div>
              </div>
            </div>
   
          </div>
          {/* MODAL */}
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Add New Product</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <FormAddProducts edit ={edit} onSend = {(value)=>{
                      setSent(value)
                  }}
                    onEdit={(value)=>{
                      setEdit(value)
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )
}