import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Cookies from 'universal-cookie';
import Axios from "axios"
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MdFileUpload } from 'react-icons/md';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {

}
export default function Couponpopup() {

    const [open, setOpen] = React.useState(false);
    const [expires, Setexpires] = React.useState("");

    const [Coupon, SetCoupon] = React.useState({
        bound: false,
        code: "",
        code_l: "",
       
        percentage: "",
        repeat: "",
        type: "percent"
    });

 const handledate = (newValue) => {
    Setexpires(newValue.$d.slice(0,15));
    
    //
  };
  console.log(expires)

    const handleChange = (event) => {
        const value = event.target.value
        SetCoupon({
            ...Coupon,
            [event.target.name]: value
        });
    }




    const handleClickOpen = () => {
        setOpen(true);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    };
    const handleClose = () => {
        setOpen(false);
    };



    const Submit = () => {
        const cookies = new Cookies();
        const token_data = cookies.get('Token_access')


        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };


        Axios.post(
            'http://34.201.114.126:8000/AdminPanel/CouponViewSet/',
            config
        ).then(() => {
            setOpen(false);
        })
    };


    return (
        <div>

            <Button variant="outlined" onClick={handleClickOpen}>
                + Add Coupon
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "60%",
                            height: "60%",
                            maxWidth: "none",  // Set your width here
                        },
                    },
                }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Modal title
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div className='container-fluid '>
                        <div className='row '>

                            <div className='col-12    ' >

                                <div className='col-12    center'>
                                    <div className="col "> <h2> Add Coupon
                                    </h2>
                                    </div>
                                </div>
                                <div className='col-12 top  Add_Category_pop  con  '>
                                    <div className='col-2'>
                                        <label className=''>
                                            code:
                                        </label>
                                    </div>
                                    <div className='col-10 '>
                                        <TextField type="text" placeholder='Add code' id="outlined-basic" variant="outlined" style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className='col-12 top  Add_Category_pop  '>
                                    <div className='col-2'>
                                        <label >
                                            code L:
                                        </label>
                                    </div>
                                    <div className='col-10 '>
                                        <TextField type="text" placeholder='Add  code L' id="outlined-basic" variant="outlined" style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className='col-12 top   Add_Category_pop'>
                                    <div className='col-2'>
                                        <label className=''>
                                            Type:
                                        </label>
                                    </div>
                                    <div className='col-10 '>
                                        <Select
                                            value={Coupon.type}
                                            name="type"
                                            onChange={handleChange}

                                            inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 190, fontSize: 15, background: "#AAAAAA" }}
                                        >


                                            <MenuItem value={"percent"} style={{ fontSize: 15 }}>Persent</MenuItem>
                                            <MenuItem value={"value"} style={{ fontSize: 15 }}>Value</MenuItem>

                                        </Select>
                                    </div>
                                </div>
                                <div className='col-12 top  Add_Category_pop '>
                                    <div className='col-2'>
                                        <label className=''>
                                            Expires:
                                        </label>
                                    </div>
                                    <div className='col-10 '>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DesktopDatePicker
                                            inputFormat="MM/DD/YYYY"

                                           value={expires}
                                            onChange={handledate}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                         </LocalizationProvider>
                                    </div>
                                </div>
                                <div className='col-12 top  Add_Category_pop '>
                                    <div className='col-2'>
                                        <label className=''>
                                            Percentage:
                                        </label>
                                    </div>
                                    <div className='col-10 '>
                                        <TextField type="number" placeholder='Add Percentage' id="outlined-basic" variant="outlined" style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className='col-12 top  Add_Category_pop '>
                                    <div className='col-2'>
                                        <label >
                                            Repeat:
                                        </label>
                                    </div>
                                    <div className='col-10 '>
                                        <TextField type="number" placeholder='Add Alt Text' id="outlined-basic" variant="outlined" style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className='col-12 top  Add_Category_pop '>
                                    <div className='col-2 center'>
                                        <input type="checkbox" />
                                    </div>
                                    <div className='col-10 '>
                                        <label >
                                            Bound
                                        </label>
                                    </div>
                                </div>
                                <div className='col-12 center top' >
                                    <button className='btn Sub_button' autoFocus onClick={Submit} >
                                        Save changes
                                    </button>
                                </div>

                            </div>

                        </div>

                    </div>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Exit
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}