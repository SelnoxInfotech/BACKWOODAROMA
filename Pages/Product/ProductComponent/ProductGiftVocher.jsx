import * as React from "react"
import axios from "axios"
import Cookies from 'universal-cookie';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


export default function ProductGiftVocher({Product ,SetProduct}) {

    const [GiftVocher, SetGiftVocher] = React.useState([])
    const [Coupoun, SetCoupoun] = React.useState([])
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')

    React.useEffect(() => {
        axios("http://34.201.114.126:8000/AdminPanel/GiftVoucherViewSet/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            SetGiftVocher(response.data)
            if(Product.GiftVoucher==="")
            SetProduct(Product => ({ ...Product, GiftVoucher: response.data[0].id }))

        })
        axios("http://34.201.114.126:8000/AdminPanel/CouponViewSet/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            SetCoupoun(response.data)
            if(Product.Claimed_Coupoun==="")
            SetProduct(Product => ({ ...Product, Claimed_Coupoun: response.data[0].id }))

        })


    },[SetProduct,token_data,Product.Claimed_Coupoun,Product.GiftVoucher])

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
                        Gift Voucher / Coupon
                    </label>
                    <div className='col justify  Add_Category '>
                        <div className='col-2 center' >
                            <span>GiftVoucher</span>
                            <Select
                                name='Brand_id'
                                onChange={handleChange}
                                value={Product.GiftVoucher}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 190, fontSize: 15, background: "#AAAAAA" }}>
                              
                                {
                                    GiftVocher.map((data, index) => {
                                        return (<MenuItem value={data.id} style={{ fontSize: 15 }} key={index}>{data.code}</MenuItem>)
                                    })
                                }

                            </Select>
                        </div>
                    </div>
                    <div className='col justify  Add_Category center'>
                        <div className='col-2' >
                            <p>Coupon</p>
                            <Select
                                name='Claimed_Coupoun'
                                onChange={handleChange}
                                value={Product.Claimed_Coupoun}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 190, fontSize: 15, background: "#AAAAAA" }}>
                                
                                {
                                    Coupoun.map((data, index) => {
                                        return (<MenuItem value={data.id} style={{ fontSize: 15 }} key={index}>{data.code}</MenuItem>)
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