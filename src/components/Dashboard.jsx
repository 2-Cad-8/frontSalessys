import { useEffect, useState } from "react"
import SimpleCardAmount from "./SimpleCard"
import TableCard from "./TableCard"
import axios from "axios"
import BarsChart from "./BarsChart"
import useScreenSize from "./useScreenSize"

export default function Dashboard(){
    const [salesData, setSalesData] = useState()
    const [investData, setInvestData] = useState()
    const screensize = useScreenSize()

    const tableTitle =['Month', 'Amount']


    //DATA RETRIEVING
    const getSales = async() =>{
        const res = await axios.get('https://backendsalessys.onrender.com/api/v1/sales/');
        const data = await res.data.filter((item)=>{
          if(item.delete !=1) return item
        })
        setSalesData(data) ///ADD HERE TO CLEAN DATA AKA IGNORE DELETED ONES (1)
    }
    const getInvestments = async() =>{
      const res = await axios.get('https://backendsalessys.onrender.com/api/v1/investments/');
      const data = await res.data.filter((item)=> item.delete !=1)

      setInvestData(data)
  }

    const totalizer = (data) => {
        let res = 0
       
        for(let i = data.length -1; i >=0; i--){
          res = res + data[i].total
        }
        return res

    }

    const totalMonth =  (array)=>{
      let data = [{
        "month":"enero",
          "amount":0
      },
      {
          "month":"febrero",
          "amount":0
      },
      {
          "month":"marzo",
          "amount":0
      },
      {
          "month":"abril",
          "amount":0
      },
      {
          "month":"mayo",
          "amount":0
      },
      {
          "month":"junio",
          "amount":0
      },
      {
          "month":"julio",
          "amount":0
      },
      {
          "month":"agosto",
          "amount":0
      },
      {
          "month":"septiembre",
          "amount":0
      },
      {
          "month":"octubre",
          "amount":0
      },
      {
          "month":"noviembre",
          "amount":0
      },
      {
          "month":"diciembre",
          "amount":0
      }
      ]
     
      for(let i = 0; i <= 11; i++){
        let result = 0
        array.map((item)=>{
          const date = new Date(item.fecha);
          if(date.getMonth()+1 == i+1){
            result += item.total
          }
        })
        data[i].amount = result
      }
    
      return data;
      
    }

    useEffect(()=>{
          getSales()
          getInvestments()
          
    },[])

    if(screensize.width <=1150){
    return(
        <>
        <div className="container mt-1">
        <div className=" m-2 gradient-bg py-3"> 
             <div className=' row mt-3  mx-2 ' >
          <div className='col-sm-4 '>
          {!salesData ?
            <SimpleCardAmount title={"Income"} amount={0}/>
            :
            <SimpleCardAmount title={"Income"} amount={totalizer(salesData)}/>
           }
           {investData ?
            <SimpleCardAmount title={"Outcome"} amount={totalizer(investData)}/>
            :
            <SimpleCardAmount title={"Outcome"} amount={0}/>
           }
           
          </div>
          <div className='col-sm-8 '> 
          <div className="card border-light p-2" style={{borderRadius:'1.25rem'}}>
          {salesData != undefined && investData !=undefined?
            <BarsChart sales ={totalMonth(salesData)} invest={totalMonth(investData)}/>
            :
            <p>Loading...</p>
            }
            </div>
          </div>
          <div className='row justify-content-evenly mx-2'>
            <div className='col-md-5 my-1  '>
             
              <h3 className='p-1 text-white'>Sales</h3>
              <div className="card border-light p-2" style={{borderRadius:'1.25rem'}}>
              {
                      salesData !=undefined ?
                        <TableCard colTitles={tableTitle} data={totalMonth(salesData)} />
                      :
                      <TableCard colTitles={tableTitle} data={0} />
              }
            
           </div>
            </div>
            <div className='col-md-5 my-1'>
            <h3 className='p-1 text-white'>Investment</h3>
            <div className="card border-light p-2" style={{borderRadius:'1.25rem'}}>
            {investData != undefined?
              <TableCard colTitles={tableTitle} data={totalMonth(investData)} />
            :
            <TableCard colTitles={tableTitle} data={0} />
           }
           </div>
            </div>
          </div>
        </div>
        </div>
        </div>
        </>
    )
  }else{
    return(
      <>
      {console.log(screensize)}
      
        <div className="container my-1">
                          <div className="mb-2 gradient-bg py-3"> 
                          <div className=' row justify-content-center mt-3 mx-2'>
                            <div className='col-sm-3 mt-2'>
                            
                            {salesData != undefined?
                              <SimpleCardAmount title={"Sales"} amount={totalizer(salesData)}/>
                              
                              :
                              <SimpleCardAmount title={"Sales"} amount={0}/>
                              
                            }
                            {investData != undefined?
                              <SimpleCardAmount title={"Investment"} amount={totalizer(investData)}/>
                              :
                              <SimpleCardAmount title={"Investment"} amount={0}/>
                            }
                            
                            </div>
                            <div className='col-sm-8 mt-3'> 
                              <div className="card border-light p-2" style={{borderRadius:"1.25rem"}}>
                              {salesData != undefined && investData != undefined?
                                <BarsChart sales ={totalMonth(salesData)} invest={totalMonth(investData)}/>
                                :
                                <p>Loading...</p>
                                }
                                </div> 
                            </div>
                          </div>

                          {/*New row tables */}
        <div className='row justify-content-evenly mx-2 '>
            <div className='col-md-5 '>
            
              <h3 className='p-1 text-white'>Sales</h3>
              <div className="row">
                  <div className="col-6">
                    <div className="card border-light p-2 mx-1" style={{borderRadius:"1.25rem", width:"fit-content"}}>
                          {
                            salesData != undefined?
                                <TableCard colTitles={tableTitle} data={totalMonth(salesData).slice(0,6)} />
                            :
                                <TableCard colTitles={tableTitle} data={0} />
                          }
                          </div>
                  </div>
                  <div className="col-6">
                    <div className="card border-light p-2 mx-1" style={{borderRadius:"1.25rem", width:"fit-content"}}>
                      {
                        salesData ?
                            <TableCard colTitles={tableTitle} data={totalMonth(salesData).slice(6,12)} />
                        :
                            <TableCard colTitles={tableTitle} data={0} />
                      }
                    </div>
                  </div>
                </div>
            </div>
            <div className='col-md-5 '>
            <h3 className='p-1 text-white'>Investment</h3>
            <div className="row">
                  <div className="col-6">
                        <div className="card border-light p-2 mx-1" style={{borderRadius:"1.25rem", width:"fit-content"}}>
                          {
                            salesData != undefined ?
                            <TableCard colTitles={tableTitle} data={totalMonth(investData).slice(0,6)} /> 
                            :
                                <TableCard colTitles={tableTitle} data={0} />
                          }
                        </div>
                  </div>
                  <div className="col-6">
                  <div className="card border-light p-2 mx-1" style={{borderRadius:"1.25rem", width:"fit-content"}}>
                      {
                        salesData != undefined ?
                        <TableCard colTitles={tableTitle} data={totalMonth(investData).slice(6,12)} />
                        :
                            <TableCard colTitles={tableTitle} data={0} />
                      }
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
