import React, { useRef ,useContext} from 'react';
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
import { MdFileUpload } from 'react-icons/md';
import Createcontext from "../../Hooks/Context/Context"

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
    const { dispatch } = useContext(Createcontext)
    const cookies = new Cookies();
    const inputRef = useRef(null);
    const token_data = cookies.get('Token_access')
    const [open, setOpen] = React.useState(false);
    const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());
    const [convertedContent, setConvertedContent] = React.useState(null);
    const [image, SetImage] = React.useState('');
    const [country, Setcountry] = React.useState([])
    const [State , SetState] = React.useState ([]);
    const [City , SetCity] = React.useState ([]);

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
        Status: "Active" , 
        Country_id:"" , 
        State_id : "",
        City_id : "",
        License_Type:"None",
        expires : new Date().toISOString().slice(0, 16),
        
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

    const resetFileInput = () => {
        inputRef.current.value = null;
        SetImage(null)
    };


    React.useEffect(() => {


        axios("http://34.201.114.126:8000/AdminPanel/Get-Country/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {

       
            Setcountry(response.data)
        })
        if(Store.Country_id!=="") {
            axios.get(`http://34.201.114.126:8000/AdminPanel/FilterStatesByCountry/${Store.Country_id}`, {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            SetState(response.data.data)
            SetStore(Store => ({ ...Store, State_id: response.data.data[0].id }))
        })
        }

        if(Store.State_id!=="") {
            axios.get(`http://34.201.114.126:8000/AdminPanel/FilterCitiesByStates/${Store.State_id}`, {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            SetCity(response.data.data)
            SetStore(Store => ({ ...Store, city_id: response.data.data[0].id }))
        })
        }



    }, [token_data,Store.Country_id,Store.State_id]);
  
 

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
            dispatch({ type: 'api', api: true })
        }).catch(
            function (error) {

                if (error.response.data.error) {
                    setmassage({ LicenceNo: error.response.data.error.LicenceNo[0] })
                    seterror({ LicenceNo: "red" })
                }
                if (error.response.data.error) {
                    setmassage({ Stores_MobileNo: error.response.data.error.Stores_MobileNo[0] })
                    seterror({ Stores_MobileNo: "red" })
                }
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
                                <div className='col-12 top label  Store_country '>
                                    <div className='col-2'>
                                        <label className='label'>
                                        Country:
                                        </label>
                                    </div>
                                    <div className='col'>
                                        <Select

                                            name='Country_id'
                                            value={Store.Country_id}
                                            onChange={handleChange}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 190, fontSize: 15 }}
                                        >
                                           
                                           <MenuItem disabled value="" style={{ fontSize: 15 }}>
                                                <em>Select Country</em>
                                            </MenuItem>
                                            {
                                                country.map((data, index) => {

                                                    return (
                                                        <MenuItem key={index} value={data.id} style={{ fontSize: 15 }}>{data.CountryName}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </div>
                                    <div className='col-2'>
                                        <label className='label'>
                                        State:
                                        </label>
                                    </div>
                                    <div className='col-2'>
                                        <Select

                                            name='State_id'
                                            value={Store.State_id}
                                            onChange={handleChange}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 190, fontSize: 15 }}
                                        >
                                            <MenuItem disabled value="" style={{ fontSize: 15 }}>
                                                <em>Select</em>
                                            </MenuItem>

                                            {
                                                State.map((data, index) => {

                                                    return (
                                                        <MenuItem key={index} value={data.id} style={{ fontSize: 15 }}>{data.StateName}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </div>
                                    <div className='col'>
                                        <label className='label'>
                                            City :
                                        </label>
                                    </div>
                                    <div className='col'>
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
                                                City.map((data, index) => {

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
                                <div className='col-12 top label  con '>
                                    <div className='col-2 '>
                                        <label className='label'>
                                            Store Image:
                                        </label>
                                        <input type="file" placeholder='Add Store Image:' id="file" ref={inputRef} className="file" variant="outlined" style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleimage} />
                                    </div>
                                    <div className='col-10  center'>
                                        <div className='col img_store '>
                                            <div className='col img_store1'>
                                                {
                                                    image ? <div >
                                                        <img src={URL.createObjectURL(image)} alt="" className='center' style={{ width: "90px", height: "81px", borderRadius: "10px" }} />
                                                        <Button color='success' onClick={resetFileInput}>Cancell </Button>
                                                    </div> :
                                                        <div>
                                                            <MdFileUpload style={{ backgroundColor: "#31B665", borderradius: "66px" }} ></MdFileUpload >
                                                        </div>
                                                }


                                            </div>
                                            <label htmlFor="file"  >
                                                <span className='img_store1' >UPLOAD</span> <span style={{ color: "red" }}>{massage.Image}</span>
                                                <p className="file-name"></p>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-12 Add_State Add_Category '>
                                    <div className="col "> <h2> LicenceNo
                                    </h2>
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


                                <div className='col-8 top label  con'>
                                    <div className='col-2'>
                                        <label className='label'>
                                            License Type:
                                        </label>
                                    </div>
                                    <div className='col-2'>
                                        <Select
                                            name='License_Type'
                                            value={Store.License_Type}
                                            onChange={handleChange}
                                            inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 190, fontSize: 15 }}
                                        >
                                            <MenuItem value={"None"} style={{ fontSize: 15 }}>None</MenuItem>
                                            <MenuItem value={"Adult-Use Cultivation"} style={{ fontSize: 15 }}>Adult-Use Cultivation</MenuItem>
                                            <MenuItem value={"Adult-Use Nonstorefront"} style={{ fontSize: 15 }}>Adult-Use Mfg</MenuItem>
                                            <MenuItem value={"Adult-Use Retail"} style={{ fontSize: 15 }}>Adult-Use Retail</MenuItem>
                                            <MenuItem value={"Distributor"} style={{ fontSize: 15 }}>Distributor</MenuItem>
                                            <MenuItem value={"Event"} style={{ fontSize: 15 }}>Event</MenuItem>
                                            <MenuItem value={"Medical Cultivation"} style={{ fontSize: 15 }}>Medical Cultivation</MenuItem>
                                            <MenuItem value={"Medical Mfg"} style={{ fontSize: 15 }}>Medical Mfg</MenuItem>
                                            <MenuItem value={"Medical Nonstorefront"} style={{ fontSize: 15 }}>Medical Nonstorefront</MenuItem>
                                            <MenuItem value={"Medical Retail"} style={{ fontSize: 15 }}>Medical Retail</MenuItem>
                                            <MenuItem value={"Microbusiness"} style={{ fontSize: 15 }}>Microbusiness</MenuItem>
                                            <MenuItem value={"Testing Lab"} style={{ fontSize: 15 }}>Testing Lab</MenuItem>

                                        </Select>
                                    </div>


                                    <div className='col-2 '>
                                        <label className='label'>
                                            Expires:
                                        </label>
                                    </div>
                                    <div className='col-2 '>
                                        <TextField
                                            id="date"
                                            value={Store.expires}
                                            name="expires"
                                            onChange={handleChange}
                                            type="datetime-local"
                                            inputProps={{
                                                min: new Date().toISOString().slice(0, 16)
                                            }}
                                            sx={{ width: 190, fontSize: 25 }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        ></TextField>
                                    </div>
                                </div>
                                <div className='col-12 top label  con '>
                                    <div className='col-2 '>
                                        <label className='label'>
                                            Store Image:
                                        </label>
                                        <input type="file" placeholder='Add Store Image:' id="file" ref={inputRef} className="file" variant="outlined" style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleimage} />
                                    </div>
                                    <div className='col-10  center'>
                                        <div className='col img_store_lince '>
                                            <div className='col img_store1'>
                                                {
                                                    image ? <div >
                                                        <img src={URL.createObjectURL(image)} alt="" className='center' style={{ width: "90px", height: "81px", borderRadius: "10px" }} />
                                                        <Button color='success' onClick={resetFileInput}>Cancell </Button>
                                                    </div> :
                                                        <div>
                                                            <MdFileUpload style={{ backgroundColor: "#31B665", borderradius: "66px" }} ></MdFileUpload >
                                                        </div>
                                                }


                                            </div>
                                            <label htmlFor="file"  >
                                                <span className='img_store1' >UPLOAD</span> <span style={{ color: "red" }}>{massage.Image}</span>
                                                <p className="file-name"></p>
                                            </label>
                                        </div>
                                    </div>
                                </div>




                                <div className='col-4 top label  con'>
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
        </div >
    );
}