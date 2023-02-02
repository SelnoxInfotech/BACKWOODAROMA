import React, { useRef, useContext } from 'react';
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
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import InputAdornment from '@mui/material/InputAdornment';
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
        '& .MuiButtonBase-root': {
            fontSize: "1.5625rem",
            color: "#31B665"
        },
    },
}));

function BootstrapDialogTitle(props) {

}
export default function Brandpopup() {
    const { dispatch } = useContext(Createcontext)
    const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());
    const inputRef = useRef(null);
    const [convertedContent, setConvertedContent] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [image, SetImage] = React.useState('');
    const [Brand, setBrand] = React.useState({
        Link: "",
        Status: "Active",
        name: ""
    });
    const [error, seterror] = React.useState({
        name: "",


    })
    const [massage, setmassage] = React.useState({
        name: "",

    })





    React.useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);
    }, [editorState]);

    const handleimage = (event) => {
        SetImage(event.target.files[0])
    };
    const handleChange = (event) => {
        const value = event.target.value;
        setBrand({
            ...Brand,
            [event.target.name]: value
        });
        setmassage("")
        seterror("")
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        SetImage('')
        setBrand(Brand => ({ ...Brand, name: "" }))
        setmassage("")
        seterror("")
    };

    const resetFileInput = () => {
        // resetting the input value
        inputRef.current.value = null;
        SetImage(null)
    };



    const formdata = new FormData();
    formdata.append('Brand_Logo', image);
    formdata.append('Brand_description', convertedContent);
    formdata.append('Link', Brand.Link);
    formdata.append('Status', Brand.Status);
    formdata.append('name', Brand.name);

    const Submit = () => {
        const cookies = new Cookies();
        const token_data = cookies.get('Token_access')

        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };
        Axios.post(
            'http://34.201.114.126:8000/AdminPanel/Add-Brand/',
            formdata,
            config
        ).then(() => {
            setOpen(false);
            dispatch({ type: 'api', api: true })
            setBrand(Brand => ({ ...Brand, name: "", Link: "" }))

        })
            .catch(
                function (error) {
                    if (error.response.data.name) {

                        setmassage({ name: error.response.data.name })
                        seterror({ name: "red" })
                    }
                    else {

                        setmassage({ name: error.response.data.name[0] })
                        seterror({ name: "red" })
                    }



                }
            )
    };
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                + Add Brand
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "90%",
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
                                    <div className="col "> <h2> Brand
                                    </h2>
                                    </div>
                                </div>
                                <div className='col-12 top label  con  '>
                                    <div className='col'>
                                        <label className='label'>
                                            Brand Name:
                                        </label>
                                    </div>
                                    <div className='col'>
                                        <TextField type="text" placeholder='Add Brand Name' id="outlined-basic" variant="outlined" name='name' value={Brand.name} style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleChange}
                                            InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment>, style: { fontSize: 14 } }}
                                            label={massage.name}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: error.name,
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
                                            Brand Link:
                                        </label>
                                    </div>
                                    <div className='col'>

                                        <TextField type="text" placeholder='Add LicenceNo' id="outlined-basic" variant="outlined" name='Link' value={Brand.Link}
                                            onChange={handleChange}
                                            InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment>, style: { fontSize: 14 } }}

                                        />

                                    </div>
                                </div>

                                <div className='col-12 top label  con'>
                                    <div className='col'>
                                        <label className='label'>
                                            Brand Logo:
                                        </label>
                                    </div>
                                    <div className='col'>

                                        <input type="file" ref={inputRef} onChange={handleimage} id="outlined-basic" variant="outlined" style={{ minWidth: 190, fontSize: 15 }} />
                                    </div>

                                </div>
                                <div className='col center'>
                                    {
                                        image && <>
                                            <img src={URL.createObjectURL(image)} alt="" style={{ width: "120px", height: "110px" }} />
                                            <Button color='success' onClick={resetFileInput}>Cancell </Button>
                                        </>
                                    }
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
                                            value={Brand.Status}
                                            onChange={handleChange}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 190, fontSize: 15 }}
                                        >
                                            <MenuItem value={"Active"} style={{ fontSize: 15 }}>Active</MenuItem>
                                            <MenuItem value={"Hide"} style={{ fontSize: 15 }}>Hide</MenuItem>

                                        </Select>
                                    </div>

                                </div>
                                <div className='col-12 top label  con'>
                                    <div className='col'>
                                        <label className='label'>
                                            Brand Description:
                                        </label>
                                    </div>
                                    <div className='col'>

                                        <Editor
                                            editorState={editorState}
                                            onEditorStateChange={setEditorState}
                                            toolbarClassName="toolbarClassName"
                                            wrapperClassName="wrapperClassName"
                                            editorClassName="editorClassName"
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
                    <Button autoFocus color='success' style={{ fontSize: 15 }} onClick={handleClose}>
                        Exit
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}