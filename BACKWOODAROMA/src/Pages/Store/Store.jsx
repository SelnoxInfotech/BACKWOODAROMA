import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import axios from "axios";
import Cookies from 'universal-cookie';
import Storepopup from "./Storepopup"

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: "65%",
    color: theme.palette.text.primary,
}));



export default function Store() {
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    const [totel, setTotal] = React.useState([])
    React.useEffect(() => {
        axios("http://34.201.114.126:8000/AdminPanel/Get-Stores/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            setTotal(response.data)

        })
    }, [token_data])
    const columns = [
        {
            field: 'Store_Image', headerName: 'Store Image', editable: true, headerClassName: 'super-app-theme--header', width: 120,
            renderCell: (params) => <img src={"http://34.201.114.126:8000/" + params.value} alt="flavoursImage" width="35" height="30" />,
        },
        { field: 'Store_Name', headerName: 'Store Name', editable: true, headerClassName: 'super-app-theme--header', width: 120 },
        { field: 'city_name', headerName: 'City Name', type: 'text', editable: true, width: 130, headerClassName: 'super-app-theme--header' },
        { field: 'Store_Address', headerName: 'Store Address', type: 'text', editable: true, headerClassName: 'super-app-theme--header', width: 150 },
        {
            field: 'Stores_Description', headerName: 'Stores Description', type: 'text', editable: true, width: 180, headerClassName: 'super-app-theme--header',
            renderCell: (params) => <span dangerouslySetInnerHTML={{ __html: params.formattedValue }} />
        },
        { field: 'Stores_Website', headerName: 'Stores Website', type: 'text', editable: true, width: 130, headerClassName: 'super-app-theme--header' },
        { field: 'Stores_MobileNo', headerName: 'Stores MobileNo', type: 'text', editable: true, width: 150, headerClassName: 'super-app-theme--header' },
        { field: 'Status', headerName: 'Status', type: 'text', editable: true, width: 90, headerClassName: 'super-app-theme--header' },
        { field: 'Edit', headerName: 'Edit', type: 'button', editable: true, headerClassName: 'super-app-theme--header' },

    ];

    const rows = totel;

    const CustomFontTheme = createTheme({
        typography: {
            fontSize: 25,
            colors: "#31B665"
        },
        components: {
            MuiContainer: {
                styleOverrides: {
                    root: {

                        fontSize: 24
                    }
                }
            }
        }
    });
    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                <div className='col-12 Add_Category margin_top '>
                        <div className="col hadding_al "> <h2>Store
                        </h2></div>
                        <div className="col cat_but popup_A" >  <span className='btn'> <h2><Storepopup></Storepopup> </h2></span></div>
                    </div>

                </div>
            
            <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
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
    );
}