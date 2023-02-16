import  React ,{useContext} from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import NumberField from '@mui/material/TextField';
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
export default function StatePopUp() {
    const { dispatch} = useContext(Createcontext)
    const [open, setOpen] = React.useState(false);
    const [Discounttype, setDicounttype] = React.useState([]);
    const [Status, setStatus] = React.useState('Active');
    const [Discount, setDiscount] = React.useState([]);
    const [error , seterror] = React.useState({
        Discount_value:"",
        Discount_type:""
    }) 
    const [massage, setmassage] = React.useState({
        Discount_value:"",
        Discount_type:""

    })
    const handleStatus = (event) => {
        setStatus(event.target.value);
    };
    const handleChange = (event) => {
        setDicounttype(event.target.value.toUpperCase());
        setmassage( {Discount_type:''})
        seterror({Discount_type:''})
       
    };
    const handleName = (event) => {
        setDiscount(event.target.value.toUpperCase());
        setmassage( {Discount_value:''})
        seterror({Discount_value:''})
       
    };
   
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setmassage('')
        seterror('')
    };

  

    const Submit = () => {
        const cookies = new Cookies();
        const token_data = cookies.get('Token_access')

        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };

        const data = {
            "Discount_value": Discount,
            "Discount_type": Discounttype ,
           "Status":Status
           }
        Axios.post( 
          'http://34.201.114.126:8000/AdminPanel/Add-Discount/',
          data,
          config
        ).then(()=>{
            setOpen(false);
            dispatch({type:'api',api: true})


        })
        .catch(
            function (error) {
                if(error.response.data.Discount_value){
               setmassage({Discount_value: error.response.data.Discount_value})
               seterror({Discount_value:"red"})
                }
                 else if (error.response.data.Discount_type){
                    setmassage( { Discount_type :error.response.data.Discount_type})
                    seterror({ Discount_type:"red"})
                }
               
            }
        )
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                + Add Discount
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
                                    <div className="col "> <h2> Discount
                                    </h2>
                                    </div>
                                </div>
                                <div className='col-12 top label  con  '>
                                    <div className='col'>
                                    <label className='label'>
                                    <span className='required'>*</span>
                                    Discount value:
                                    </label>
                                    </div>
                                  <div className='col'>
                                  <NumberField type="Number" placeholder='Add Discount value' id="outlined-basic" variant="outlined"   value={Discount } style={{minWidth: 190 , fontSize:15}}
                                        onChange={handleName}
                                        InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment>, style: { fontSize: 14 } }}
                                        label={massage.Discount_value}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: error.Discount_value,
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
                                   Discount type:
                                    </label>
                                   </div>
                                 <div className='col'>
                                 <TextField placeholder='Add  Discount type' id="outlined-basic" variant="outlined"   value={Discounttype}style={{minWidth: 190 , fontSize:15}}
                                        onChange={handleChange}
                                        InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment>, style: { fontSize: 14 } }}
                                        label={massage.Discount_type}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: error.Discount_type,
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
                    <Button autoFocus color='success' style={{ fontSize:15}} onClick={handleClose}>
                        Exit
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}