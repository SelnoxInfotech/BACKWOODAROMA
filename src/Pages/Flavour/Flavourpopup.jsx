import  React , {useRef,useContext} from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
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
export default function FlavorPopUp() {
    const { dispatch} = useContext(Createcontext)
    const inputRef = useRef(null);
    const [open, setOpen] = React.useState(false);
    const [Flavour, setFlavour] = React.useState({
        flavour_Name: ""
    });
    const [Price, setprice] = React.useState('');
    const [image, SetImage] = React.useState('');
    const [error , seterror] = React.useState({
        flavour_Name:"",
        Price:""
    }) 
    const [massage, setmassage] = React.useState({
        flavour_Name:"",
        Price:""

    })




    const handleChange = (event) => {
        const value = event.target.value;
        setFlavour({
            ...Flavour, [event.target.name]: value
        });
        setmassage({flavour_Name: ""})
        seterror({flavour_Name:""})
    };
    const handlePrice = (event) => {
        setprice(event.target.value)
        setmassage({Price: ""})
        seterror({Price:""})
    }
    const handleimage = (event) => {
        SetImage(event.target.files[0])
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const resetFileInput = () => {
        // resetting the input value
        inputRef.current.value = null;
        SetImage(null)
      };
    
 
    const Submit = () => {
        const cookies = new Cookies();
        const token_data = cookies.get('Token_access')

        const config = {
            headers: { Authorization: `Bearer ${token_data}`}
        };

        
        const formdata = new FormData();
        
        formdata.append('FlavoursImage',image);
        formdata.append("flavour_Name",Flavour.flavour_Name);
        formdata.append("Price",Price &&  parseInt(Price));

        Axios.post(
            'http://34.201.114.126:8000/AdminPanel/Add-Flavours/',
            formdata,
            config
        )
        .then(() => {
            setOpen(false);
            dispatch({type:'api',api: true})
            SetImage('')
            setprice('')
            setFlavour('')
        })
        .catch(
            function (error) {
                if(error.response.data.flavour_Name){
               setmassage({flavour_Name: error.response.data.flavour_Name})
               seterror({flavour_Name:"red"})
                }
                 else if (error.response.data.Price){
                    setmassage( { Price :error.response.data.Price})
                    seterror({ Price:"red"})
                }
               
               
            }
        )
       
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                + Add Flavour
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
                                    <div className="col "> <h2> Flavour
                                    </h2>
                                    </div>
                                </div>
                                <div className='col-12 top label  con  '>
                                    <div className='col'>
                                        <label className='label'>
                                        <span className='required'>*</span>
                                            Flavour Name:
                                        </label>
                                    </div>
                                    <div className='col'>
                                        <TextField placeholder='Add flavour' id="outlined-basic" name='flavour_Name' value={Flavour.flavour_Name} style={{ minWidth: 190 }}
                                            onChange={handleChange} 
                                            InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment>, style: { fontSize: 14 } }}
                                            label={massage.flavour_Name}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: error.flavour_Name,
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
                                            price:
                                        </label>
                                    </div>
                                    <div className='col'>
                                        <TextField type="number" placeholder='Price' name='Price' value={Price} id="outlined-basic" variant="outlined"  style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handlePrice}
                                            InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment>, style: { fontSize: 14 } }}
                                            label={massage.Price}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: error.Price,
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
                                            Image Uploade:
                                        </label>
                                    </div>
                                    <div className='col'>
                                        <input  type="file" id="formFile" ref={inputRef} accept="image/*"  variant="outlined" style={{ Width: "10%", fontSize: 15 }}
                                            onChange={handleimage}
                                        />

                                    </div>
                                </div>
                                <div className='col-12 top label  con center'>
                                    <div className='col'>

                                        {
                                            image && <><img src={URL.createObjectURL(image)} alt="" style={{ width: "120px", height: "110px" }} />
                                            <Button  onClick={resetFileInput}>Cancell </Button></>
                                            
                                        }
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
                <Button autoFocus color='success' style={{ fontSize: 15 }} onClick={handleClose}>
                        Exit
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}