import * as React from "react"
import axios from "axios"
import Cookies from 'universal-cookie';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


export default function ProductBrand({ Product, SetProduct }) {

    const [Brand, SetBrand] = React.useState([])
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')

    React.useEffect(() => {
        axios("http://34.201.114.126:8000/AdminPanel/Get-Brand/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            SetBrand(response.data)
            if(Product.Brand_id==="")
            SetProduct(Product => ({ ...Product, Brand_id: response.data[0].id }))

        })



    },[SetProduct,token_data,Product.Brand_id])

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
                        Brand
                    </label>
                    <div className='col justify  Add_Category center'>
                        <div className='col-2' >
                            <Select
                                name='Brand_id'
                                onChange={handleChange}
                                value={Product.Brand_id}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 190, fontSize: 15, background: "#AAAAAA" }}>
                                <MenuItem style={{ fontSize: 15 }}>
                                    <em>No Tax</em>
                                </MenuItem>
                                {
                                    Brand.map((data, index) => {
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