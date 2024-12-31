export  const NavBar = ({title,names, screensize, changePage =f =>f }) =>{
    const HandleClick = (e)=>{
      e.preventDefault();
      let page = e.target.innerHTML.toString().toLowerCase();
      console.log('target '+ e.target.innerHTML.toString())
   
      if(page == title.toLowerCase()) page = 'dashboard'
      changePage(page)
    }
    if(screensize <=950){
    return(
        <>
           <nav className="navbar bg-white">
              <div className="container-fluid">
                <a className="navbar-brand ms-5" href="#" onClick={HandleClick} style={{color:"#75A47F"}} >{title}</a>
                <button className="navbar-toggler me-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                  <div className="offcanvas-header">
                    <h5 className="offcanvas-title" style={{color:"#75A47F"}}  id="offcanvasNavbarLabel">{title}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                  </div>
                  <div className="offcanvas-body">
                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                        {names.map((name,i)=>{
                          console.log(name)
                            return(
                                <li className="nav-item" key={i}>
                                    <a className="nav-link" onClick={HandleClick} style={{color:"#75A47F"}}  aria-current="page" href='#'>{name}</a>
                                </li>
                            )
                        })}
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
        </>
    )
  }else{
    return(
      <>
      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container-fluid">
          <a className="navbar-brand ms-5" style={{color:"#75A47F"}}  onClick={HandleClick} href="#">{title}</a>
         
          
            <ul className="navbar-nav me-5">
            {names.map((name,i)=>{
                          console.log(name)
                            return(
                                <li className="nav-item mx-1" key={i}>
                                    <a className="nav-link " style={{color:"#75A47F"}} onClick={HandleClick} aria-current="page" href='#'>{name}</a>
                                </li>
                            )
                        })}
            </ul>
          </div>
        
      </nav>
</>
    )
  }
}