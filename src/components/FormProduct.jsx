import { useEffect, useState } from "react";
import axios from "axios";

export default function FormAddProducts ({edit, onSend = f =>f, onEdit=f=>f}){
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
        cod_product: payload.cod_product || "N/A", 
        name: payload.name || "",
        units: parseInt(payload.units) || 0,
        price: parseFloat(payload.price) || 0,
        category: payload.category || "",
        delete:  0
        
      };
        
     
        document.getElementById('addProduct').reset();
        setCantidad(1)
        setPrecio(1)
        
        if (!edit) {
            axios.post('http://127.0.0.1:8000/api/v1/inventory/', newdata)
              .then(() => {
                console.log('Added');
                onSend(true);
              })
              .catch(console.error);
          } else {
            //console.log(newdata)
            axios.put(`http://127.0.0.1:8000/api/v1/inventory/${edit.id}/`, newdata)
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
    //console.log(`I'm on Form ADD SALES > ${JSON.stringify(edit)}`)
  
    return(
        <>
        <form onSubmit={handleForm} id= "addProduct">
            <div className="row">
                <div className="mb-3 col-3" >
                    <label htmlFor="fecha" className="form-label">Codigo</label>
                    <input  type="text" className="form-control" id="cod_product" name='cod_product' aria-describedby="emailHelp"
                        defaultValue={(edit ? edit.cod_product : '' )}
                    />
                </div>
                <div className="mb-3 col-9" >
                    <label htmlFor="customer" className="form-label">Descripcion</label>
                    <input  type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp"
                        defaultValue={(edit ? edit.name : '' )}
                    />
                </div>
            </div>
          
            <div className="row">
                <div className="mb-3 col-4">
                    <label htmlFor="Cantidad" className="form-label">Unidades</label>
                    <input 
                    onChange={
                        (e)=>{
                            setCantidad(e.target.value)
                            console.log(cantidad)
                        }}
                    type="number" className="form-control" id="units" name="units"
                    defaultValue={(edit ? edit.units : '' )}
                    />
                </div>
                <div className="mb-3 col-4">
                    <label htmlFor="precio" className="form-label">Precio</label>
                    <input onChange={
                        (e)=>{
                            setPrecio(e.target.value)
                            console.log(precio)
                        }
                        } 
                        type="number" className="form-control" id="price" name="price"
                        defaultValue={(edit ? edit.price : '' )}
                        />
                </div>
                <div className="mb-3 col-4">
                    <label htmlFor="total" className="form-label">Categoria</label>
                    <input  type="text" className="form-control" id="category"  name="category"
                         defaultValue={(edit ? edit.category : '' )}
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