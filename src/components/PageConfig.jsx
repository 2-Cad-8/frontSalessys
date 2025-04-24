
import TableCard from "./TableCard"
import axios from "axios";
import { useEffect, useState } from "react";
import FormType from "./FormType";

export default function PageConfig(){
    const [data, setData] = useState([]) 
    const [sent, setSent] = useState(false)
    const [edit, setEdit] = useState(null)
    const titlesSales =['Descripcion','Tipo','Acciones'];

     async function getData(){
        try{
        const res = await axios.get('http://127.0.0.1:8000/api/v1/type/')
        const datos = res.data.filter((item)=> item.delete !=1)
        console.log(datos)
        datos.map((item)=>{
          switch(item.tipo){
            case 0:
              item.tipo = 'Producto'
              break;
            case 1:
              item.tipo = 'Platforms'
              break;
            case 2:
              item.tipo = 'Investments'
              break;
            case 3:
              item.tipo = 'Payment Method'
              break;
          }
        })
       console.log(datos)
      setData(datos)
        
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
       
          <div className='container mt-2'>
            <div className='container gradient-bg-180 pb-4'>
              <div className='row justify-content-start ps-4'>
                <div className='fs-3 py-2 col-3 text-white'>Configuration </div>
                <div className='col-2'>
                  <button className='buttonGreen mt-2'
                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                  > Add</button>
                </div>
                </div>
                {/*
             
              <div className="row mx-2">
                <div className="col-4">
                    <h4 className="text-white ps-2">Sales</h4>
                    <div className="card border-light p-2" style={{borderRadius:"1.25rem"}}>
                    {data ? 
                <TableCard 
                  colTitles={titlesSales} 
                  data={data.filter((item)=> item.tipo == 0)}  
                  target={"#exampleModal"}  
                  from={'type'}
                  onEdit={(data)=>{
                      setEdit(data)
                    }}
                    onSent={(data)=>{
                      setSent(data)
                    }}
                  />
                :
                <p>Sin Datos</p>
              }
                  </div>
                </div>
                <div className="col-4">
                    <h4 className="text-white ps-2">Investments</h4>
                    <div className="card border-light p-2" style={{borderRadius:"1.25rem"}}>
                    {data ? 
                <TableCard 
                  colTitles={titlesSales} 
                  data={data.filter((item)=> item.tipo == 2)}  
                  target={"#exampleModal"}  
                  from={'type'}
                    onEdit={(data)=>{
                      setEdit(data)
                    }}
                    onSent={(data)=>{
                      setSent(data)
                    }}
                  />
                :
                <p>Sin Datos</p>
              }
                </div>
                </div>
                <div className="col-4">
                    <h4 className="text-white ps-2">Platforms</h4>
                    <div className="card border-light p-2" style={{borderRadius:"1.25rem"}}>
                    {data ? 
                <TableCard 
                  colTitles={titlesSales} 
                  data={data.filter((item)=> item.tipo == 1)} 
                  target={"#exampleModal"} 
                  from={'type'}  
                  onEdit={(data)=>{
                      setEdit(data)
                    }}
                    onSent={(data)=>{
                      setSent(data)
                    }}
                  />
                :
                <p>Sin Datos</p>
              }
                </div>
                </div>

              </div>*/}
           <div className= 'row'>
           <div className="col mx-2">
           <div className="card border-light p-2" style={{borderRadius:"1.25rem"}}>
           {data ? 
                <TableCard 
                  colTitles={['Descripcion','Tipo','Acciones']} 
                  data={data} 
                  target={"#exampleModal"} 
                  from={'type'}  
                  onEdit={(data)=>{
                      setEdit(data)
                    }}
                    onSent={(data)=>{
                      setSent(data)
                    }}
                    itemsTable={10}
                  />
                :
                <p>Sin Datos</p>
              }
              </div>
              </div>
           </div>
            </div>
          </div>
  
          {/* MODAL */}
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">New Type</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <FormType
                  edit={edit}
                   onSend = {(value)=>{
                      setSent(value)
                  }}
                  onEdit = {(value)=>{
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