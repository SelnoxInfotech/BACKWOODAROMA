import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Cookies from 'universal-cookie';
import Axios from "axios"
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import { IoImagesOutline } from 'react-icons/io5';
import { RxVideo } from "react-icons/rx"
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';





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
const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 50,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(33px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 5,
                backgroundColor: theme.palette.mode === 'dark' ? "#FFFFFF" : '#31B665',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 8,
        transition: theme.transitions.create(['width'], {
            duration: 2000,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 3,
        backgroundColor:
            theme.palette.mode === 'dark' ? '#31B665' : '#31B665',
        boxSizing: 'border-box',
    },
}));
export default function ProductPopUp() {
    const [open, setOpen] = React.useState(false);
    const [State, setState] = React.useState([]);
    // const [Status, setStatus] = React.useState('');
    const [NameState, setNameState] = React.useState([]);
    // const handleStatus = (event) => {
    //     setStatus(event.target.value);
    // };
    const handleChange = (event) => {
        setState(event.target.value.toUpperCase());

    };
    const handleName = (event) => {
        setNameState(event.target.value.toUpperCase());

    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };



    const Submit = () => {
        const cookies = new Cookies();
        const token_data = cookies.get('Token_access')

        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };

        const data = {
            "StateName": NameState,
            "State": State,
            //    "Status":Status
        }
        Axios.post(
            'http://34.201.114.126:8000/AdminPanel/Add-States/',
            data,
            config
        ).then(() => {
            setOpen(false);
        })
    };
    

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                + Add Product
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "90%",
                            height: "90%",
                            maxWidth: "none",  // Set your width here
                        },
                    },
                }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Modal title
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div className='container-fluid  text-wrap'>
                        <div className='row '>
                            <div className='col-12 Add_State center border'>
                                <div className="col ">
                                    <h2 className=''> Product </h2>
                                </div>
                            </div>
                            <div className='col-12 Add_Category_pop ' >
                                <div className='col-sm-8  top  gap  border  ' >

                                    <div className='col  product_Col '>
                                        <div className='col-2  '>
                                            <label className=''>
                                                Product Name:
                                            </label>
                                        </div>
                                        <div className='col-8'>
                                            <TextField placeholder='Add Product' id="outlined-basic" variant="outlined" value={NameState} style={{ minWidth: "90%", fontSize: 15 }}
                                                onChange={handleName} />
                                        </div>
                                    </div>
                                    <div className='col product_Col '>
                                        <div className='col-2 '>
                                            <label className=''>
                                                Product Description:
                                            </label>
                                        </div>
                                        <div className='col-8 gap'>
                                            <TextField placeholder='Add  Product Description' id="outlined-basic" variant="outlined" value={NameState} style={{ width: "90%", fontSize: 15 }}
                                                onChange={handleName} />
                                            <p>Product Additional Description</p>
                                        </div>
                                    </div>
                                    <div className='col background'>
                                        <div className='col-10   '>
                                            <label className=''>
                                                Product Image & Video:
                                            </label>
                                            <div className='col justify  Add_Category center'>
                                                <div className='col-2' >
                                                    <div className='border product_imagebox image_logosize'>
                                                        <IoImagesOutline></IoImagesOutline>
                                                    </div>
                                                </div>
                                                <div className='col-2 ' >
                                                    <div className='border product_imagebox  image_logosize'>
                                                        <RxVideo></RxVideo>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-12 product_Col background'>
                                        <div className='col  product_Col top'>
                                            <div className='col-4  '>
                                                <label className='label Sku'>
                                                    SKU ?
                                                </label>
                                            </div>
                                            <div className='col-8'>
                                                <TextField placeholder='Add SKU ?' id="outlined-basic" variant="outlined" value={NameState} style={{ minWidth: "20%", fontSize: 15 }}
                                                    onChange={handleName} />
                                            </div>
                                        </div>
                                        <div className='col  product_Col top'>
                                            <div className='col-4 '>
                                                <label className='label Sku'>
                                                    UPC  ?
                                                </label>
                                            </div>
                                            <div className='col-8'>
                                                <TextField placeholder='Add UPC ?' id="outlined-basic" variant="outlined" value={NameState} style={{ minWidth: "20%", fontSize: 15 }}
                                                    onChange={handleName} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col background'>
                                        <div className='col-10  product_price  '>
                                            <label className=''>
                                                Pricing
                                            </label>
                                        </div>
                                        <div className='col  product_Col top '>
                                            <div className='col-2   '>
                                                <label className=''>
                                                    prices:
                                                </label>
                                            </div>
                                            <div className='col-8'>
                                                <TextField placeholder='Add Product' id="outlined-basic" variant="outlined" value={NameState} style={{ minWidth: "50%", fontSize: 15 }}
                                                    onChange={handleName} />
                                            </div>
                                        </div>
                                        <div className='col  product_Col top '>
                                            <div className='col-2   '>
                                                <label className=''>
                                                    Discount:
                                                </label>
                                            </div>
                                            <div className='col-8'>
                                                <Select

                                                    displayEmpty
                                                    inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 190, fontSize: 15, background: "#AAAAAA" }}
                                                >
                                                    <MenuItem style={{ fontSize: 15 }}  >
                                                        <em>No Tax</em>
                                                    </MenuItem>
                                                    <MenuItem value={"5%"} style={{ fontSize: 15 }}>5%</MenuItem>
                                                    <MenuItem value={"10%"} style={{ fontSize: 15 }}>10%</MenuItem>

                                                </Select>
                                            </div>
                                        </div>
                                        <div className='col  product_Col top '>
                                            <div className='col-2   '>
                                                <label className=''>
                                                    Tax:
                                                </label>
                                            </div>
                                            <div className='col-8'>
                                                <Select
                                                    displayEmpty
                                                    inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 190, fontSize: 15, background: "#AAAAAA" }}>
                                                    <MenuItem style={{ fontSize: 15 }}>
                                                        <em>No Tax</em>
                                                    </MenuItem>
                                                    <MenuItem value={"5%"} style={{ fontSize: 15 }}>5%</MenuItem>
                                                    <MenuItem value={"10%"} style={{ fontSize: 15 }}>10%</MenuItem>

                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col background'>
                                        <div className='col-12  product_price  '>
                                            <label className=''>
                                                Product weight / Flavour
                                            </label>
                                        </div>
                                        <div className='col-12  product_Col top '>
                                            <div className='col-10 justify  Add_Category_pop center'>
                                                <div className='col-sm-4 border bordershedow' >
                                                    <div className='  product_Col top'>
                                                        <div className='col-4 Weight_Type '>
                                                            <label className=''>
                                                                Weight Type:
                                                            </label>
                                                        </div>
                                                        <div className='col-8 Weight_Type'>
                                                            <TextField id="outlined-basic" variant="outlined" value={NameState} style={{ minWidth: "50%", fontSize: 15 }}
                                                                onChange={handleName} />
                                                        </div>

                                                    </div>
                                                    <div className='  product_Col top'>
                                                        <div className='col-4 Weight_Type '>
                                                            <label className=''>
                                                                Weight Price:
                                                            </label>
                                                        </div>
                                                        <div className='col-8 Weight_Type'>
                                                            <TextField id="outlined-basic" variant="outlined" value={NameState} style={{ minWidth: "50%", fontSize: 15 }}
                                                                onChange={handleName} />
                                                        </div>

                                                    </div>
                                                    <div className='  product_Col top  '>
                                                        <div className='col-4 Weight_Type '>
                                                            <label className=''>
                                                                Status:
                                                            </label>
                                                        </div>
                                                        <div className='col-8 Weight_Type'>
                                                            <FormControl>
                                                                <RadioGroup
                                                                    row
                                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                                    name="row-radio-buttons-group">
                                                                    <FormControlLabel value=" Active" control={<Radio />} label="Active" />
                                                                    <FormControlLabel value="In Active" control={<Radio />} label="In Active" />
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </div>
                                                    </div>
                                                    <div className='col-12 center top' >
                                                        <button className='btn Add_button' autoFocus onClick={Submit} >
                                                            Add Weight
                                                        </button>
                                                    </div>

                                                </div>
                                                <div className='col-sm-4 border bordershedow' >
                                                    <div className='  product_Col top '>
                                                        <div className='col-4 Weight_Type '>
                                                            <label className=''>
                                                                Flavour Type:
                                                            </label>
                                                        </div>
                                                        <div className='col-8 Weight_Type'>
                                                            <TextField id="outlined-basic" variant="outlined" value={NameState} style={{ minWidth: "50%", fontSize: 15 }}
                                                                onChange={handleName} />
                                                        </div>

                                                    </div>
                                                    <div className='  product_Col top  '>
                                                        <div className='col-4 Weight_Type '>
                                                            <label className=''>
                                                                Flavour Price:
                                                            </label>
                                                        </div>
                                                        <div className='col-8 Weight_Type'>
                                                            <TextField id="outlined-basic" variant="outlined" value={NameState} style={{ minWidth: "50%", fontSize: 15 }}
                                                                onChange={handleName} />
                                                        </div>

                                                    </div>
                                                    <div className='  product_Col top  '>
                                                        <div className='col-4 Weight_Type '>
                                                            <label className=''>
                                                                Status:
                                                            </label>
                                                        </div>
                                                        <div className='col-8 Weight_Type'>
                                                            <FormControl>
                                                                <RadioGroup
                                                                    row
                                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                                    name="row-radio-buttons-group">
                                                                    <FormControlLabel value=" Active" control={<Radio />} label="Active" />
                                                                    <FormControlLabel value="In Active" control={<Radio />} label="In Active" />
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </div>
                                                    </div>
                                                    <div className='col-12 center top' >
                                                        <button className='btn Add_button' autoFocus onClick={Submit} >
                                                            Add Flavour
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>


                                    </div>
                                    <div className='col-12 product_Col background'>
                                        <div className='col  product_Col top'>
                                            <div className='col-4  '>
                                                <label className=''>
                                                    Quantity:
                                                </label>
                                            </div>
                                            <div className='col-8'>
                                                <TextField placeholder='10 gm' id="outlined-basic" variant="outlined" value={NameState} style={{ minWidth: "50%", fontSize: 15 }}
                                                    onChange={handleName} />
                                            </div>
                                        </div>

                                    </div>
                                    <div className='col-12   background'>
                                        <div className='col-12 Sku   '>
                                            <p className=''>
                                                Lab Result
                                            </p>
                                        </div>
                                        <div className=' col-12 product_Col'>
                                        <div className='col-2'>
                                        <label className=''>
                                                THC:
                                            </label>
                                            <TextField id="outlined-basic" variant="outlined" value={NameState} style={{ fontSize: 15 }}
                                                onChange={handleName} />
                                        </div>
                                           <div className='col-2'>
                                           <label className=''>
                                                CBD:
                                            </label>
                                            <TextField id="outlined-basic" variant="outlined" value={NameState} style={{ fontSize: 15 }}
                                                onChange={handleName} />
                                           </div>
                                           <div className='col-2'>
                                           <label className=''>
                                                CBN:
                                            </label>
                                            <TextField id="outlined-basic" variant="outlined" value={NameState} style={{ fontSize: 15 }}
                                                onChange={handleName} />
                                           </div>
                                          <div className='col-2'>
                                          <label className=' wrap-text'>
                                                Lab Result:
                                            </label>
                                            <label class="switch">
                                                <input type="checkbox" />
                                                <span class="slider"> </span>
                                            </label>
                                           
                                          </div>
                                        </div>
                                    </div>

                                    <div className='col background'>
                                        <div className='col-10  product_price  '>
                                            <label className='label Sku'>
                                                Store Details
                                            </label>
                                        </div>

                                        <div className='col  product_Col  top  '>
                                            <div className='col-2   '>
                                                <label className=''>
                                                    Store Name:
                                                </label>
                                            </div>
                                            <div className='col-8'>
                                                <Select
                                                    displayEmpty
                                                    inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 280, fontSize: 15, background: "#AAAAAA" }}>
                                                    <MenuItem style={{ fontSize: 15 }}>
                                                        <em>Select Store Name</em>
                                                    </MenuItem>
                                                    <MenuItem value={"5%"} style={{ fontSize: 15 }}>5%</MenuItem>
                                                    <MenuItem value={"10%"} style={{ fontSize: 15 }}>10%</MenuItem>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col background'>

                                     
                                            <div className='col-12   '>
                                                <label className=''>
                                                    Stock:
                                                </label>
                                            </div>
                                            <div className='col-12  product_Col center checkbox_product'>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                    <label class="form-check-label" for="flexRadioDefault1">
                                                        In Stock
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                                                    <label class="form-check-label" for="flexRadioDefault2">
                                                        Out Of Stock
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                   
                                </div>
                                <div className='col-sm-4 top' >
                                    <div className='col   Store   '>
                                        <label className=''>
                                            Show in Online Store:
                                        </label>
                                        <div className='col Stack ' >

                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Typography>Off</Typography>
                                                <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                                                <Typography>On</Typography>
                                            </Stack>
                                        </div>
                                    </div>
                                    <div className='col Store top border '>
                                        <label className=''>
                                            Strain
                                        </label>
                                        <div className='col-12   ' >
                                            <div className='4'>
                                                <span className='btn btton  active'> None</span>
                                            </div>
                                            <div className='4'>
                                                <span className='btn btton'> Indica</span>
                                            </div>
                                            <div className='4'>
                                                <span className='btn btton'> Sativa</span>
                                            </div>

                                        </div>
                                        <div className='col-12 Stack  ' >
                                            <div className='4'>
                                                <span className='btn btton'> CBD</span>
                                            </div>
                                            <div className='4'>
                                                <span className='btn btton'> Hybrid</span>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 center top' >
                                <button className='btn Sub_button' autoFocus onClick={Submit} >
                                    Save changes
                                </button>
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