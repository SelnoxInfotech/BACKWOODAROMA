import React from 'react'
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
            console.log(response.data)

        })
    }, [token_data])


    const columns = [
        {
            field: 'Product_Image', headerName: 'Image', width: 80, editable: true, headerClassName: 'super-app-theme--header',
            renderCell: (params) => <img src={"http://34.201.114.126:8000/" + params.value} alt="flavoursImage" width="35" height="30" />,
        },
        { field: 'Product_Name', headerName: 'Name', width: 200, editable: true, headerClassName: 'super-app-theme--header' },
        { field: 'Sub_Category', headerName: 'Category', type: 'text', editable: true, width: 200, headerClassName: 'super-app-theme--header' },
        { field: 'prices', headerName: 'Price', type: 'text', editable: true, width: 200, headerClassName: 'super-app-theme--header' },
        { field: 'Stock', headerName: 'Inventory', type: 'text', editable: true, width: 200, headerClassName: 'super-app-theme--header' },
        { field: 'Edit', headerName: 'Edit', type: 'button', editable: true, headerClassName: 'super-app-theme--header' },


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

                <Box sx={{
                    height: 400,
                    width: '100%',
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#E1FFED',
                    },
                    '& .css-e07ewl-MuiButtonBase-root-MuiButton-root': {
                        color: '#000000',
                        display: "flex",

                    },
                }}>
                    <StyledPaper sx={{ my: 11, mx: 'auto', p: 2, }}>
                        <Grid container wrap="nowrap" spacing={2}>

                            <Grid item xs>

                                <div className='col-12' >
                                    <ThemeProvider theme={CustomFontTheme}>
                                        <div style={{ height: 500, width: '100%', }}>
                                            <DataGrid rows={rows} columns={columns} components={{ Toolbar: GridToolbar }} checkboxSelection />
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
