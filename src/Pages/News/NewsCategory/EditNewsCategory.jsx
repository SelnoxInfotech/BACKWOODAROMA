import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import axios from "axios"
import Cookies from 'universal-cookie';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { useSnackbar } from 'notistack';
import Createcontext from "../../../Hooks/Context/Context"
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';

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
        '& .MuiButtonBase-root': {
            fontSize: "1.5625rem",
            color: "#31B665"
        },
    },
}));
export default function NewsCategoryEditbox(props) {
    // const defaultValue = props.data.Description

    const { dispatch } = useContext(Createcontext)
    const { enqueueSnackbar } = useSnackbar();
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    const [open, setOpen] = React.useState(false);
    const [error, seterror] = React.useState()
    const [massage, setmassage] = React.useState()

    const [data, setdata] = React.useState({
        id: props.data.id,
        Category: props.data.name,
    });


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setmassage("")
        seterror("")
    };
    const handlechanges = (event) => {
        const value = event.target.value;
        setdata({
            ...data,
            [event.target.name]: value
        });
        setmassage("")
         seterror("")

    }

   

    function SubmitEditData() {
        const form = {
            "name": data.Category.toUpperCase(),
        }
        axios.post(`http://34.201.114.126:8000/AdminPanel/update-NewsCategory/${data.id}`, form, {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            enqueueSnackbar('Edit News Category success !', { variant: 'success' });
            setOpen(false);
            dispatch({ type: 'api', api: true })
        }).catch(
            function (error) {
                setmassage(error.response.data.name)
                seterror("red")

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
            {/* <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"> */}
                <DialogContent>
                    <div className='container-fluid '>
                        <div className='row '>

                            <div className='col-12  ' >

                                <div className='col-12 Add_Category center'>
                                    <div className="col "> <h2> Edit News Category
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
                                            onChange={handlechanges} name="Category" style={{ minWidth: 190, fontSize: 15 }}
                                            InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment>, style: { fontSize: 14 } }}
                                            label={massage}
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
            {/* </Dialog> */}
        </BootstrapDialog>
        </div>
    );
}