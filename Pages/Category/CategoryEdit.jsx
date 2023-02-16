import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import axios from "axios"
import Cookies from 'universal-cookie';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useSnackbar } from 'notistack';
import Createcontext from "../../Hooks/Context/Context"
import { styled } from '@mui/material/styles';
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

export default function CategEditbox(props) {
    const { dispatch } = useContext(Createcontext)
    const { enqueueSnackbar } = useSnackbar();
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    const [open, setOpen] = React.useState(false);
    const [error, set] = React.useState('')
    const [massage, setmassage] = React.useState()
    const [data, setdata] = React.useState({
        id: props.data.id,
        Category: props.data.name,
        Status: props.data.Status
    });


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setmassage("")
        set('')
    
    };
    const handlechanges = (event) => {
        const value = event.target.value;
        setdata({
            ...data,
            [event.target.name]: value
        });

    }



    function SubmitEditData() {
        const form = {
            "name": data.Category,
            "Status": data.Status
        }
        axios.post(`http://34.201.114.126:8000/AdminPanel/update-Category/${data.id}`, form, {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            if (response) {
                dispatch({ type: 'api', api: true })
                enqueueSnackbar('Edit Category success !', { variant: 'success' });
                setOpen(false);
            }
        }).catch(
            function (error) {
                setmassage(error.response.data.name)
              
                set("red")
               
            }
        )
    }


    return (
        <div>
            <Button color="success" onClick={handleClickOpen}>
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

                <DialogContent>
                    <div className='container-fluid '>
                        <div className='row '>

                            <div className='col-12  ' >

                                <div className='col-12 Add_Category center'>
                                    <div className="col "> <h2> Edit Category
                                    </h2>
                                    </div>
                                </div>
                                <div className='col-12 top label  con'>
                                    <div className='col'>

                                        <label className='label'>
                                            <span className='required'>*</span>
                                            Name:
                                        </label>
                                    </div>
                                    <div className='col'>
                                        <TextField placeholder='Add Category' id="outlined-basic" variant="outlined" value={data.Category.toUpperCase()}
                                        style={{ minWidth: "11vw"}}
                                            label={massage}
                                            InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment>, style: { fontSize: 14 } }}
                                            onChange={handlechanges} name="Category" 
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
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='col-12 top label  con'>
                                    <div className='col'>
                                        <label className='label'>
                                            Status:
                                        </label>
                                    </div>
                                    <div className='col ' >
                                        <Select name='Status' value={data.Status} onChange={handlechanges} displayEmpty inputProps={{ 'aria-label': 'Without label', }} style={{ minWidth: 190, fontSize: 15 }} >
                                            <MenuItem value={"Active"} style={{ fontSize: 15 }}>Active</MenuItem>
                                            <MenuItem value={"Hide"} style={{ fontSize: 15 }}>  Hide</MenuItem>
                                        </Select>
                                    </div>
                                </div>
                                <div className='col-12 center top'>
                                    <button className='btn Sub_button' onClick={SubmitEditData} style={{ fontSize: 15 }}>
                                        Save Changes
                                    </button>
                                </div>



                            </div>




                        </div>

                    </div>
                </DialogContent>
                <DialogActions>
                    <Button color="success" onClick={handleClose}>Exit
                    </Button>
                </DialogActions>

            </BootstrapDialog>
        </div>
    );
}