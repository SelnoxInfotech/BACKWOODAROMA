
import React, { useEffect, useState } from "react";
import axios from "axios"
import Cookies from 'universal-cookie';
export default function StatusBarCard() {
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    const [totel , setTotal] = useState([])
    useEffect(() => {
        axios("http://34.201.114.126:8000/AdminPanel/Get-TotalCount/" ,{
            
        headers: {
            'Authorization': `Bearer ${token_data}`
          }

        }).then(response => {
            setTotal(response.data.Data)  
            
        })
    },[token_data])
   
    return (
        <div className='container border'>
            <div className='row row-cols-sm-2 row-cols-md-4'>
               {
                totel.map((data,index)=>{
                   return(
                    <div className='col top' key={index}>
                    <div className=' width'>
                        <div className='row backg'>
                            <div className='col-12 '>
                                <span className='card_hadding'>{data.title}</span>
                            </div>
                            <div className='col-12 cardn_number card_hadding'>
                                <span style={{ color: "#FE5722" }} >{data.total}</span>
                            </div>
                            <div className='col-12'>
                                <div className="">
                                <div className={"progress " + data.title.replaceAll(' ','') } >
                                    <div className="progress-bar " role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="1"></div>
                                </div>
                                </div>
                            </div>
                            <div className='col-12 con'>
                                <span className='card_persent_font'>4.6%</span> <span className='Today_card_status'>Today</span>
                            </div>
                        </div>
                    </div>
                </div>
                   )
                })
               }
                
                
            </div>
            
        </div>
    )
}
