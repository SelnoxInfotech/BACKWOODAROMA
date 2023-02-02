import React, { useContext, useEffect } from 'react';
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
import Createcontext from "../../Hooks/Context/Context"
import InputAdornment from '@mui/material/InputAdornment';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderWidth: "1px",
            borderColor: 'black',
        },
    },
}));

function BootstrapDialogTitle(props) {

}
export default function StateEdit(props) {
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    const { dispatch } = useContext(Createcontext)
    const [open, setOpen] = React.useState(false);
    const [dropCountry, setCountrydorp] = React.useState([])
    const [error, seterror] = React.useState([])
    const [errorMassager, seterrorMassager] = React.useState()
    const [State, SetCountry] = React.useState({
        id: props.data.id,
        StateName: props.data.StateName,
        Country_id: props.data.Country_id,
        Status: props.data.Status
    });

    const handleChange = (event) => {
        const value = event.target.value;
        SetCountry({
            ...State,
            [event.target.name]: value
        });
        if (event.target.name === "StateName") {
            seterrorMassager("")
            
        }
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        seterrorMassager("")
        seterror("")
    };
    useEffect(() => {

        axios("http://34.201.114.126:8000/AdminPanel/Get-Country/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }
        }).then(response => {
            setCountrydorp([...response.data])
        })
    }, [token_data])
    const Submit = () => {


        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };

        const data = {
            "id": State.id,
            "StateName": State.StateName.toUpperCase(),
            "Country_id": State.Countryname,
            "Status": State.Status
        }
        Axios.post(
            `http://34.201.114.126:8000/AdminPanel/update-States/${data.id}`,
            data,
            config
        ).then(() => {
            setOpen(false);
            dispatch({ type: 'api', api: true })
        
        }).catch(
            function (error) {
                if(error.response.data.StateName){
                    
                    seterrorMassager(error.response.data.StateName)
                    
                }
                else {
                    seterrorMassager(error.response.data.data.StateName[0])
                    
                    
                }
                seterror("red")
               
            }
        )
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
                                    <div className="col "> <h2> Edit State
                                    </h2>
                                    </div>
                                </div>
                                <div className='col-12 top label  con  '>
                                    <div className='col'>
                                        <label className='label'>
                                    <span className='required'>*</span>
                                            State Name:
                                        </label>
                                    </div>
                                    <div className='col'>
                                        <TextField id="outlined-basic" variant="outlined" name='StateName' value={State.StateName.toUpperCase()} style={{ minWidth: "11vw"  }}
                                            InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment>, style: { fontSize: 14  }  }}
                                            onChange={handleChange}
                                            label={errorMassager}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: error,
                                                        height: 55,
                                                    },
                                                },
                                                "& label": {
                                                    fontSize: 13,
                                                    color: "red",
                                                    "&.Mui-focused": {
                                                        marginLeft: 0,
                                                        color: "red",
                                                    }
                                                },
                                                root: {
                                                    textTransform: "uppercase"
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='col-12 top label  con  '>
                                    <div className='col'>
                                        <label className='label'>
                                            Countries Name:
                                        </label>
                                    </div>
                                    <div className='col'>
                                        <Select
                                            name='Countryname'
                                            value={State.Country_id}
                                            onChange={handleChange}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 190, fontSize: 15 }}
                                        >
                                            {
                                                dropCountry.map((country, index) => {
                                                    return (
                                                        <MenuItem value={country.id} key={index} style={{ fontSize: 15 }}>
                                                            {country.CountryName}
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
                                            name='Status'
                                            value={State.Status}
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
                    <Button autoFocus color="success" onClick={handleClose}>
                        Exit
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}