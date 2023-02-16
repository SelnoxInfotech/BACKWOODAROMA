import React, { useRef, useContext } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Cookies from 'universal-cookie';
import Axios from "axios"
import Strain from "../ProductComponent/Strain"
import { IoImagesOutline } from 'react-icons/io5';
import { RxVideo } from "react-icons/rx"
import NetWeightpopup from "../../NetWeight/NetWeightpopup"
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ProductBrand from "../ProductComponent/ProductBrand"
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Radio from '@mui/material/Radio';
// import FormControl from '@mui/material/FormControl';
// import RadioGroup from '@mui/material/RadioGroup';
import InputAdornment from '@mui/material/InputAdornment';
import ToggleButton from '../ProductComponent/ToggleButton';
import ProductGiftVocher from '../ProductComponent/ProductGiftVocher';
import Labresult from '../ProductComponent/Labresult';
import Flavourpopup from "../../Flavour/Flavourpopup"
import Createcontext from "../../../Hooks/Context/Context"
import ProductCategory from '../ProductComponent/ProductCategory';
import NetWeight from '../ProductComponent/NetWeight';


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
export default function EditProducts(props) {
    console.log(props)
    const { state, dispatch } = useContext(Createcontext)
    const inputRef = useRef(null);
    const inputVideo = useRef(null);
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    const [open, setOpen] = React.useState(false);
    const [discount, SetDiscount] = React.useState([])
    const [Taxs, SetTaxs] = React.useState([])
    const [store, Setstore] = React.useState([])
    const [Image, SetImage] = React.useState('')
    const [video, Setvideo] = React.useState('')
    const [net_weight, SetNet_Weight] = React.useState([])
    const [Flavours, SetFlavours] = React.useState([])

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
    // const min = 0;



    const [Product, SetProduct] = React.useState({
        Product_Name: props.data.Product_Name,
        Product_Description: props.data.Product_Description,
        quantity: props.data.quantity,
        prices: props.data.prices,
        discount: props.data.discount,
        tax: props.data.tax,

        Brand_id: props.data.Brand_id,
        Multiple_Image: "",
        Product_Video: "",
        SKU: props.data.SKU,
        UPC: props.data.UPC,
        net_weight: props.data.net_weight_id,
        strain: props.data.strain,
        Sub_Category: "",
        flavour_id: props.data.flavour_id,
        THC: props.data.THC,
        CBD: props.data.CBD,
        CBN: props.data.CBN,
        lab_Result: props.data.lab_Result,
        Stock: props.data.Stock,
        Status: props.data.Status,
        Store_id: props.data.Store_id,
        tag: "",
        DiscountedAmount: "",
        Product_Image: "",
        Allow_tax: "",
        Allow_discount: "",
        Additional_Description: "",
        taxedAmount: "",
        Alt_Text: "",
        Link: "",
        After_Coupoun_Price: "",
        After_GiftVoucher: "",
        SubTotal: props.data.SubTotal,
        Sub_Category_id: props.data.Sub_Category_id,
        Claimed_Coupoun: props.data.Claimed_Coupoun,
        GiftVoucher: props.data.GiftVoucher,
    })

    console.log(Product)

    const handleChange = (event) => {

        var value = event.target.value;
        if (event.target.name === "SKU") {
            if (event.target.value.length <= 2) {


                SetProduct({
                    ...Product, [event.target.name]: value
                });

            }
        }
        else if (event.target.name === "UPC") {
            if (event.target.value.length <= 3) {

                SetProduct({
                    ...Product, [event.target.name]: value
                });

            }
        }
        else if (event.target.name === "prices") {
            if (event.target.value.length <= 5) {

                SetProduct({
                    ...Product, [event.target.name]: value
                });

            }
        }
        else if (event.target.name === "quantity") {
            if (event.target.value.length <= 3) {


                SetProduct({
                    ...Product, [event.target.name]: value
                });

            }
        }

        else {
            SetProduct({
                ...Product, [event.target.name]: value
            });
        }
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
            // SetProduct(Product => ({ ...Product, discount: response.data[0].id }))

        })
        Axios("http://34.201.114.126:8000/AdminPanel/Get-Tax/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            SetTaxs(response.data)
            // SetProduct(Product => ({ ...Product, tax: response.data[0].id }))

        })
        Axios("http://34.201.114.126:8000/AdminPanel/Get-Stores/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            Setstore(response.data)
            // SetProduct(Product => ({ ...Product, Store_id: response.data[0].id }))
        })
        Axios("http://34.201.114.126:8000/AdminPanel/Get-NetWeight/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            SetNet_Weight(response.data)
            // SetProduct(Product => ({ ...Product, net_weight: response.data[0].id }))

        })


        Axios("http://34.201.114.126:8000/AdminPanel/Get-Flavours/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            SetFlavours(response.data)
            // SetProduct(Product => ({ ...Product, flavour_id: response.data[0].id }))


        })


        Axios("http://34.201.114.126:8000/AdminPanel/FilterbyCategory/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            // SetFlavours(response.data)
            // SetProduct(Product => ({ ...Product, flavour: response.data[0].id }))

        })




    }, [token_data, state])





    const formdata = new FormData();
    formdata.append('Product_Name', Product.Product_Name);
    formdata.append('Product_Description', Product.Product_Description);
    formdata.append('discount', Product.discount);
    formdata.append('tax', Product.tax);
    formdata.append('Claimed_Coupoun', Product.Claimed_Coupoun);
    formdata.append('GiftVoucher', Product.GiftVoucher);
    formdata.append('quantity', Product.quantity);
    formdata.append('prices', Product.prices);
    formdata.append('Multiple_Image', Product.Multiple_Image);
    formdata.append('Product_Video', video);
    formdata.append('SKU', Product.SKU);
    formdata.append('UPC', Product.UPC);
    formdata.append('net_weight_id', Product.net_weight);
    formdata.append('flavour_id', Product.flavour_id);
    formdata.append('THC', Product.THC);
    formdata.append('CBD', Product.CBD);
    formdata.append('CBN', Product.CBN);
    formdata.append('lab_Result', Product.lab_Result);
    formdata.append('Stock', Product.Stock);
    formdata.append('strain', Product.strain);
    formdata.append('Sub_Category', Product.Sub_Category);
    formdata.append('Status', Product.Status);
    formdata.append('Store_id', Product.Store_id);
    formdata.append("tag", "");
    formdata.append('DiscountedAmount', "");
    formdata.append('Product_Image', Image)
    formdata.append('Allow_tax', "")
    formdata.append('Allow_discount', "")
    formdata.append('Additional_Description', "")
    formdata.append('taxedAmount', "")
    formdata.append('Alt_Text', "gjhbkk")
    formdata.append('Link', "")
    formdata.append('After_Coupoun_Price', "")
    formdata.append('After_GiftVoucher', "")
    formdata.append('SubTotal', "")
    formdata.append('Sub_Category_id', Product.Sub_Category_id)



    const Submit = () => {


        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };


        Axios.post(
            `http://34.201.114.126:8000/AdminPanel/Edit-Product/${props.data.id}`,
            formdata,
            config
        ).then(() => {
            setOpen(false);
            dispatch({ type: 'api', api: true })
            SetProduct('')
            SetImage('')
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
                                <div className="col  ">
                                    <p className='product_title'>Edit Product </p>
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
                                            <TextField
                                                placeholder='Add Product' id="outlined-basic" name='Product_Name' variant="outlined" value={Product.Product_Name} style={{ minWidth: "90%", fontSize: 15 }}
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
                                                    <input type="file" id="file" variant="outlined" style={{ Width: "10%", fontSize: 15 }}
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
                                                <TextField
                                                    type='number' placeholder='Add SKU ?' id="outlined-basic" variant="outlined" name='SKU' value={Product.SKU} style={{ minWidth: "20%", fontSize: 15 }}
                                                    onChange={handleChange}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start"> </InputAdornment>,
                                                        style: { fontSize: 14 }
                                                    }}
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

                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start"> </InputAdornment>,
                                                        style: { fontSize: 14 }
                                                    }}
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
                                                <TextField placeholder='Add Price' id="outlined-basic" variant="outlined" name='prices' value={Product.prices} style={{ minWidth: "50%", fontSize: 15 }}
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
                                                        <div className='col-8 Weight_Type'>
                                                            <NetWeight Product={Product} SetProduct={SetProduct}></NetWeight>
                                                        </div>
                                                    </div>
                                                    <div className='btn '  >
                                                        <NetWeightpopup ></NetWeightpopup>
                                                    </div>
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
                                                            <Select
                                                                value={Product.flavour_id}
                                                                name='flavour_id'
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
                                                    <div className='btn '  >
                                                        <Flavourpopup></Flavourpopup>
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
                                                <TextField type="number" placeholder='10 gm' id="outlined-basic" variant="outlined" name='quantity' value={Product.quantity} style={{ minWidth: "50%", fontSize: 15 }}
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
                                            <div className='col-4'>
                                                <Labresult Product={Product} SetProduct={SetProduct} ></Labresult>
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
                                                    value={Product.Store_id}
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
                                                <input className="form-check-input" type="radio" name="Stock" value={Product.Stock} onChange={handleChange} id="flexRadioDefault1" />
                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                    In Stock
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                    <input className="form-check-input" type="radio" name="Stock" value={Product.Stock} onChange={handleChange} id="flexRadioDefault2" />
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
                                            <ToggleButton Product={Product} SetProduct={SetProduct} />
                                        </div>
                                    </div>
                                    <div className='col Store top border '>
                                        <Strain Product={Product} SetProduct={SetProduct}></Strain>
                                    </div>

                                    <div className=' top'>
                                        <ProductCategory Product={Product} SetProduct={SetProduct}></ProductCategory>
                                    </div>
                                    <div className='col top'>
                                        <ProductBrand Product={Product} SetProduct={SetProduct} ></ProductBrand>
                                    </div>
                                    <div className='col top'>
                                        <ProductGiftVocher Product={Product} SetProduct={SetProduct} ></ProductGiftVocher>
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