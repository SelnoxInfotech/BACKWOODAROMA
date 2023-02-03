import React from 'react';
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
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
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
export default function Storepopup() {
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    const [open, setOpen] = React.useState(false);
    const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());
    const [convertedContent, setConvertedContent] = React.useState(null);
    const [image, SetImage] = React.useState('');
    const [totel, setTotal] = React.useState([])
    const [error, seterror] = React.useState({
        Store_Name: "",
        Store_Address: "",
        Stores_MobileNo: "",
        LicenceNo: ""

    })
    const [massage, setmassage] = React.useState({
        Store_Name: "",
        Store_Address: "",
        Stores_MobileNo: "",
        LicenceNo: "",


    })



    const [Store, SetStore] = React.useState({
        Store_Name: "",
        city_id: '',
        Store_Type: "brand",
        LicenceNo: "",
        Store_Address: "",
        Stores_Website: "",
        Stores_MobileNo: "",
        Status: "Active"
    });


    const handleChange = (event) => {
        const value = event.target.value;
        SetStore({
            ...Store, [event.target.name]: value
        });
        setmassage("")
        seterror("")

    };
    const handleimage = (event) => {
        SetImage(event.target.files[0])
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);
    }, [editorState]);


    React.useEffect(() => {


        axios("http://34.201.114.126:8000/AdminPanel/Get-Cities/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            setTotal(response.data)


            SetStore(Store => ({ ...Store, city_id: response.data[0].id }))
        })


    }, [token_data]);



    const formdata = new FormData();
    formdata.append('Store_Name', Store.Store_Name);
    formdata.append('Store_Image', image);
    formdata.append('City_id', Store.city_id);
    formdata.append('Store_Type', Store.Store_Type);
    formdata.append('LicenceNo', Store.LicenceNo);
    formdata.append('Store_Address', Store.Store_Address);
    formdata.append('Stores_Website', Store.Stores_Website);
    formdata.append('Stores_MobileNo', Store.Stores_MobileNo);
    formdata.append('Status', Store.Status);
    formdata.append('Stores_Description', convertedContent);
    const Submit = () => {

        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };
        axios.post(
            'http://34.201.114.126:8000/AdminPanel/Add-Stores/',
            formdata,
            config
        ).then((response) => {
            setOpen(false);
        }).catch(
            function (error) {
                for (const [key, value] of Object.entries(error.response.data)) {
                    switch (key) {
                        case "Store_Name":
                            setmassage({ Store_Name: value })
                            seterror({ Store_Name: "red" })
                            break
                        case "Store_Address":
                            setmassage({ Store_Address: value })
                            seterror({ Store_Address: "red" })
                            break
                        case "Stores_MobileNo":
                            setmassage({ Stores_MobileNo: value })
                            seterror({ Stores_MobileNo: "red" })
                            break
                        case "LicenceNo":
                            setmassage({ LicenceNo: value })
                            seterror({ LicenceNo: "red" })
                            break
                        default:
                            return 'foo';
                    }
                }
            }
        )
    };
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                + Add Store
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "70%",
                            height: "100%",
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
                                    <div className="col "> <h2> Store
                                    </h2>
                                    </div>
                                </div>
                                <div className='col-12 top label  con  '>
                                    <div className='col-2'>
                                        <label className='label'>
                                            Store Name:
                                        </label>
                                    </div>
                                    <div className='col-10'>
                                        <TextField type="text" placeholder='Add  Store Name' id="outlined-basic" variant="outlined" name='Store_Name' value={Store.Store_Name} style={{ minWidth: "90%" }}
                                            onChange={handleChange}
                                            InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment>, style: { fontSize: 14 } }}
                                            label={massage.Store_Name}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: error.Store_Name,
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
                                    <div className='col-2'>
                                        <label className='label'>
                                            Store Type:
                                        </label>
                                    </div>
                                    <div className='col-10'>
                                        <Select
                                            name='Store_Type'
                                            value={Store.Store_Type}
                                            onChange={handleChange}
                                            inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: "90%", fontSize: 15 }}
                                        >
                                            <MenuItem value={"cbd store"} style={{ fontSize: 15 }}>CBD Store</MenuItem>
                                            <MenuItem value={"brand"} style={{ fontSize: 15 }}>Brand</MenuItem>
                                            <MenuItem value={"dispensary"} style={{ fontSize: 15 }}>Dispensary</MenuItem>
                                            <MenuItem value={"delivery"} style={{ fontSize: 15 }}>Delivery</MenuItem>
                                            <MenuItem value={"doctor"} style={{ fontSize: 15 }}>Doctor</MenuItem>


                                        </Select>
                                    </div>
                                </div>
                                <div className='col-12 top label  con'>
                                    <div className='col-2'>
                                        <label className='label'>
                                            City Name:
                                        </label>
                                    </div>
                                    <div className='col-2'>
                                        <Select

                                            name='city_id'
                                            value={Store.city_id}
                                            onChange={handleChange}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 190, fontSize: 15 }}
                                        >
                                            <MenuItem disabled value="" style={{ fontSize: 15 }}>
                                                <em>Select City</em>
                                            </MenuItem>

                                            {
                                                totel.map((data, index) => {

                                                    return (
                                                        <MenuItem key={index} value={data.id} style={{ fontSize: 15 }}>{data.CityName}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </div>
                                    <div className='col-2'>
                                        <label className='label'>
                                            City Name:
                                        </label>
                                    </div>
                                    <div className='col-2'>
                                        <Select

                                            name='city_id'
                                            value={Store.city_id}
                                            onChange={handleChange}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 190, fontSize: 15 }}
                                        >
                                            <MenuItem disabled value="" style={{ fontSize: 15 }}>
                                                <em>Select City</em>
                                            </MenuItem>

                                            {
                                                totel.map((data, index) => {

                                                    return (
                                                        <MenuItem key={index} value={data.id} style={{ fontSize: 15 }}>{data.CityName}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </div>
                                    <div className='col-2'>
                                        <label className='label'>
                                            City Name:
                                        </label>
                                    </div>
                                    <div className='col-2'>
                                        <Select

                                            name='city_id'
                                            value={Store.city_id}
                                            onChange={handleChange}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 190, fontSize: 15 }}
                                        >
                                            <MenuItem disabled value="" style={{ fontSize: 15 }}>
                                                <em>Select City</em>
                                            </MenuItem>

                                            {
                                                totel.map((data, index) => {

                                                    return (
                                                        <MenuItem key={index} value={data.id} style={{ fontSize: 15 }}>{data.CityName}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </div>
                                </div>
                                <div className='col-12 top label  con'>
                                    <div className='col-2'>
                                        <label className='label'>
                                            Store Address:
                                        </label>
                                    </div>
                                    <div className='col-10'>

                                        <TextField type="text" placeholder='Add Store Address:' id="outlined-basic" variant="outlined" name='Store_Address' value={Store.Store_Address} style={{ minWidth: "90%", fontSize: 15 }}
                                            onChange={handleChange}
                                            InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment>, style: { fontSize: 14 } }}
                                            label={massage.Store_Address}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: error.Store_Address,
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
                                    <div className='col-2'>
                                        <label className='label'>
                                            LicenceNo:
                                        </label>
                                    </div>
                                    <div className='col-10'>

                                        <TextField type="text" placeholder='Add LicenceNo' id="outlined-basic" variant="outlined" name='LicenceNo' value={Store.LicenceNo} style={{ minWidth: "90%", fontSize: 15 }}
                                            onChange={handleChange}
                                            InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment>, style: { fontSize: 14 } }}
                                            label={massage.LicenceNo}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: error.LicenceNo,
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
                                            Stores Website:
                                        </label>
                                    </div>
                                    <div className='col'>

                                        <TextField type="text" placeholder='Add Stores Website:' id="outlined-basic" variant="outlined" name='Stores_Website' value={Store.Stores_Website} style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleChange}
                                            InputProps={{ style: { fontSize: 14 } }}
                                        />
                                    </div>

                                    <div className='col'>
                                        <label className='label'>
                                            Stores MobileNo:
                                        </label>
                                    </div>
                                    <div className='col'>

                                        <TextField type="text" placeholder='Add Stores MobileNo:' id="outlined-basic" variant="outlined" name='Stores_MobileNo' value={Store.Stores_MobileNo} style={{ minWidth: 190 }}
                                            onChange={handleChange}
                                            InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment>, style: { fontSize: 14 } }}
                                            label={massage.Stores_MobileNo}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: error.Stores_MobileNo,
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
                                    <div className='col-2'>
                                        <label className='label'>
                                            Stores Description:
                                        </label>
                                    </div>
                                    <div className='col-10' >

                                        <Editor
                                            editorState={editorState}
                                            onEditorStateChange={setEditorState}
                                            toolbarClassName="toolbarClassName"
                                            wrapperClassName="wrapperClassName"
                                            editorClassName="editorClassName"
                                        />
                                    </div>
                                </div>
                                <div className='col-12 top label  con'>
                                    <div className='col-2 '>
                                        <label className='label'>
                                            Store Image:
                                        </label>
                                        <input type="file" placeholder='Add Store Image:' id="outlined-basic" variant="outlined" style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleimage} />
                                    </div>
                                    <div className='col-10'>
                                        <div className='col'>


                                        </div>

                                        <div className='col'>
                                            {
                                                image && <img src={URL.createObjectURL(image)} alt="" style={{ width: "120px", height: "110px" }} />
                                            }


                                        </div>
                                        <label htmlFor="file" >
                                            <span >UPLOAD</span> <span style={{ color: "red" }}>{massage.Image}</span>
                                            <p className="file-name"></p>
                                        </label>
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
                                            value={Store.Status}
                                            onChange={handleChange}

                                            inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 190, fontSize: 15 }}
                                        >

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
                    <Button autoFocus onClick={handleClose}>
                        Exit
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}