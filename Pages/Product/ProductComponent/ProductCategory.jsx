import React from 'react'
import { Select , MenuItem } from '@mui/material';
import axios from "axios"
import Cookies from 'universal-cookie';

export default function ProductCategory({ Product, SetProduct }) {
  
    const [SubCategory ,  SetSubCategory] = React.useState([])
    
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    React.useEffect(() => {
        axios("http://34.201.114.126:8000/AdminPanel/Get-SubCategory/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            SetSubCategory(response.data)
           
            if (Product.Sub_Category_id === "")
            SetProduct(Product => ({ ...Product, Sub_Category_id: response.data[0].id }))
        })
    },[SetProduct,token_data,Product.Sub_Category_id])

    const handleChange = (event) => {
        const value = event.target.value;
        SetProduct({
            ...Product, [event.target.name]: value
        });
    };

  return (
    <div>
    <div className='col background'>
        <div className='col-10   '>
            <label className=''>
            Sub Category
            </label>
            <div className='col justify  Add_Category center'>
                <div className='col-2' >
                    <Select
                        name='Sub_Category_id'
                        onChange={handleChange}
                        value={Product.Sub_Category_id}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 190, fontSize: 15, background: "#AAAAAA" }}>
                        <MenuItem style={{ fontSize: 15 }}>
                            <em>No Tax</em>
                        </MenuItem>
                        {
                            SubCategory.map((data, index) => {
                                return (<MenuItem value={data.id} style={{ fontSize: 15 }} key={index}>{data.name}</MenuItem>)
                            })
                        }

                    </Select>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}
