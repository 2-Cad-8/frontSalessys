import axios from "axios";
import { useRef } from "react";

export default function FilterButton({options,url,onSearch= f =>f,}){
    const preValueRef = useRef(null)
    console.log(options)
    const handleSelection = async (e)=>{
        let val = e.target.value;

        let rawdata = await axios.get(url.replace('value',val));
        onSearch(rawdata.data)
        //console.log('here is the rawdata')
        //console.log(rawdata.data)
    }
    return(
        <>
           <select className="form-select" aria-label="Default select example"
            onChange={(e)=> handleSelection(e)}
           >
            <option defaultValue>Filter By</option>
            {
                options.map((item,i)=>{
                return <option id={item.descripcion} key={i} value={item.descripcion} >{item.descripcion}</option>
                
            }) }
            </select>
        </>
    )
}