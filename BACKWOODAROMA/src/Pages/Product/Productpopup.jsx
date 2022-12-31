import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Cookies from 'universal-cookie';
import Axios from "axios"
import { Input } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
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
export default function ProductPopUp() {
    const [open, setOpen] = React.useState(false);
    const [State, setState] = React.useState([]);
    // const [Status, setStatus] = React.useState('');
    const [NameState, setNameState] = React.useState([]);
    // const handleStatus = (event) => {
    //     setStatus(event.target.value);
    // };
    const handleChange = (event) => {
        setState(event.target.value.toUpperCase());
       
    };
    const handleName = (event) => {
        setNameState(event.target.value.toUpperCase());
       
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
            "StateName": NameState,
            "State": State ,
        //    "Status":Status
           }
        Axios.post( 
          'http://34.201.114.126:8000/AdminPanel/Add-States/',
          data,
          config
        ).then(()=>{
            setOpen(false);
        })
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                + Add Product
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

                                <div className='col-12 Add_State Add_Category center'>
                                    <div className="col "> <h2> Product
                                    </h2>
                                    </div>
                                </div>
                                <div className='col-12 top label  con  '>
                                    <div className='col'>
                                    <label className='label'>
                                    Product Name:
                                    </label>
                                    </div>
                                  <div className='col'>
                                  <TextField placeholder='Add flower' id="outlined-basic" variant="outlined"   value={NameState } style={{minWidth: 190 , fontSize:15}}
                                        onChange={handleName} />
                                  </div>
                                </div>
                                <div className='col-12 top label  con'>
                                   <div className='col'>
                                   <label className='label'>
                                   Product Details:
                                    </label>
                                   </div>
                                 <div className='col'>
                                 <TextField placeholder='Product Details' id="outlined-basic" variant="outlined"   value={State}style={{minWidth: 190 , fontSize:15}}
                                        onChange={handleChange} />
                               
                                  </div>
                                </div>
                                <div className='col-12 top label  con'>
                                   <div className='col'>
                                   <label className='label'>
                                   SKU:
                                    </label>
                                   </div>
                                 <div className='col'>
                                 <TextField placeholder='SKU' id="outlined-basic" variant="outlined"   value={State}style={{minWidth: 190 , fontSize:15}}
                                        onChange={handleChange} />
                               
                                  </div>
                                </div>
                                <div className='col-12 top label  con'>
                                   <div className='col'>
                                   <label className='label'>
                                   Sub Category:
                                    </label>
                                   </div>
                                 <div className='col'>
                                 <Select  displayEmpty inputProps={{ 'aria-label': 'Without label',}} style={{minWidth: 190 , fontSize:15}} >
                                        <MenuItem >

                                        </MenuItem>
                                        <MenuItem value={"Active"} style={{ fontSize:15}}>Active</MenuItem>
                                        <MenuItem value={"Hide"} style={{ fontSize:15}}>  Hide</MenuItem>

                                    </Select>
                               
                                  </div>
                                </div>
                                <div className='col-12 top label  con'>
                                    <div className='col'>
                                    <label className='label'>
                                        Image Uploade:
                                    </label>
                                    </div>
                                    <div className='col'>
                                    <Input type='file'  id="outlined-basic" variant="outlined"    style={{Width: "10%" , fontSize:15}}
                                         />
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