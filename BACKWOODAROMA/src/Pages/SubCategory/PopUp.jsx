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
import axios from "axios"
import Axios from "axios"
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
export default function PopUp() {
    const [open, setOpen] = React.useState(false);
  
    const [SubCategory, setSubCategory] = React.useState([]);
    const [Category, setCategory] = React.useState([]);
    const [Status, setStatus] = React.useState('');
    const [NameCategory, setNameCategory] = React.useState([]);
    const handleStatus = (event) => {
        setStatus(event.target.value);
    };
    const handleChange = (event) => {
        setCategory(event.target.value);
       
    };
    const handleName = (event) => {
        setNameCategory(event.target.value);
    };
   
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        const cookies = new Cookies();
        const token_data = cookies.get('Token_access')

        axios("http://34.201.114.126:8000/AdminPanel/Get-Category/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            
            setSubCategory(response.data)
         
        })
    }, [SubCategory])



    const Submit = () => {
        const cookies = new Cookies();
        const token_data = cookies.get('Token_access')

        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };

        const data = {
            "name": NameCategory,
            "category": Category ,
           "Status":Status
           }
        Axios.post( 
          'http://34.201.114.126:8000/AdminPanel/Add-SubCategory/',
          data,
          config
        ).then(()=>{
            setOpen(false);
        })
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                + Add Sub Category
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
                                    <div className="col "> <h2> Add Sub Category
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
                                  <TextField placeholder='Add  Sub Category' id="outlined-basic" variant="outlined"   value={NameCategory}
                                        onChange={handleName} />
                                  </div>
                                </div>
                                <div className='col-12 top label  con'>
                                   <div className='col'>
                                   <label className='label'>
                                        Main Category:
                                    </label>
                                   </div>
                                 <div className='col'>
                                 <Select
                                        
                                        value={Category}
                                        onChange={handleChange}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}>
                                            <MenuItem value="" disabled>
                                            <em>Select option</em>
                                        </MenuItem>
                                        {
                                            SubCategory.map((category) => {
                                                return (
                                                    <MenuItem key={category.id}  value={category.id} >
                                                        {category.name}
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
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value="">
                                            <em>Select option</em>
                                        </MenuItem>
                                        <MenuItem value={"Active"}>Active</MenuItem>
                                        <MenuItem value={"Hide"}>Hide</MenuItem>

                                    </Select>
                                    </div>
                                </div>
                                <div className='col-12 center top'>
                                    <button className='btn Sub_button' autoFocus onClick={Submit}>
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