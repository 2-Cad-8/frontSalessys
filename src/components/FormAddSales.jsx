import { useEffect, useState } from "react";
import axios from "axios";
import { searchProduct } from "../functions/extra";

export default function FormAddSales ({edit, onSend = f =>f, onEdit=f=>f}){
    const [precio, setPrecio]=useState(edit? edit.precio : 0)
    const [cantidad, setCantidad]=useState( edit? edit.cantidad : 0)
    //const [productos, setProductos]=useState()
    const [platforms, setPlatforms]=useState()
    const [codPro, setCodPro] =useState([]);

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

    const handleCodPro =(e)=>{
        try{
        let desc = document.getElementById('descripcion')
        let price = document.getElementById('precio')
        desc.value = e.name
        price.value = e.price
        }catch(error){
            console.error('error'+error)
        }
    }

    const restProduct = (amount)=>{
       // setCodPro(codPro.units = newdata)
        console.log(codPro)
        axios.get(`http://localhost:8000/api/v1/inventory/${codPro.id}/`)
        .then(res =>{
            console.log(res)
            res.data.units = res.data.units - amount
            console.log(res)
           axios.put(`http://localhost:8000/api/v1/inventory/${codPro.id}/`,res.data)
            .then(()=> {
                console.log('rested')
                setCodPro([])
            })
            .catch(error => console.error(error))
    }). catch(e => console.error('ERROR EN RESTPRODUCT FORM ADD SALES: '+e))
    }

    const handleForm = (e)=>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const payload = Object.fromEntries(formData);
        const newdata =  {
        fecha: payload.fecha || "2024-08-05", 
        descripcion:codPro.name || edit.descripcion|| "", //payload.descripcion || "",
        cantidad: parseInt(payload.cantidad) || 0,
        precio:parseFloat(codPro.price) || edit.precio|| 0, //parseFloat(payload.precio) || 0,
        plataforma: payload.plataforma || "",
        total: codPro.price * cantidad|| edit.precio * cantidad || edit.total,//precio * cantidad,
        cod_product: payload.cod_product || '',
        customer: payload.customer || '',
        delete: 0,
       
      };
        
     
        document.getElementById('addSales').reset();
        setCantidad(1)
        setPrecio(1)
        //console.log(newdata)
        
        
        if (!edit) {
            axios.post('http://127.0.0.1:8000/api/v1/sales/', newdata)
              .then(async () => {
                //console.log('Added');
                onSend(true);
                restProduct(cantidad)
              })
              .catch(console.error);
          } else {
            console.log(newdata)
           axios.put(`http://127.0.0.1:8000/api/v1/sales/${edit.id}/`, newdata)
              .then(() => {
               // console.log('Updated');
                onSend(true);
                onEdit(null);
              })
              .catch(console.error);
          }
        
        }

    useEffect(()=>{
       // getType(0)
        getType(1)
    },[])
    console.log(`I'm on Form ADD SALES > ${JSON.stringify(edit)}`)
  
    return(
        <>
        <form onSubmit={handleForm} id= "addSales">
            <div className="row">
                <div className="mb-3 col-6" >
                    <label htmlFor="fecha" className="form-label">Fecha</label>
                    <input  type="date" className="form-control" id="fecha" name='fecha' aria-describedby="emailHelp"
                        defaultValue={(edit ? edit.fecha : '' )}
                    />
                </div>
                <div className="mb-3 col-6" >
                    <label htmlFor="customer" className="form-label">Nombre</label>
                    <input  type="text" className="form-control" id="customer" name='customer' aria-describedby="emailHelp"
                        defaultValue={(edit ? edit.fecha : '' )}
                    />
                </div>
            </div>
            <div className="row">
                <div className="mb-3 col-3">
                    <label htmlFor="cod_product" className="form-label">Codigo</label>
                    <input  
                        type="text" 
                        className="form-control"
                         id="cod_product" 
                         name="cod_product" 
                         onChange={async (e)=>{
                            
                            const res = await searchProduct(e.target.value)
                            setCodPro(res)
                            handleCodPro(res)
                            console.log(codPro)
                        }} 
                        defaultValue={(edit ? edit.cod_product:'' )}
                    />
                </div>
                <div className="mb-3 col-9">
                    <label htmlFor="descripcion" className="form-label">Descripcion</label>
                    <input  type="text" className="form-control" id="descripcion" name="descripcion" 
                        disabled
                        defaultValue={(edit ? edit.descripcion : '' )}
                    />
                </div>
            </div>
            <div className="row">
                <div className="mb-3 col-4">
                    <label htmlFor="Cantidad" className="form-label">Cantidad</label>
                    <input 
                    onChange={
                        (e)=>{
                            setCantidad(e.target.value)
                            console.log(cantidad)
                        }}
                    type="number" className="form-control" id="cantidad" name="cantidad"
                    defaultValue={(edit ? edit.cantidad : '' )}
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
                        type="number" className="form-control" id="precio" name="precio"
                        disabled
                        defaultValue={(edit ? edit.precio : '' )}
                        />
                </div>
                <div className="mb-3 col-4">
                    <label htmlFor="total" className="form-label">Total</label>
                    <input  type="number" className="form-control" id="total" disabled value={
                        edit? edit.total : codPro ? codPro.price * cantidad :0} name="total"

                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-12">
                        <select className="form-select " aria-label="Default select example" name="plataforma"  >
                            <option  >select a platform</option>
                            {
                                platforms?
                            platforms.map((platform,i) =>{
                                    if(edit && edit.plataforma == platform.descripcion)  return <option value={platform.descripcion} key={i} selected>{platform.descripcion} </option>
                                    return <option value={platform.descripcion} key={i}>{platform.descripcion} </option>
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