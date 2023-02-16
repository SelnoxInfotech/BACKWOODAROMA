import React , {useContext} from 'react';
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
import { BsThreeDotsVertical } from 'react-icons/bs';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import StoreEdit from './StoreEdit';
import StoreDelete from "./StoreDelete"
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Createcontext from '../../Hooks/Context/Context';
import { useSnackbar } from 'notistack';



const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: "65%",
    color: theme.palette.text.primary,
}));



export default function Store() {
    const { enqueueSnackbar } = useSnackbar();
    const { state, dispatch  } = useContext(Createcontext)
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
    }, [token_data,state ])


    const Submit = (params) => {
        const formdata = new FormData();
        formdata.append('Store_Name', params.row.Store_Name); 
        formdata.append('Store_Type', params.row.Store_Type);
        formdata.append('LicenceNo', params.row.LicenceNo);
        formdata.append('Store_Address', params.row.Store_Address);
        formdata.append('Stores_Website', params.row.Stores_Website);
        formdata.append('Stores_MobileNo', params.row.Stores_MobileNo);
        formdata.append('Status', params.row.Status ==="Active"  ? "Hide" : "Active");
        formdata.append('city_id', params.row.city_id)
     

        const cookies = new Cookies();
        const token_data = cookies.get('Token_access')

        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };


        axios.post(
            `http://34.201.114.126:8000/AdminPanel/update-Stores/${params.row.id}`,
            formdata,
            config
        ).then(() => {
            dispatch({ type: 'api', api: true })
            enqueueSnackbar('Edit Store Status  success !', { variant: 'success' });
        })
    };

    const columns = [
        {
            field: 'Store_Image', headerName: 'Store Image', editable: true, headerClassName: 'super-app-theme--header', width: 110,
            renderCell: (params) => <img src={"http://34.201.114.126:8000/" + params.value} alt="flavoursImage" width="35" height="30" />,
        },
        { field: 'Store_Name', headerName: 'Store Name', editable: true, headerClassName: 'super-app-theme--header', width: 110 },
        { field: 'city_name', headerName: 'City Name',  editable: true, width: 130, headerClassName: 'super-app-theme--header' },
        { field: 'Store_Address', headerName: 'Store Address', editable: true, headerClassName: 'super-app-theme--header', width: 150 },
        {
            field: 'Stores_Description', headerName: 'Stores Description',  editable: true, width: 180, headerClassName: 'super-app-theme--header',
            renderCell: (params) => <span dangerouslySetInnerHTML={{ __html: params.formattedValue }} />
        },
        { field: 'Stores_Website', headerName: 'Stores Website',  editable: true, width: 130, headerClassName: 'super-app-theme--header' },
        { field: 'Stores_MobileNo', headerName: 'Stores MobileNo', editable: true, width: 150, headerClassName: 'super-app-theme--header' },
        { field: 'Status', headerName: 'Status', editable: true, width: 80, headerClassName: 'super-app-theme--header',
        
        renderCell: (params) => {

            if (params.formattedValue === "Active") {
                return (
                    <p
                        style={{ color: "#31B665 ", fontSize: 25, cursor: "pointer" }}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            Submit(params);
                        }}
                    ><AiFillEye /> </p>

                )
            }
            return (
                <p
                    style={{ color: "red ", fontSize: 25, cursor: "pointer" }}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        Submit(params);
                    }}
                ><AiOutlineEyeInvisible /></p>

            )
        }
    },
        { field: 'Edit', headerName: 'Edit', editable: true, headerClassName: 'super-app-theme--header',
        renderCell: (params) => (
            <>
                <Box >
                    <Select IconComponent={BsThreeDotsVertical} labelId="demo-simple-select-error-label">
                        <MenuItem ><StoreEdit data={params.row}></StoreEdit></MenuItem>
                        <MenuItem  >  <StoreDelete data={params.row} ></StoreDelete></MenuItem>
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
                        <div className="col hadding_al "> <h2>Store
                        </h2></div>
                        <div className="col cat_but popup_A" >  <span className='btn'> <h2><Storepopup></Storepopup> </h2></span></div>
                    </div>

                </div>
            
            <Box     sx={{
                            height: 400,
                            width: '100%',
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#E1FFED',
                            },
                            '& .MuiButton-root': {
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