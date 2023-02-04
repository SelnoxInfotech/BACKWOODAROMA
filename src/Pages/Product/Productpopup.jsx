import React, { useRef } from 'react';
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
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md"
import { RxVideo } from "react-icons/rx"
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
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
    const inputRef = useRef(null);
    const inputVideo = useRef(null);
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    const [open, setOpen] = React.useState(false);
    const [State, setState] = React.useState([]);
    const [NameState, setNameState] = React.useState([]);
    const [discount, SetDiscount] = React.useState([])
    const [Taxs, SetTaxs] = React.useState([])
    const [store, Setstore] = React.useState([])
    const [Image, SetImage] = React.useState('')
    const [video, Setvideo] = React.useState('')
    const [net_weight, SetNet_Weight] = React.useState([])
    const [Flavours , SetFlavours] = React.useState([])
    const [error, seterror] = React.useState({
        Product_Name: "",
        Product_Description: "",
        quantity: "",
        prices: ""

    })
    const [massage, setmassage] = React.useState({
        Product_Name: "",
        Product_Description: "",
        quantity: "",
        prices: ""

    })


    const [Product, SetProduct] = React.useState({
        Product_Name: "",
        Product_Description: "",
        quantity: "",
        prices: "",
        discount: "",
        tax: "",
        store: "",
        Multiple_Image: "",
        Product_Video: "",
        SKU: "",
        UPC: "",
        net_weight: "",
        strain: "None",
        Sub_Category: 1,
        flavour: "",
        THC:"",
        CBD:"",
        CBN:"",
        lab_Result :"percentage",
        Stock:"",
        Status:"Active"

    })

    const handleChange = (event) => {
        const value = event.target.value;
        SetProduct({
            ...Product, [event.target.name]: value
        });

        setmassage("")
        seterror("")

    };
    const handleimage = (event) => {

        SetImage(event.target.files[0])
    }
    const handlevideo = (event) => {

        Setvideo(event.target.files[0])
    }
    const resetFileInput = () => {
        // resetting the input value
        inputRef.current.value = null;
        SetImage(null)
    };
    const resetFileInputVideo = () => {
        // resetting the input value
        inputVideo.current.value = null;
        Setvideo(null)
    };


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    React.useEffect(() => {
        Axios("http://34.201.114.126:8000/AdminPanel/Get-Discount/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            SetDiscount(response.data)
            SetProduct(Product => ({ ...Product, discount: response.data[0].id }))

        })
        Axios("http://34.201.114.126:8000/AdminPanel/Get-Tax/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            SetTaxs(response.data)
            SetProduct(Product => ({ ...Product, tax: response.data[0].id }))

        })
        Axios("http://34.201.114.126:8000/AdminPanel/Get-Stores/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            Setstore(response.data)
            SetProduct(Product => ({ ...Product, store: response.data[0].id }))
        })
        Axios("http://34.201.114.126:8000/AdminPanel/Get-NetWeight/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            SetNet_Weight(response.data)
            SetProduct(Product => ({ ...Product, net_weight: response.data[0].id }))

        })


        Axios("http://34.201.114.126:8000/AdminPanel/Get-Flavours/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            SetFlavours(response.data)
            SetProduct(Product => ({ ...Product, flavour: response.data[0].id }))


        })




    }, [token_data])




    const formdata = new FormData();
    formdata.append('Product_Name', Product.Product_Name);
    formdata.append('Product_Description', Product.Product_Description);
    formdata.append('discount', Product.discount);
    formdata.append('tax', Product.tax);
    formdata.append('Claimed_Coupoun', 1);
    formdata.append('GiftVoucher', 1);
    formdata.append('quantity', Product.quantity);
    formdata.append('prices', Product.prices);
    formdata.append('Multiple_Image', Product.Multiple_Image);
    formdata.append('Product_Video', Product.Product_Video);
    formdata.append('SKU', Product.SKU);
    formdata.append('UPC', Product.UPC);
    formdata.append('net_weight', Product.net_weight);
    formdata.append('flavour', Product.flavour);
    formdata.append('THC', Product.THC);
    formdata.append('CBD', Product.CBD);
    formdata.append('CBN', Product.CBN);
    formdata.append('lab_Result', Product.lab_Result);
    formdata.append('Stock', Product.Stock);
    formdata.append('strain', Product.strain);
    formdata.append('Sub_Category', Product.Sub_Category);
    formdata.append('Status', Product.Status);

  console.log(Product.Stock)





    const Submit = () => {


        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };


        Axios.post(
            'http://34.201.114.126:8000/AdminPanel/Add-Product/',
            formdata,
            config
        ).then(() => {
            setOpen(false);
        }).catch(
            function (error) {
                for (const [key, value] of Object.entries(error.response.data)) {
                    switch (key) {
                        case "Product_Name":
                            setmassage({ Product_Name: value })
                            seterror({ Product_Name: "red" })
                            break
                        case "Product_Description":
                            setmassage({ Product_Description: value })
                            seterror({ Product_Description: "red" })
                            break
                        case "quantity":
                            setmassage({ quantity: value })
                            seterror({ quantity: "red" })
                            break
                        case "prices":
                            setmassage({ prices: value })
                            seterror({ prices: "red" })
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
                                            <TextField placeholder='Add Product' id="outlined-basic" name='Product_Name' variant="outlined" value={Product.Product_Name} style={{ minWidth: "90%", fontSize: 15 }}
                                                onChange={handleChange}

                                                InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment>, style: { fontSize: 14 } }}
                                                label={massage.Product_Name}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: error.Product_Name,
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
                                    <div className='col product_Col '>
                                        <div className='col-2 '>
                                            <label className=''>
                                                Product Description:
                                            </label>
                                        </div>
                                        <div className='col-8 gap'>
                                            <TextField placeholder='Add  Product Description' id="outlined-basic" variant="outlined" name='Product_Description' value={Product.Product_Description} style={{ width: "90%", fontSize: 15 }}
                                                onChange={handleChange}
                                                InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment>, style: { fontSize: 14 } }}
                                                label={massage.Product_Description}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: error.Product_Description,
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
                                                    <input type="file" id="file" accept="image/*" variant="outlined" style={{ Width: "10%", fontSize: 15 }}
                                                        onChange={handleimage} ref={inputRef}
                                                    />

                                                    <div className='border product_imagebox image_logosize ' >

                                                        {
                                                            Image ? <div style={{ display: "flex" }}>
                                                                <img src={URL.createObjectURL(Image)} alt="" style={{ width: "90px", height: "81px", borderRadius: "10px" }} />
                                                                <Button color='success' onClick={resetFileInput}>Cancell </Button>
                                                            </div> :
                                                                <IoImagesOutline ></IoImagesOutline>
                                                        }


                                                    </div>

                                                </div>
                                                <div className='col-2 ' >
                                                    <input type="file" id="file"  variant="outlined" style={{ Width: "10%", fontSize: 15 }}
                                                        onChange={handlevideo} ref={inputVideo} />
                                                    <div className='border product_imagebox  image_logosize'>

                                                        {
                                                            video ? <div style={{ display: "flex" }}>
                                                                <img src={URL.createObjectURL(video)} alt="" style={{ width: "90px", height: "81px", borderRadius: "10px" }} />
                                                                <Button color='success' onClick={resetFileInputVideo}>Cancell </Button>
                                                            </div> :
                                                                <RxVideo></RxVideo>
                                                        }





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
                                                <TextField placeholder='Add SKU ?' id="outlined-basic" variant="outlined" name='SKU' value={Product.SKU} style={{ minWidth: "20%", fontSize: 15 }}
                                                    onChange={handleChange}
                                                    InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment>, style: { fontSize: 14 } }}

                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            '& fieldset': {

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
                                        <div className='col  product_Col top'>
                                            <div className='col-4 '>
                                                <label className='label Sku'>
                                                    UPC  ?
                                                </label>
                                            </div>
                                            <div className='col-8'>
                                                <TextField placeholder='Add UPC ?' id="outlined-basic" variant="outlined" name='UPC' value={Product.UPC} style={{ minWidth: "20%", fontSize: 15 }}
                                                    onChange={handleChange}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            '& fieldset': {

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
                                                <TextField placeholder='Add Product' id="outlined-basic" variant="outlined" name='prices' value={Product.prices} style={{ minWidth: "50%", fontSize: 15 }}
                                                    onChange={handleChange}
                                                    InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment>, style: { fontSize: 14 } }}
                                                    label={massage.prices}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            '& fieldset': {
                                                                borderColor: error.prices,
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
                                        <div className='col  product_Col top '>
                                            <div className='col-2   '>
                                                <label className=''>
                                                    Discount:
                                                </label>
                                            </div>
                                            <div className='col-8'>
                                                <Select
                                                    name='discount'
                                                    value={Product.discount}
                                                    onChange={handleChange}
                                                    inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 190, fontSize: 15, background: "#AAAAAA" }}>
                                                    {
                                                        discount.map((data, index) => {
                                                            return (<MenuItem value={data.id} style={{ fontSize: 15 }} key={index}>{data.Discount_type}</MenuItem>)
                                                        })
                                                    }

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
                                                    name='tax'
                                                    onChange={handleChange}
                                                    value={Product.tax}
                                                    displayEmpty
                                                    inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 190, fontSize: 15, background: "#AAAAAA" }}>
                                                    <MenuItem style={{ fontSize: 15 }}>
                                                        <em>No Tax</em>
                                                    </MenuItem>
                                                    {
                                                        Taxs.map((data, index) => {
                                                            return (<MenuItem value={data.id} style={{ fontSize: 15 }} key={index}>{data.tax_type}</MenuItem>)
                                                        })
                                                    }

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
                                                <div className='col-sm-4  ' >
                                                    <div className='  product_Col top'>
                                                        <div className='col-4 Weight_Type '>
                                                            <label className=''>
                                                                Weight Type:
                                                            </label>
                                                        </div>
                                                        <div className='col-8 Weight_Type'>
                                                            {/* <TextField id="outlined-basic" variant="outlined" name='net_weight' value={Product.net_weight} style={{ minWidth: "50%", fontSize: 15 }}
                                                                onChange={handleChange} /> */}
                                                            <Select
                                                                value={Product.net_weight}
                                                                name='net_weight'
                                                                onChange={handleChange}
                                                                displayEmpty
                                                                inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 190, fontSize: 15 }}>

                                                                {
                                                                    net_weight.map((data, index) => {
                                                                        return (<MenuItem value={data.id} style={{ fontSize: 15 }} key={index}>{data.Weight_type}</MenuItem>)
                                                                    })
                                                                }
                                                            </Select>
                                                        </div>

                                                    </div>
                                                    {/* <div className='  product_Col top'> */}
                                                    {/* <div className='col-4 Weight_Type '>
                                                            <label className=''>
                                                                Weight Price:
                                                            </label>
                                                        </div>
                                                        <div className='col-8 Weight_Type'>
                                                            <TextField id="outlined-basic" variant="outlined" name='net_weight_Price' value={Product.net_weight_Price} style={{ minWidth: "50%", fontSize: 15 }}
                                                                onChange={handleChange} />
                                                        </div> */}

                                                    {/* </div> */}
                                                    {/* <div className='  product_Col top  '> */}
                                                    {/* <div className='col-4 Weight_Type '>
                                                            <label className=''>
                                                                Status:
                                                            </label>
                                                        </div>
                                                        <div className='col-8 Weight_Type'>
                                                            <FormControl>
                                                                <RadioGroup
                                                                    row
                                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                                    name="net_weight_status"
                                                                    value={Product.net_weight_status}
                                                                    onChange={handleChange}
                                                                >
                                                                    <FormControlLabel value="Active" control={<Radio />} label="Active" />
                                                                    <FormControlLabel value="Hide" control={<Radio />} label="Hide" />
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </div> */}
                                                    {/* </div> */}
                                                    {/* <div className='col-12 center top' > */}
                                                    {/* <button className='btn Add_button' autoFocus onClick={Submit} >
                                                            Add Weight
                                                        </button> */}
                                                    {/* </div> */}

                                                </div>
                                                <div className='col-sm-4  ' >
                                                    {/* bordershedow */}
                                                    <div className='  product_Col top '>
                                                        <div className='col-4 Weight_Type '>
                                                            <label className=''>
                                                                Flavour Type:
                                                            </label>
                                                        </div>
                                                        <div className='col-8 Weight_Type'>
                                                            {/* <TextField id="outlined-basic" variant="outlined" value={NameState} style={{ minWidth: "50%", fontSize: 15 }}
                                                                onChange={handleChange} /> */}
                                                                <Select
                                                                value={Product.flavour}
                                                                name='flavour'
                                                                onChange={handleChange}
                                                                displayEmpty
                                                                inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 190, fontSize: 15 }}>

                                                                {
                                                                    Flavours.map((data, index) => {
                                                                        return (<MenuItem value={data.id} style={{ fontSize: 15 }} key={index}>{data.flavour_Name}</MenuItem>)
                                                                    })
                                                                }
                                                            </Select>
                                                        </div>

                                                    </div>
                                                    {/* <div className='  product_Col top  '>
                                                        <div className='col-4 Weight_Type '>
                                                            <label className=''>
                                                                Flavour Price:
                                                            </label>
                                                        </div>
                                                        <div className='col-8 Weight_Type'>
                                                            <TextField id="outlined-basic" variant="outlined" value={NameState} style={{ minWidth: "50%", fontSize: 15 }}
                                                                onChange={handleChange} />
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
                                                    </div> */}
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
                                                <TextField placeholder='10 gm' id="outlined-basic" variant="outlined" name='quantity' value={Product.quantity} style={{ minWidth: "50%", fontSize: 15 }}
                                                    onChange={handleChange}
                                                    InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment>, style: { fontSize: 14 } }}
                                                    label={massage.quantity}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            '& fieldset': {
                                                                borderColor: error.quantity,
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
                                                <TextField id="outlined-basic" variant="outlined" name="THC" value={Product.THC} style={{ fontSize: 15 }}
                                                    onChange={handleChange} />
                                            </div>
                                            <div className='col-2'>
                                                <label className=''>
                                                    CBD:
                                                </label>
                                                <TextField id="outlined-basic" variant="outlined" name='CBD' value={Product.CBD} style={{ fontSize: 15 }}
                                                    onChange={handleChange} />
                                            </div>
                                            <div className='col-2'>
                                                <label className=''>
                                                    CBN:
                                                </label>
                                                <TextField id="outlined-basic" variant="outlined" name='CBN' value={Product.CBN} style={{ fontSize: 15 }}
                                                    onChange={handleChange} />
                                            </div>
                                            <div className='col-2'>
                                                <label className=' wrap-text'>
                                                    Lab Result:
                                                </label>
                                                <label className="switch">
                                                    <input type="checkbox" />
                                                    <span className="slider"> </span>
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
                                                    value={Product.store}
                                                    name="store"
                                                    onChange={handleChange}
                                                    displayEmpty
                                                    inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 280, fontSize: 15, background: "#AAAAAA" }}>
                                                    <MenuItem style={{ fontSize: 15 }}>
                                                        <em>Select Store Name</em>
                                                    </MenuItem>
                                                    {
                                                        store.map((data, index) => {
                                                            return (<MenuItem value={data.id} style={{ fontSize: 15 }} key={index}>{data.Store_Name}</MenuItem>)
                                                        })
                                                    }
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
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="Stock" value="In Stock" onChange={handleChange}  id="flexRadioDefault1" />
                                                <label className="form-check-label" for="flexRadioDefault1">
                                                    In Stock
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="Stock" value="Out Of Stock" onChange={handleChange}  id="flexRadioDefault2"  />
                                                <label className="form-check-label" for="flexRadioDefault2">
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

                                    <div className=' top'>
                                        <div className='center border'>
                                            <h2> Category</h2>
                                        </div>

                                        <div className='center top'>
                                            <span><MdOutlineCheckBoxOutlineBlank></MdOutlineCheckBoxOutlineBlank></span>
                                            <span>All Products</span>
                                        </div>

                                        <div className='center'>
                                            <select id="example-single">
                                                <option value="1">Option 1</option>
                                                <option value="2">Option 2</option>
                                                <option value="3">Option 3</option>
                                                <option value="4">Option 4</option>
                                                <option value="5">Option 5</option>
                                                <option value="6">Option 6</option>
                                            </select>
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