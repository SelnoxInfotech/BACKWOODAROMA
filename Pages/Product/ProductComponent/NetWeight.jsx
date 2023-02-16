import React from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Cookies from 'universal-cookie';
import Axios from "axios"

export default function NetWeight({ Product, SetProduct }) {
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    const [net_weight, SetNet_Weight] = React.useState([])

    const handleChange = (event) => {
        SetProduct({
            ...Product, [event.target.name]: event.target.value
        });
    }


    React.useEffect(() => {
        Axios("http://34.201.114.126:8000/AdminPanel/Get-NetWeight/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            SetNet_Weight(response.data)
            if(Product.net_weight === "")
            SetProduct(Product => ({ ...Product, net_weight: response.data[0].id }))

        })


    },[token_data,Product.net_weight,SetProduct])

    return (
        <div>
            <div className='col-4 Weight_Type '>
                <label className=''>
                    Weight Type:
                </label>
            </div>
            <div className='col-8 Weight_Type'>

                <Select
                    value={Product.net_weight}
                    name='net_weight'
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 190, fontSize: 15 }}>

                    {
                        net_weight.map((data, index) => {
                            return (<MenuItem value={data.id} style={{ fontSize: 15 }} key={index}>{data.Weight_type}</MenuItem>)
                        })
                    }
                </Select>
            </div>
        </div>
    )
}
