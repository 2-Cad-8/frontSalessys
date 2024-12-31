
import { useState, useEffect, useMemo } from 'react'
import useScreenSize from './components/useScreenSize'
import {NavBar} from './components/NavBar'

import PageSales from './components/PageSales'
import Dashboard from './components/Dashboard'
import InvestmentPage from './components/InvestmentPage'
import PageConfig from './components/PageConfig'
import PageInventory from './components/PageInventory'
import PageCustomer from './components/PageCustomer'
import PageBudget from './components/PageBudgets'

function App() {
  //TO KNOW WHICH PAGE TO RENDER
  const [page,setPage] = useState('dashboard')
  const screen = useScreenSize()

  const names =  ["Dashboard", "Sales","Investments","Inventory","Customers","Budget","Configuration"]
  const [opts,setOpt] = useState(names)
  const [dataTable, setDataTable] = useState(['i am here'])

  
  

  // SALES PAGE

 //INVESTMENTS PAGE
 

  if(page ==='dashboard'){
    return (
      <>
        <NavBar title={"AProject"} names= {opts} screensize={screen.width} changePage={(page)=>{
            setPage(page)
            console.log('on APP '+ page)
        }}/>
        <Dashboard/>
      </>
    )
  }else if( page==='sales'){
   //TABLE DATA
    
    return(
      <>
       <div className='mb-2 row'>
          <NavBar title={"AProject"} names= {opts} screensize={screen.width} changePage={(page)=>{
              setPage(page)
          }} />
          </div>
      <PageSales/>
      </>
    )
  }else if( page==='investments'){
    return(
      <>
        <div className='mb-2 row'>
        <NavBar title={"AProject"} names= {opts} screensize={screen.width} changePage={(page)=>{
            setPage(page)
        }} />
        <InvestmentPage/>
        </div>
      </>
    )
  }else if( page==='configuration'){
    return(
      <>
        <div className='mb-2 row'>
        <NavBar title={"AProject"} names= {opts} screensize={screen.width}  changePage={(page)=>{
            setPage(page)
        }} />
        <PageConfig/>
        </div>
      </>
    )
  } else if( page==='inventory'){
  return(
    <>
      <div className='mb-2 row'>
      <NavBar title={"AProject"} names= {opts} screensize={screen.width}  changePage={(page)=>{
          setPage(page)
      }} />
      <PageInventory/>
      </div>
    </>
  )
}else if( page==='customers'){
  return(
    <>
      <div className='mb-2 row'>
      <NavBar title={"AProject"} names= {opts} screensize={screen.width}  changePage={(page)=>{
          setPage(page)
      }} />
      <PageCustomer/>
      </div>
    </>
  )
}else if( page==='budget'){
  return(
    <>
      <div className='mb-2 row'>
      <NavBar title={"AProject"} names= {opts} screensize={screen.width}  changePage={(page)=>{
          setPage(page)
      }} />
      <PageBudget/>
      </div>
    </>
  )
}
}

export default App
