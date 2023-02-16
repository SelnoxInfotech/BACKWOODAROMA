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
export default function NetwegihtEdit(props) {
    const { enqueueSnackbar } = useSnackbar()
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    const { dispatch } = useContext(Createcontext)
    const [open, setOpen] = React.useState(false);
    const [Size , SetSize] = React.useState({
        Weight_Price: props.data.Weight_Price,
    })

    const [netWegiht, SetnetWegiht] = React.useState({
        id: props.data.id,
        Weight_type: props.data.Weight_type,
        Status : props.data.Status,
    });
    const [error , seterror] = React.useState({
        Weight_type:"",
        Weight_Price:""
    }) 
    const [massage, setmassage] = React.useState({
        Weight_type:"",
        Weight_Price:""

    })
    const handleChange = (event) => {
        const value = event.target.value 
        SetnetWegiht({
            ...netWegiht,
            [event.target.name]: value.toUpperCase()
        });
        setmassage({Weight_type: ""})
        seterror({Weight_type:""})
    };
    const handleValue = (event) => {
        
        SetSize({
            ...Size,
            [event.target.name]: parseInt( event.target.value )
        });
        setmassage({Weight_Price: ""})
        seterror({Weight_Price:""})
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setmassage({Weight_type: ""})
        seterror({Weight_type:""})
    };
  
    const Submit = () => {


        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };

        const data = {
            
            "Weight_type" : netWegiht.Weight_type.toUpperCase(),
            "Weight_Price": Size.Weight_Price,
            "Status": netWegiht.Status
        }
        Axios.post(
            `http://34.201.114.126:8000/AdminPanel/update-NetWeight/${props.data.id}`,
            data,
            config
        ).then(() => {
            setOpen(false);
            dispatch({ type: 'api', api: true })
            enqueueSnackbar('Edit Net Weight success !', { variant: 'success' });
        }).catch(
            function (error) {
                if(error.response.data.Weight_type){
               setmassage({Weight_type: error.response.data.Weight_type})
               seterror({Weight_type:"red"})
                }
                 else if (error.response.data.Weight_Price){
                    setmassage( { Weight_Price :error.response.data.Weight_Price})
                    seterror({ Weight_Price:"red"})
                }
               
                return Promise.reject(error)
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
                                    <div className="col "> <h2> Edit Net Weight
                                    </h2>
                                    </div>
                                </div>
                                <div className='col-12 top label  con  '>
                                    <div className='col'>
                                        <label className='label'>
                                        <span className='required'>*</span>
                                        Weight type:
                                        </label>
                                    </div>
                                    <div className='col'>
                                    <TextField type="text" id="outlined-basic" variant="outlined" name='Weight_type' value={netWegiht.Weight_type} style={{ minWidth: 190, fontSize: 15 }}
                                           onChange={handleChange}
                                           InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment>, style: { fontSize: 14 } }}
                                           label={massage.Weight_type}
                                           sx={{
                                               '& .MuiOutlinedInput-root': {
                                                   '& fieldset': {
                                                       borderColor: error.Weight_type,
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
                                <div className='col-12 top label  con  '>
                                    <div className='col'>
                                        <label className='label'>
                                        <span className='required'>*</span>
                                       Weight Price:
                                        </label>
                                    </div>
                                    <div className='col'>
                                    <TextField  type="number"  id="outlined-basic" variant="outlined"  name='Weight_Price' value={Size.Weight_Price} style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleValue}
                                            InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment>, style: { fontSize: 14 } }}
                                            label={massage.Weight_Price}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: error.Weight_Price,
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
                                    <div className='col'>
                                        <Select
                                            name='Status'
                                            value={netWegiht.Status}
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
                    <Button autoFocus color='success' onClick={handleClose}>
                        Exit
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}