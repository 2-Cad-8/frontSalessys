 import axios from "axios"
 import { useState } from "react"

 let sales= []
 let invest= []
 let fund= []

 async function getSales(){
    try{
        const res = await axios.get('http://127.0.0.1:8000/api/v1/sales/')
        const datos = res.data.filter((item)=>{if (item.delete !=1){
          return item
        }})
        sales=[...datos]
        }catch(error){
            console.error(error)
        }
 }

 async function getInvestments(){
    try{
        const res = await axios.get('http://127.0.0.1:8000/api/v1/investments/')
        const datos = res.data.filter((item)=>{if (item.delete !=1){
          return item
        }})
        invest= [...datos]
        }catch(error){
            console.error(error)
        }
 }

 async function getFunds (){
    try{
        const res = await axios.get('http://localhost:8000/api/v1/budget/')
        const datos = res.data.filter((item)=>{if (item.delete !=1){
          return item
        }})
        
        fund =[...datos]
        }catch(error){
            console.error(error)
        }
 }

 function calculateTotalSales(data){
    let res = 0
        for(let i = data.length -1; i >=0; i--){
          res = res + data[i].total
        }
        return res
 }

 function calculateTotalInvest(data){
    let res = 0
        for(let i = data.length -1; i >=0; i--){
          res = res + data[i].total
        }
        return res
 }

export async function divideFund(){
    await getFunds()
    await getInvestments()
    await getSales()

    let totalsale= calculateTotalSales(sales)
    let totalinvest= calculateTotalInvest(invest)
    let liquid = totalsale - totalinvest
    let res = 0
      
    for(let i = fund.length -1; i >=0; i--){// fix if with map method or actually making a new array
            console.log(fund)
            fund[i].available = liquid * (fund[i].percentage/100)
            let newfund = fund[i]
            console.log(liquid * (fund[i].percentage/100))
            axios.put(`http://127.0.0.1:8000/api/v1/budget/${fund[i].id}/`,newfund)
        }
        return res
}

export async function searchProduct(cod){
    try{
    const res = await axios.get(`http://localhost:8000/api/v1/searchpro/${cod}`)
    const data = await res.data;

    if(data){
        console.log(data)
        return data
    }else{
        return('Este producto no existe')
    }}catch (error){
        console.error(error)
    }
}