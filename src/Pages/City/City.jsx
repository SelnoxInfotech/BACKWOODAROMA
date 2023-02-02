import React, { useContext } from 'react'
import Cookies from 'universal-cookie';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import CityPopUp from "./Citypopup"
import axios from "axios";
import Box from '@mui/material/Box';
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { BsThreeDotsVertical } from 'react-icons/bs';
import CityEdit from './CityEdit';
import CityDelete from "./CityDelete"
import Createcontext from "../../Hooks/Context/Context"
import { useSnackbar } from 'notistack';
export default function City() {
    const { enqueueSnackbar } = useSnackbar();
    const { state, dispatch } = useContext(Createcontext)
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

    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    const [totel, setTotal] = React.useState([])
    React.useEffect(() => {
        axios("http://34.201.114.126:8000/AdminPanel/Get-Cities/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            setTotal(response.data)

        })
    }, [token_data, state])

    const Submit = (params) => {
        
        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };

        const data = {

            "CityName": params.row.CityName,
            "States_id": params.row.States_Name,
            "Status": params.row.Status === "Active" ? "Hide" : "Active"
        }
        axios.post(
            `http://34.201.114.126:8000/AdminPanel/update-Cities/${params.row.id}`,
            data,
            config
        ).then(() => {
            dispatch({ type: 'api', api: true })
            enqueueSnackbar('City Status success !', { variant: 'success' });
        })
    };

    const columns = [
        { field: 'CityName', headerName: 'City Name', width: 200, editable: true, headerClassName: 'super-app-theme--header' },
        { field: 'state_name', headerName: 'States Name', width: 200, editable: true, headerClassName: 'super-app-theme--header' },
        {
            field: 'Status', headerName: 'Status', editable: false, width: 300, headerClassName: 'super-app-theme--header',
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
        {
            field: 'Edit', headerName: 'Edit', type: 'button', editable: true, headerClassName: 'super-app-theme--header',
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
                        }} >
                        <Select IconComponent={BsThreeDotsVertical} labelId="demo-simple-select-error-label">
                            <MenuItem > <CityEdit data={params.row} city={totel}  ></CityEdit></MenuItem>
                            <MenuItem  > <CityDelete data={params.row}></CityDelete></MenuItem>
                        </Select>
                    </Box>
                </>

            )
        },


    ];

    const rows = totel
    return (
        <div className='container-fluid'>
            <div className='row'>

                <div className='col-sm-2 '>

                </div>
                <div className='col-8 border   ' >

                    <div className='col-12 Add_Category'>
                        <div className="col"> <h2> City
                        </h2></div>
                        <div className="col cat_but" >  <span className='btn'> <h2> <CityPopUp></CityPopUp></h2></span></div>
                    </div>

                    <div className='col-12' >
                        <Box sx={{

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

                            <ThemeProvider theme={CustomFontTheme}>
                                <div style={{ height: 400, width: '100%', }}>
                                    <DataGrid rows={rows} columns={columns} components={{ Toolbar: GridToolbar }} checkboxSelection
                                        sx={{
                                            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                                                outline: "1px solid black ",
                                            },
                                        }}
                                    />
                                </div>
                            </ThemeProvider>
                        </Box>
                    </div>
                </div>




            </div>

        </div>


    )
}
