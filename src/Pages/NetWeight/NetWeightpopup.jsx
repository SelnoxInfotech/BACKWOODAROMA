import  React , {useContext} from 'react';
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
export default function NetWegihtPopUp() {
    const { dispatch} = useContext(Createcontext)
    const [open, setOpen] = React.useState(false);
    const [size, setSize] = React.useState([]);
    const [Status, setStatus] = React.useState('Active');
    const [error , seterror] = React.useState({
        Weight_type:"",
        Weight_Price:""
    }) 
    const [massage, setmassage] = React.useState({
        Weight_type:"",
        Weight_Price:""

    })
    const [Weighttype, setWeighttype] = React.useState([]);

    const handleStatus = (event) => {
        setStatus(event.target.value);
    };
    const handlesize = (event) => {
        setSize(event.target.value.toUpperCase());
       
    };
    const handleWeighttype = (event) => {
        setWeighttype(event.target.value.toUpperCase());
       
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
        const cookies = new Cookies();
        const token_data = cookies.get('Token_access')

        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };

        const data = {
            "Weight_type": Weighttype,
            "Weight_Price": size ,
           "Status":Status
           }
        Axios.post( 
          'http://34.201.114.126:8000/AdminPanel/Add-NetWeight/',
          data,
          config
        ).then(()=>{
            dispatch({type:'api',api: true})
            setOpen(false);
            setSize('')
            setWeighttype("")


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
            <Button variant="outlined" onClick={handleClickOpen}>
                + Add NetWeight
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

                                <div className='col-12 Add_State center Add_Category'>
                                    <div className="col "> <h2> NetWeight
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
                                  <TextField placeholder='Add Weight type ' id="outlined-basic" variant="outlined"   value={Weighttype } style={{minWidth: 190 , fontSize:15}}
                                        onChange={handleWeighttype} 
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
                                <div className='col-12 top label  con'>
                                   <div className='col'>
                                   <label className='label'>
                                   <span className='required'>*</span>
                                   Weight price :
                                    </label>
                                   </div>
                                 <div className='col'>
                                 <TextField type="number" placeholder='Price' id="outlined-basic" variant="outlined"   value={size}style={{minWidth: 190 , fontSize:15}}
                                        onChange={handlesize}
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
                                        value={Status}
                                        onChange={handleStatus}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }} style={{minWidth: 190 , fontSize:15}}
                                    >
                                        <MenuItem value="" style={{ fontSize:15}}>
                                            <em>Select option</em>
                                        </MenuItem>
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
                <Button autoFocus color='success' onClick={handleClose} style={{ fontSize:15}}>
                        Exit
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}