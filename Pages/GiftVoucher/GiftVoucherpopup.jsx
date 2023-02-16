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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Checkbox from '@mui/material/Checkbox';

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
export default function GiftVoucherpopup() {
    const [bound, Setbound] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [expires, Setexpires] = React.useState('');
    const [Gift_Voucher , SetGift_Voucher] = React.useState({
       
        percentage:"",
        repeat : "",
        type :"percent"

    })

    const handleChange = (event) => {
        const value = event.target.value
        SetGift_Voucher({
            ...Gift_Voucher,
            [event.target.name]: value
        });
    }
    const handledate = (e) => {
        Setexpires(e.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleChangeCheckbox = () => {
        Setbound(bound => !bound);
      };


    const Submit = () => {
        const cookies = new Cookies();
        const token_data = cookies.get('Token_access')


        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };

        const data = {
            bound:bound,
            expires:expires,
            percentage:parseInt(Gift_Voucher.percentage),
            repeat :parseInt( Gift_Voucher.repeat),
            type :Gift_Voucher.type
        }
        Axios.post(
            'http://34.201.114.126:8000/AdminPanel/GiftVoucherViewSet/',
            data,
            config
        ).then(() => {
            setOpen(false);
        })
    };


    return (
        <div>

            <Button variant="outlined" onClick={handleClickOpen}>
                + Add Gift Voucher
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
                                    <div className="col "> <h2> Add Gift Voucher
                                    </h2>
                                    </div>
                                </div>
                                <div className='col-12 top  Add_Category_pop  con  '>
                                    <div className='col-2'>
                                        <label className=''>
                                            User:
                                        </label>
                                    </div>
                                    <div className='col-10 '>
                                        <TextField type="number" placeholder='Add code' id="outlined-basic" variant="outlined"  style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className='col-12 top  Add_Category_pop  '>
                                    <div className='col-2'>
                                        <label >
                                            Type :
                                        </label>
                                    </div>
                                    <div className='col-10 '>
                                    <Select
                                            value={Gift_Voucher.type}
                                            name="type"
                                            onChange={handleChange}
                                            inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 190, fontSize: 15, background: "#AAAAAA" }}
                                        >
                                            <MenuItem value={"percent"} style={{ fontSize: 15 }}>Persent</MenuItem>
                                            <MenuItem value={"value"} style={{ fontSize: 15 }}>Value</MenuItem>

                                        </Select>
                                    </div>
                                </div>
                                <div className='col-12 top   Add_Category_pop'>
                                    <div className='col-2'>
                                        <label className=''>
                                            Expires:
                                        </label>
                                    </div>
                                    <div className='col-10 '>
                                    <TextField
                                            id="date"
                                            value={expires}
                                            name=  "expires"
                                            onChange={handledate}
                                            type="datetime-local"
                                            inputProps={{
                                                min: new Date().toISOString().slice(0, 16)
                                              }}
                                            sx={{ width: 190 ,fontSize:25 }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            ></TextField>
                                    </div>
                                </div>
                           
                                <div className='col-12 top  Add_Category_pop '>
                                    <div className='col-2'>
                                        <label className=''>
                                            Percentage:
                                        </label>
                                    </div>
                                    <div className='col-10 '>
                                        <TextField type="number" placeholder='Add Percentage' name='percentage' value={Gift_Voucher.percentage} id="outlined-basic" variant="outlined" style={{ minWidth: 190, fontSize: 15 }}
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
                                        <TextField type="number" placeholder='Add repeat' id="outlined-basic" variant="outlined" name='repeat' value={Gift_Voucher.repeat} style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className='col-12 top  Add_Category_pop '>
                                    <div className='col-2 '>
                                    <label >
                                            Bound
                                        </label>
                                    </div>
                                    <div className='col-10 '>
                                        
                                        
                                    <Checkbox    defaultChecked={false}    value={bound}  name="bound" onChange={handleChangeCheckbox}  />
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