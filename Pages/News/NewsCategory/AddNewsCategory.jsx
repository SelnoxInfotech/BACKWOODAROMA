import  React ,{useContext} from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Axios from "axios"
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Cookies from 'universal-cookie';
import Createcontext from "../../../Hooks/Context/Context"
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
    '& .MuiButtonBase-root': {
        fontSize: "1.5625rem",
        color: "#31B665"
    },
}));

export default function NewsCategorypopup() {
    const { dispatch} = useContext(Createcontext)
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    const [open, setOpen] = React.useState(false);
    const [NameCategory, setNameCategory] = React.useState('');
    const handleName = (event) => {
        setNameCategory(event.target.value.toUpperCase());
        setmassage("")
         seterror("")
    };
    const [error, seterror] = React.useState()
    const [massage, setmassage] = React.useState()


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setmassage("")
        seterror("")
    };

    const handlechanges = () => {

        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };

        const data = {
            "name": NameCategory,
        }
        Axios.post(
            'http://34.201.114.126:8000/AdminPanel/Add-NewsCategory/',
            data,
            config
        ).then(() => {
            setOpen(false);
            setNameCategory("");
            dispatch({type:'api',api: true})
        }).catch(
            function (error) {
                setmassage(error.response.data.name)
                seterror("red")

            }
        )
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                + Add Category
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
                }}>
                <DialogContent dividers>
                    <div className='container-fluid '>
                        <div className='row'>
                            <div className='col-12  ' >
                                <div className='col-12 Add_Category center'>
                                    <div className="col "> <h2> Add News Category
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
                                        <TextField placeholder='Add Category' id="outlined-basic" variant="outlined" value={NameCategory || ""}
                                            onChange={handleName} style={{ minWidth: 190, fontSize: 15, }} 
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
                                    <button className='btn Sub_button' onClick={handlechanges} style={{ fontSize: 15 }}>
                                        Save Changes
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