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
import Couponpopup from "./Couponpop"
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select'; 
import { BsThreeDotsVertical } from 'react-icons/bs';
import CouponDelete from './CouponDelete';

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: "65%",
    color: theme.palette.text.primary,
}));



export default function Coupon() {
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    const [totel, setTotal] = React.useState([])
    React.useEffect(() => {
        axios("http://34.201.114.126:8000/AdminPanel/CouponViewSet/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            setTotal(response.data)
      

        })
    }, [token_data])
    React.useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }, []);
    const columns = [
        {
            field: 'code_l', headerName: 'Code L', editable: true, headerClassName: 'super-app-theme--header', width: 120,
        },
        { field: 'type', headerName: 'Type', editable: true, headerClassName: 'super-app-theme--header', width: 120 },

        { field: 'expires', headerName: 'Expire', type: 'text', editable: true, headerClassName: 'super-app-theme--header', width: 150 ,
        renderCell: (params) =>  params.row.created.slice(0,10)
    },
        {
            field: 'code', headerName: 'Code', type: 'text', editable: true, width: 180, headerClassName: 'super-app-theme--header',
            renderCell: (params) => <span dangerouslySetInnerHTML={{ __html: params.formattedValue }} />
        },
        { field: 'bound', headerName: 'Bound', type: 'text', editable: true, width: 90, headerClassName: 'super-app-theme--header' },
        { field: 'Edit', headerName: 'Edit', type: 'button', editable: true, headerClassName: 'super-app-theme--header',
        renderCell: (params) => (
            <>
                <Box >
                    <Select IconComponent={BsThreeDotsVertical} labelId="demo-simple-select-error-label">
                        <MenuItem > <CouponDelete data={params.row}></CouponDelete> </MenuItem>
                       
                    </Select>
                </Box>
            </>

        )
    },

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
                        <div className="col hadding_al "> <h2>Coupon   
                        </h2></div>
                        <div className="col cat_but popup_A" >  <span className='btn'> <h2> <Couponpopup></Couponpopup></h2></span></div>
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
    );
}