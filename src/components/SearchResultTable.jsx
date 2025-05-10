import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { FaPen, FaTrash } from 'react-icons/fa'
import Pagination from './usePagination'
import EditBtn from './EditBtn'
import DeleteBtn from './DeleteBtn'




export default function SearchResultTable({
    titulos,
    colTitles,
    data,
    from,
    onEdit = f =>f,
    onSent=f =>f,
    editform,
    inventory=[false,false],
    itemsTable = 6
}){
    const [dltItem, setDltItem] = useState(null)
    const [displayData, setDisplayData] = useState(null)
    const [field,param ]= inventory
    
    const dataEdit = async (e) =>{
      
        try{
        let data = await axios.get(`https://backendsalessys.onrender.com/api/v1/${from}/${e}`)
        console.log(`i am the search of edit item returned: ${data}`)
        onEdit(data.data)
      
            
        } catch (error){
            console.error(error)
        }
    }
    const onDelete = async (id) =>{
        console.log('delete function '+ id)
       if(id !== null) {
       try{
        const res = await axios.get(`https://backendsalessys.onrender.com/api/v1/${from}/${id}/`)
        const newdata =  { ...res.data, delete: 1 };
        await axios.put(`https://backendsalessys.onrender.com/api/v1/${from}/${id}/`,newdata)
     
            console.log('deleted')
            onSent(true)
            setDltItem(null)

        }catch(error){
            console.error(error)
        }
    }
}
useEffect(() =>{
    if(typeof(data)=='object'){
        setDisplayData(data)
    }else{
       
    setDisplayData(data)
    
    }
    console.log(colTitles)
    console.log(data)
},[dltItem])


    if(typeof(data)!= "object"){return <p>No Data</p>}
    else{
            return(
                <>
                
                <div className='table-responsive-sm'>
                <table className="table table-md w-auto "  style={{minWidth:'66.875rem'}}>
                    <thead>
                        <tr >
                        {
                            titulos.map((title)=> {
                            return( <th scope="col">{title}</th>)
                        })}
                        
                        </tr>
                    </thead>
                    <tbody>
                        {displayData != null && data.length >0?
                                //SI NO ES UN OBJETO CONTINUA NORMAL
                                
                         (   displayData.map(item=>{
                           console.log(displayData)
                            //const file= item[1]
                            return(<tr key= {item.id} className={item.units === param ? 'table-danger':''}>
                            { //
                                colTitles.map((name)=>{
                                    if(name =='Acciones') {
                                        return <td className='ps-3'> 
                                        <div className='row justify-content-start'>
                                            <div className='col-2'>
                                            <EditBtn 
                                                    className='mx-1' 
                                                    itemId={item.id}
                                                    form={editform}
                                                    modal_title={'Editar'}
                                                    clicked={(res)=>{
                                                        dataEdit(res)
                                                    }}
                                                />
                                            </div>
                                            <div className='col-2'>
                                          
                                            <FaTrash
                                                     className='mx-1 '
                                                     style={{color:'#dc3545'}}
                                                     type='button'
                                                     onClick={()=>{
                                                        setDltItem(item.id)
                                                        console.log(dltItem)
                                                
                                                    }} 
                                                    size={14}
                                                     data-bs-toggle="modal" 
                                                     data-bs-target="#deleteModal"
                                                />
                                              
                                            </div>
                                        </div>
                                               
                                               
                                                </td>
                                    }else{
                                        //console.log(file[name.toLowerCase()])
                                    return <td style={{fontSize:'0.9375rem'}} >{item[name.toLowerCase()]}</td>
                                    }
                                })
                            }
                        </tr>)     
                        }))
                        :
                        //SI ES UN OBJETO ENTONCES
                            
                           
                            <tr key= {data.id}>
                            {console.log('it enters like several items')}
                            { //
                                
                                colTitles.map((name)=>{
                                    if(name =='Acciones') {
                                        return <td className='ps-3'> 
                                        <div className='row justify-content-start'>
                                            <div className='col-2'>
                                            <EditBtn 
                                                    className='mx-1' 
                                                    itemId={data.id}
                                                    form={editform}
                                                    modal_title={'Editar'}
                                                    clicked={(res)=>{
                                                        dataEdit(res)
                                                    }}
                                                />
                                            </div>
                                            <div className='col-2'>
                                          
                                            <FaTrash
                                                     className='mx-1 '
                                                     style={{color:'#dc3545'}}
                                                     type='button'
                                                     onClick={()=>{
                                                        setDltItem(data.id)
                                                        console.log(dltItem)
                                                
                                                    }} 
                                                    size={14}
                                                     data-bs-toggle="modal" 
                                                     data-bs-target="#deleteModal"
                                                />
                                              
                                            </div>
                                        </div>
                                               
                                               
                                                </td>
                                    }else{
                                    return <td style={{fontSize:'0.9375rem'}} >{data[name.toLowerCase()]}</td>
                                    }
                                })
                            }
                        </tr>


                       
                        
                        }
                    </tbody>
                </table>
                </div>
                {/*Her shoud go pagination component */}
                <div className='row justify-content-center'>
                               <div className='col-4 '>
                               <Pagination
                                    data = {data}
                                    itemPerPage={itemsTable}
                                    onChangePage={(newdata)=> {
                                        console.log(newdata)
                                        setDisplayData(newdata)}}
                                />
                                </div>
                                </div>
               
            {/******************************************************DELETE MODAL */}
         


<div className="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Delete </h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className='container mb-2'>
      <div className="modal-body fs-1 text-center fw-semibold">
        Are you sure you want to delete this item?
        <div className='container'>
        <div className='row justify-content-center'>
            <div className='col-2 px-2'>
                <button 
                    type="button" 
                    className="btn btn-secondary text-white " 
                    style={{borderRadius:'20px'}} 
                    data-bs-dismiss="modal">Cancel</button>
            </div>
            <div className='col-4 px-2'>
            <button 
                    onClick={()=>{
                        onDelete(dltItem)}}
                    type="button" 
                    className="btn btn-danger" 
                    style={{borderRadius:'20px'}}
                     data-bs-dismiss="modal"
                    >Delete</button>
        </div>
        </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</div>

                </>
            )
        }
}
