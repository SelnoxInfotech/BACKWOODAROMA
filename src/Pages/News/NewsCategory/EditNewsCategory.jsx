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
import Createcontext from "../../../Hooks/Context/Context"
export default function NewsCategoryEditbox(props) {
    const { dispatch } = useContext(Createcontext)
    const { enqueueSnackbar } = useSnackbar();
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    const [open, setOpen] = React.useState(false);
    const [data, setdata] = React.useState({
        id: props.data.id,
        Category: props.data.name,
    });


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
        }
        axios.post(`http://34.201.114.126:8000/AdminPanel/update-NewsCategory/${data.id}`, form, {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            enqueueSnackbar('Edit Category success !', { variant: 'success' });
        })
        setOpen(false);
        dispatch({ type: 'api', api: true })
    }


    return (
        <div>
            <Button color="success" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
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
                                            Name:
                                        </label>
                                    </div>
                                    <div className='col'>
                                        <TextField placeholder='Add Category' id="outlined-basic" variant="outlined" value={data.Category.toUpperCase()}
                                            onChange={handlechanges} name="Category" style={{ minWidth: 190, fontSize: 15 }} />
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
            </Dialog>
        </div>
    );
}