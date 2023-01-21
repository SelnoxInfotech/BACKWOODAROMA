import React, { useContext } from 'react';
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
import Createcontext from "../../Hooks/Context/Context"
import { useSnackbar } from 'notistack';
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
export default function DiscountEdit(props) {
    const { enqueueSnackbar } = useSnackbar();
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    const { dispatch } = useContext(Createcontext)
    const [open, setOpen] = React.useState(false);
    const [Discount_value , SetDiscount_value] = React.useState({
        Discount_value: props.data.Discount_value,
    })
    const [Discount, SetDiscount] = React.useState({
        id: props.data.id,
        Discount_value: props.data.Discount_value,
        Discount_type: props.data.Discount_type,
        Status : props.data.Status,
    });
    const handleChange = (event) => {
        const value = event.target.value 
        SetDiscount({
            ...Discount,
            [event.target.name]: value
        });
    };
    const handleTaxValue = (event) => {
        
        SetDiscount_value({
            ...Discount_value,
            [event.target.name]: parseInt( event.target.value )
        });
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
  
    const Submit = () => {


        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };

        const data = {
            "id": Discount.id,
            "Discount_value" : Discount_value.Discount_value,
            "Discount_type": Discount.Discount_type,
            "Status": Discount.Status
        }
        Axios.post(
            `http://34.201.114.126:8000/AdminPanel/update-Discount/${data.id}`,
            data,
            config
        ).then(() => {
            setOpen(false);
            dispatch({ type: 'api', api: true })
            enqueueSnackbar('Edit Discount success !', { variant: 'success' });
        
        })
    };
    return (
        <div>
            <Button color='success' onClick={handleClickOpen}>
                Edit
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

                                <div className='col-12 Add_Category center'>
                                    <div className="col "> <h2> Edit Discount
                                    </h2>
                                    </div>
                                </div>
                                <div className='col-12 top label  con  '>
                                    <div className='col'>
                                        <label className='label'>
                                        Discount value:
                                        </label>
                                    </div>
                                    <div className='col'>
                                    <TextField   type="number" id="outlined-basic" variant="outlined"  name='Discount_value' value={Discount_value.Discount_value} style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleTaxValue} />
                                    </div>
                                </div>
                                <div className='col-12 top label  con  '>
                                    <div className='col'>
                                        <label className='label'>
                                        Discount type:
                                        </label>
                                    </div>
                                    <div className='col'>
                                        <TextField type="text" id="outlined-basic" variant="outlined" name='Discount_type' value={Discount.Discount_type} style={{ minWidth: 190, fontSize: 15 }}
                                           onChange={handleChange}  />
                                    </div>
                                </div>
                               
                                <div className='col-12 top label  con'>
                                    <div className='col'>
                                        <label className='label'>
                                            Status:
                                        </label>
                                    </div>
                                    <div className='col'>
                                        <Select
                                            name='Status'
                                            value={Discount.Status}
                                            onChange={handleChange}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 190, fontSize: 15 }}>
                                            <MenuItem value={"Active"} style={{ fontSize: 15 }}>Active</MenuItem>
                                            <MenuItem value={"Hide"} style={{ fontSize: 15 }}>Hide</MenuItem>

                                        </Select>
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