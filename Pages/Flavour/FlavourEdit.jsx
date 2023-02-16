import React, { useContext, useRef } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
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
export default function FlavoursEdit(props) {
    const { enqueueSnackbar } = useSnackbar();
    const cookies = new Cookies();
    const inputRef = useRef(null);
    const token_data = cookies.get('Token_access')
    const { dispatch } = useContext(Createcontext)
    const [open, setOpen] = React.useState(false);
    const [error, seterror] = React.useState({
        flavour_Name: "",
        Price: ""
    })
    const [massage, setmassage] = React.useState({
        flavour_Name: "",
        Price: ""

    })

    const [Flavour, SetFlavour] = React.useState({
        id: props.data.id,
        FlavoursImage: props.data.FlavoursImage,
        flavour_Name: props.data.flavour_Name,
        Price: props.data.Price,
    });
    const [image, SetImage] = React.useState('');

    const handleChange = (event) => {
        const value = event.target.value
        SetFlavour({
            ...Flavour,
            [event.target.name]: value
        });
        setmassage({ flavour_Name: "" })
        seterror({ flavour_Name: "" })

    };


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setmassage({ flavour_Name: "" })
        seterror({ flavour_Name: "" })
    };

    const resetFileInput = () => {
        inputRef.current.value = null;
        SetImage(null)
    };

    const formdata = new FormData();
    image ? formdata.append('FlavoursImage',image)  :  Flavour.FlavoursImage ==="" &&  formdata.append('FlavoursImage',Flavour.FlavoursImage)

    formdata.append("flavour_Name", Flavour.flavour_Name);
    formdata.append("Price", Flavour.Price);

    const Submit = () => {
        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };

        Axios.post(
            `http://34.201.114.126:8000/AdminPanel/update-Flavours/${Flavour.id}`,
            formdata,
            config,
            { headers: { "Content-Type": "multipart/form-data" } }

        ).then(() => {
            setOpen(false);
            dispatch({ type: 'api', api: true })
            enqueueSnackbar('Edit Flavour success !', { variant: 'success' });

        })
            .catch(
                function (error) {
                    if (error.response.data.flavour_Name) {
                        setmassage({ flavour_Name: error.response.data.flavour_Name })
                        seterror({ flavour_Name: "red" })
                    }
                    else if (error.response.data.Price) {
                        setmassage({ Price: error.response.data.Price })
                        seterror({ Price: "red" })
                    }


                }
            )
    };
    const handleimage = (event) => {
        SetImage(event.target.files[0])
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
                                    <div className="col "> <h2> Edit Flavours
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
                                        <TextField type="text" id="outlined-basic" variant="outlined" name='flavour_Name' value={Flavour.flavour_Name} style={{ minWidth: 190, fontSize: 15 }}
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
                                <div className='col-12 top label  con  '>
                                    <div className='col'>
                                        <label className='label'>
                                            <span className='required'>*</span>
                                            Flavour Price:
                                        </label>
                                    </div>
                                    <div className='col'>
                                        <TextField type="number" id="outlined-basic" variant="outlined" name='Price' value={Flavour.Price} style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleChange}
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
                                            Change Image:
                                        </label>
                                    </div>
                                    <div className='col'>
                                        {
                                            image ? <> <img src={URL.createObjectURL(image)} alt="" style={{ width: "120px", height: "110px" }} />
                                                <Button onClick={resetFileInput} color='success' >Cancell </Button></>
                                                :
                                                <>
                                                    <img src={"http://34.201.114.126:8000/" + Flavour.FlavoursImage} alt="" style={{ width: "120px", height: "110px" }} />
                                                    <Button name="FlavoursImage" value="" color='success' onClick={handleChange} >Cancell </Button>
                                                </>
                                        }
                                        <input type="file" ref={inputRef} id="formFile" accept="image/*" variant="outlined" style={{ Width: "10%", fontSize: 15 }}
                                            onChange={handleimage}
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
                    <Button autoFocus color='success' onClick={handleClose}>
                        Exit
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}