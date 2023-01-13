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
import { useSnackbar } from 'notistack';
import Createcontext from "../../Hooks/Context/Context"
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
export default function CountryEdit(props) {
    const { enqueueSnackbar } = useSnackbar();
    const { dispatch } = useContext(Createcontext)
    const [open, setOpen] = React.useState(false);
    const [Country, SetCountry] = React.useState({
        id: props.data.id, 
        Countryname: props.data.CountryName.toUpperCase(),
        Status: props.data.Status
    });

    const handleChange = (event) => {
        const value = event.target.value;
        SetCountry({
            ...Country,
            [event.target.name]: value
        });
    };
    const handleClickOpen = () => {
        setOpen(true);
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

        const data = {
            "id" : Country.id,
            "CountryName": Country.Countryname.toUpperCase(),
            "Status": Country.Status
        }
        Axios.post(
            `http://34.201.114.126:8000/AdminPanel/update-Country/${data.id}`,
            data,
            config
        ).then(() => {
            setOpen(false);
            dispatch({ type: 'api', api: true })
            enqueueSnackbar('Edit Countries success !', { variant: 'success' });
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
                                    <div className="col "> <h2> Edit country
                                    </h2>
                                    </div>
                                </div>
                                <div className='col-12 top label  con margn_top '>
                                    <div className='col'>
                                        <label className='label'>
                                            Name:
                                        </label>
                                    </div>
                                    <div className='col'>
                                        <TextField  id="outlined-basic" variant="outlined" name='Countryname' value={Country.Countryname.toUpperCase()} style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleChange} />
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
                                        value={Country.Status}
                                        onChange={handleChange}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }} style={{minWidth: 190 , fontSize:15}}>
                                        <MenuItem value={"Active"} style={{ fontSize:15}}>Active</MenuItem>
                                        <MenuItem value={"Hide"} style={{ fontSize:15}}>Hide</MenuItem>

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