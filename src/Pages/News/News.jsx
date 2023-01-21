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
import Newspop from "./NewsPopup"
import NewsEdit from "./EditNews"
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { BsThreeDotsVertical } from 'react-icons/bs';
import DeleteNews from "./DeleteNews"
const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: "65%",
    color: theme.palette.text.primary,
}));



export default function News() {
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    const [totel, setTotal] = React.useState([])
    React.useEffect(() => {
        axios("http://34.201.114.126:8000/AdminPanel/Get-News/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            setTotal(response.data)
        

        })
    }, [token_data])
    
    const columns = [
        {
            field: 'Image', headerName: 'Post Image', editable: true, headerClassName: 'super-app-theme--header', width: 120,
            renderCell: (params) => <img src={"http://34.201.114.126:8000/" + params.value} alt="Alt_Text" width="35" height="30" />,
        },
        { field: 'Title', headerName: 'Post Title', editable: true, headerClassName: 'super-app-theme--header', width: 120 },

        { field: 'Link', headerName: 'Link', type: 'text', editable: true, headerClassName: 'super-app-theme--header', width: 150 },
        {
            field: 'created', headerName: 'Publish Date', type: 'text', editable: true, width: 180, headerClassName: 'super-app-theme--header',
            renderCell: (params) =>  params.row.created.slice(0,10)
        },
        { field: 'Status', headerName: 'Views', type: 'text', editable: true, width: 90, headerClassName: 'super-app-theme--header' },
        { field: 'Edit', headerName: 'Edit', type: 'button', editable: true, headerClassName: 'super-app-theme--header',
        renderCell: (params) => (
            <>
                <Box >
                    <Select IconComponent={BsThreeDotsVertical} labelId="demo-simple-select-error-label">
                        <MenuItem  > <NewsEdit data={params.row}></NewsEdit></MenuItem>
                        <MenuItem  > <DeleteNews data={params.row}></DeleteNews> </MenuItem>
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
                        <div className="col hadding_al "> <h2>Latest News   
                        </h2></div>
                        <div className="col cat_but popup_A" >  <span className='btn'> <h2> <Newspop></Newspop></h2></span></div>
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