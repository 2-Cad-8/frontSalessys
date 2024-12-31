import { useEffect, useState } from "react";
import axios from "axios";

export default function FormAddCustomer ({edit, onSend = f =>f, onEdit=f=>f}){
    const [precio, setPrecio]=useState(edit? edit.precio : 0)
    const [cantidad, setCantidad]=useState( edit? edit.cantidad : 0)
    const [productos, setProductos]=useState()
    const [platforms, setPlatforms]=useState()

    const getType = async (type)=>{
        const data = await axios.get('http://127.0.0.1:8000/api/v1/type')
        const pureData = await data.data;
        const opts = await pureData.filter((opt)=> opt.tipo === type)
       
        if(type ==0){
            setProductos(opts)
        }else{
            setPlatforms(opts)
        }
    } 

    const handleForm = (e)=>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const payload = Object.fromEntries(formData);
        const newdata =  {
        name: payload.name || "N/A", 
        lastname: payload.lastname,
        cedula: parseInt(payload.cedula) || 0,
        phone: payload.phone || "",
        address: payload.address ||"N/A",
        delete:  0
        
      };
        
     
        document.getElementById('addClient').reset();
        setCantidad(1)
        setPrecio(1)
        
        if (!edit) {
            axios.post('http://127.0.0.1:8000/api/v1/customers/', newdata)
              .then(() => {
                console.log('Added');
                onSend(true);
              })
              .catch(console.error);
          } else {
            console.log(newdata)
            axios.put(`http://127.0.0.1:8000/api/v1/customers/${edit.id}/`, newdata)
              .then(() => {
                console.log('Updated');
                onSend(true);
                onEdit(null);
              })
              .catch(console.error);
          }
        
        }

    useEffect(()=>{
        getType(0)
        getType(1)
    },[])
    console.log(`I'm on Form ADD SALES > ${JSON.stringify(edit)}`)
  
    return(
        <>
        <form onSubmit={handleForm} id= "addClient">
            <div className="row">
                <div className="mb-3 col-6" >
                    <label htmlFor="fecha" className="form-label">Name</label>
                    <input  type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp"
                        defaultValue={(edit ? edit.name : '' )}
                    />
                </div>
                    <div className="mb-3 col-6" >
                    <label htmlFor="fecha" className="form-label">Apellido </label>
                    <input  type="text" className="form-control" id="lastname" name='lastname' aria-describedby="emailHelp"
                        defaultValue={(edit ? edit.name : '' )}
                    />
                </div>
                <div className="mb-3 col-6" >
                    <label htmlFor="customer" className="form-label">Cedula</label>
                    <input  type="number" className="form-control" id="cedula" name='cedula' aria-describedby="emailHelp"
                        defaultValue={(edit ? edit.cedula : '' )}
                    />
                </div>
            </div>
          
            <div className="row">
                <div className="mb-3 col-12">
                    <label htmlFor="Cantidad" className="form-label">Telefono</label>
                    <input 
                    type="number" className="form-control" id="phone" name="phone"
                    defaultValue={(edit ? edit.phone : '' )}
                    />
                </div>
            </div>
            <div className="row">
                <div className="mb-3 col-12">
                    <label htmlFor="precio" className="form-label">Direccion</label>
                    <input 
                        type="text" className="form-control" id="address" name="address"
                        defaultValue={(edit ? edit.address : '' )}
                        />
                </div>
               
            </div>
         
            <div className="row justify-content-center mt-2">
                <button className="buttonGreen px-2 col-2" data-bs-dismiss="modal" aria-label="Close">Submit</button>
            </div>
        </form>
        </>
    );

}
