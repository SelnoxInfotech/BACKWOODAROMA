import React , {useContext} from 'react'
import Cookies from 'universal-cookie';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import Box from '@mui/material/Box';
import axios from "axios";
import Grid from '@mui/material/Grid';
import ProductPopUp  from "./Productpopup"
import ProductDelete from './ProductDelete';
import Select from '@mui/material/Select';
import { BsThreeDotsVertical } from 'react-icons/bs';
import MenuItem from '@mui/material/MenuItem';
import Createcontext from '../../Hooks/Context/Context';
import EditProducts from "../Product/EditeProduct/EditProduct"

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: "65%",
    color: theme.palette.text.primary,
}));

export default function Product() {
    const CustomFontTheme = createTheme({

        typography: {
            fontSize: 25,
            colors: "#31B665"
        },

        components: {
            MuiContainer: {
                styleOverrides: {
                    root: {

                        fontSize: 24,

                    },

                }
            }
        }
    });
    const { state } = useContext(Createcontext)

    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    const [totel, setTotal] = React.useState([])
    React.useEffect(() => {
        axios("http://34.201.114.126:8000/AdminPanel/Get-Product/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            setTotal(response.data)
        })
    }, [token_data , state])


    const columns = [
        {
            field: 'Product_Image', headerName: 'Image', width: 80, editable: true, headerClassName: 'super-app-theme--header',
            renderCell: (params) => <img src={"http://34.201.114.126:8000/" + params.value} alt="flavoursImage" width="35" height="30" />,
        },
        { field: 'Product_Name', headerName: 'Name', width: 200, editable: true, headerClassName: 'super-app-theme--header' },
        { field: 'SubCategory_name', headerName: 'Sub Category', type: 'text', editable: true, width: 200, headerClassName: 'super-app-theme--header' },
        { field: 'prices', headerName: 'Price', type: 'text', editable: true, width: 200, headerClassName: 'super-app-theme--header' },
        { field: 'Stock', headerName: 'Inventory', type: 'text', editable: true, width: 200, headerClassName: 'super-app-theme--header' },
        { field: 'Edit', headerName: 'Edit', type: 'button', editable: true, headerClassName: 'super-app-theme--header',
    
       renderCell: (params) => (
            <>
                <Box
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderWidth: "1px",
                                borderColor: 'black',
                            },
                        },
                        '& . MuiDataGrid-root .MuiDataGrid-cell:focus': {
                            outline: "solid #0f1010 1px"
                        }
                    }}

                >
                    <Select IconComponent={BsThreeDotsVertical} labelId="demo-simple-select-error-label">
                        <MenuItem><EditProducts data={params.row}></EditProducts></MenuItem>
                        <MenuItem><ProductDelete data={params.row}></ProductDelete></MenuItem>
                    </Select>
                </Box>
            </>

        )
    },


    ];

    const rows = totel
    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-12 Add_Category margin_top '>
                        <div className="col hadding_al "> <h2>Product
                        </h2></div>
                        <div className="col cat_but popup_A" >  <span className='btn'> <h2> <ProductPopUp></ProductPopUp> </h2></span></div>
                    </div>

                </div>

                <Box   sx={{
                    height: 400,
                    width: '100%',
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#E1FFED',
                    },
                    '& .MuiButton-root': {
                        color: '#000000',
                        display: "flex",
                    }
              
                    
                }}>
                    <StyledPaper sx={{ my: 11, mx: 'auto', p: 2, }}>
                        <Grid container wrap="nowrap" spacing={2}>

                            <Grid item xs>

                                <div className='col-12' >
                                    <ThemeProvider theme={CustomFontTheme}>
                                        <div style={{ height: 500, width: '100%', }}>
                                            <DataGrid rows={rows} columns={columns} components={{ Toolbar: GridToolbar }} checkboxSelection
                                            
                                            sx={{
                                                "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                                                    outline: "1px solid black ",
                                                },
                                            }}
                                            />
                                        </div>
                                    </ThemeProvider>
                                </div>
                            </Grid>
                        </Grid>
                    </StyledPaper>
                </Box>
            </div>
        </>
    )
}
