export default function SimpleCardAmount({title, amount}) {
 return (
    <>
    <div className="card border-light p-3 m-3" style={{borderRadius:20}} >
        <h5 className="card-title"> {title}</h5>
        <p className="card-text text-center fs-2 pb-2">${amount}</p>
    </div>
    </>
 )
}
/*<div className="card" style="width: 18rem;">
        style={{minWidth:"18.125rem",minHeight:"7.5rem"}}
<div className="card-body">
    <h5 className="card-title"> Income </h5>
    <p className="card-text"> 50</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
</div>
</div>*/