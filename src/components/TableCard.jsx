import axios from 'axios'
import { useEffect, useState } from 'react'
import { FaPen, FaTrash} from 'react-icons/fa'
import Pagination from './usePagination'

export default function TableCard({
    colTitles,
    data,
    target,
    from,
    onEdit = f =>f,
    onSent=f =>f , 
    inventory=[false,false],
    itemsTable = 6
}){
    const [dltItem, setDltItem] = useState(null)
    const [displayData, setDisplayData] = useState([])
    const dataEdit = async (e) =>{
      
        try{
        let data = await axios.get(`http://127.0.0.1:8000/api/v1/${from}/${e}`)
     
        onEdit(data.data)
        } catch (error){
            console.error(error)
        }
    }
    const [field,param ]= inventory
    const onDelete = async (id) =>{
        console.log('delete function '+ id)
       if(id !== null) {
       try{
        const res = await axios.get(`http://127.0.0.1:8000/api/v1/${from}/${id}/`)
        const newdata =  { ...res.data, delete: 1 };
        await axios.put(`http://127.0.0.1:8000/api/v1/${from}/${id}/`,newdata)
     
            console.log('deleted')
            onSent(true)
            setDltItem(null)

        }catch(error){
            console.error(error)
        }
    }
}
useEffect(() =>{
    console.log('use effect bro'+dltItem)
    
},[dltItem,displayData])


    if(typeof(data)!= "object"){return <p>No Data</p>}
    else{
            return(
                <>
                <table className="table" style={{minWidth:'11.56rem'}}>
                    <thead>
                        <tr>
                        {colTitles.map((title)=> {
                            return( <th scope="col">{title}</th>)
                        })}
                        
                        </tr>
                    </thead>
                    <tbody>
                        {displayData ?
                            displayData.map((file) =>{
                            
                            return(<tr key= {file.id} className={file.units === param ? 'table-danger':''} >
                            { field ? console.log(file.units === param):''}
                            { //
                               
                                colTitles.map((name)=>{
                                    if(name =='Acciones') {
                                        return <td className='ps-3'> 
                                                <FaPen className='mx-1' 
                                                    onClick={()=>{
                                                    dataEdit(file.id)
                                                }} 
                                                id= {file.id} 
                                                data-bs-toggle="modal" 
                                                data-bs-target={target} />
                                                <FaTrash
                                                     className='mx-1'
                                                     onClick={()=>{
                                                        setDltItem(file.id)
                                                        console.log(dltItem)
                                                    }} 
                                                     data-bs-toggle="modal" 
                                                     data-bs-target="#deleteModal"
                                                />

                                                </td>
                                    }else{
                                    return <td >{file[name.toLowerCase()]}</td>
                                    }
                                })
                            }
                        </tr>)     
                        }):
                            <td className="text-center">No Data</td>
                        
                        }
                    </tbody>
                </table>
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
         


<div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
