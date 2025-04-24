import { FaPen } from "react-icons/fa";

export default function EditBtn({itemId,form,modal_title,clicked= f =>f}){
    console.log()
    
    return(

        <>
            {/*<!-- Button trigger modal -->*/}
        <div 
        id={itemId} 
        onClick={()=>{
            clicked(itemId)
        }} 
        type="button" className=" "  data-bs-toggle="modal" data-bs-target="#editModal">
        
         <FaPen className=""  size={14} style={{color:'#fec106'}} />  
     
        </div>

        {/*<!-- Modal -->*/}
        <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">{modal_title}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
               {form}
            </div>
           
            </div>
        </div>
        </div>
        </>
    );
}