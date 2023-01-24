import * as React from 'react';
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
import axios from "axios"
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle() {

}
export default function CityPopUp() {
    const [open, setOpen] = React.useState(false);
    const [Status, setStatus] = React.useState('');
    const [State, setState] = React.useState('');
    const [Namecountries, setNamecountries] = React.useState([]);
    const [Totel , setTotal] = React.useState([])
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    const handleStatus = (event) => {
        setStatus(event.target.value);
    };
    const handleName = (event) => {
        setNamecountries(event.target.value.toUpperCase());

    };
    const handleState = (event) => {
        setState(event.target.value);

    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        axios("http://34.201.114.126:8000/AdminPanel/Get-States", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            setTotal(response.data)

        })
    }, [token_data])

    const Submit = () => {


        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };

        const data = {
            "CityName": Namecountries,
            "Status": Status,
            "States_id": State
        }
        Axios.post(
            'http://34.201.114.126:8000/AdminPanel/Add-Cities/',
            data,
            config
        ).then(() => {
            setOpen(false);
        })
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                + Add Cities
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

                                <div className='col-12 Add_countries Add_Category center'>
                                    <div className="col "> <h2> Add Cities
                                    </h2>
                                    </div>
                                </div>
                                <div className='col-12 top label  con  '>
                                    <div className='col'>
                                        <label className='label'>
                                            Cities Name:
                                        </label>
                                    </div>
                                    <div className='col'>
                                        <TextField placeholder='Add  Cities Name' id="outlined-basic" variant="outlined" value={Namecountries} style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleName} />
                                    </div>
                                </div>
                                <div className='col-12 top label  con  '>
                                    <div className='col'>
                                        <label className='label'>
                                            State Name:
                                        </label>
                                    </div>
                                    <div className='col'>
                                        <Select
                                            value={State}
                                            onChange={handleState}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 190, fontSize: 15 }}>
                                            <MenuItem value="" disabled style={{ fontSize: 15 }}>
                                                <em>Select option</em>
                                            </MenuItem>
                                            {
                                                Totel.map((State) => {
                                                    return (
                                                        <MenuItem style={{ fontSize: 15 }} key={State.id} value={State.id}  >
                                                            {State.StateName}
                                                        </MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
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

                                            value={Status}
                                            onChange={handleStatus}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 190, fontSize: 15 }}>
                                            <MenuItem value="" disabled style={{ fontSize: 15 }}>
                                                <em>Select option</em>
                                            </MenuItem>
                                            <MenuItem value={"Active"} style={{ fontSize: 15 }}>Active</MenuItem>
                                            <MenuItem value={"Hide"} style={{ fontSize: 15 }}>  Hide</MenuItem>



                                        </Select>
                                    </div>
                                </div>

                                <div className='col-12 center top' >
                                    <button className='btn Sub_button' autoFocus onClick={Submit} style={{ fontSize: 15 }}>
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