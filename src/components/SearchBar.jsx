import { FaSearch } from "react-icons/fa";
import axios from "axios";

export default function SearchBar({onSearch= f=>f, tableURL,helper}){
    const handleSearch = (e)=>{
        e.preventDefault();
        const formData = new FormData(e.target)
        const payload = Object.fromEntries(formData);
        if(payload.name != ''){
            console.log(tableURL)
            //http://localhost:8000/api/v1/${tableURL}/${payload.name}/
            axios.get(`http://localhost:8000/api/v1/${tableURL}/${payload.name}`)
            .then((res)=>{
                console.log(res.data)
                onSearch(res.data)
            })
            .catch((e)=> {console.error(e)})
        }else{
            onSearch(null)
        }
    }
    return(
        <>
           
                <form onSubmit={handleSearch} className="row ">
                    <div class="mb-3 col-11">
                        <input type="text" name="name" class="form-control " id="text" aria-describedby="emailHelp"
                            placeholder={helper}
                        />
                    </div>
                    <div className="col-1 ">
                    <button type="submit" className="btn btn-primary "><FaSearch/></button>
                    </div>
                    
                </form>

        </>
    );
}