import React , {useContext} from 'react'
import Cookies from 'universal-cookie';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import CountriesPopup from "./CountriesPopUp"
import axios from "axios";
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useSnackbar } from 'notistack';
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import CountryEdit from "./CountryEdit"
import Createcontext from "../../Hooks/Context/Context"
import DeleteCountry from "../Countries/DeleteCountry"

export default function Countries() {
    const { state ,dispatch} = useContext(Createcontext)
    const { enqueueSnackbar } = useSnackbar();
    const CustomFontTheme = createTheme({
        typography: {
            fontSize: 25,
            colors : "#31B665"
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
        axios("http://34.201.114.126:8000/AdminPanel/Get-Country", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            setTotal(response.data)
                
        })
    }, [token_data ,state])

    const Submit = (params) => {
        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };
        const data = {
            "id" : params.row.id,
            "CountryName": params.row.CountryName.toUpperCase(),
            "Status": params.row.Status === "Active" ? "Hide" : "Active"
        }
        axios.post(
            `http://34.201.114.126:8000/AdminPanel/update-Country/${params.row.id}`,
            data,
            config
        ).then(() => {
         
            dispatch({ type: 'api', api: true })
            enqueueSnackbar('Edit Countries success !', { variant: 'success' });
        }).catch(
            function (error) {
                return Promise.reject(error)
            }
        )
    };


    const columns = [
        { field: 'CountryName', headerName: 'Country Name', width: 200, editable: false, headerClassName: 'super-app-theme--header' },
        {
            field: 'Status', headerName: 'Status', type: 'number', editable: false, headerClassName: 'super-app-theme--header', headerAlign: 'center',
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
                ><AiOutlineEyeInvisible/></p>

                )
            }
        },
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
                   '& . MuiDataGrid-root .MuiDataGrid-cell:focus' : {
                        outline: "solid #0f1010 1px"
                    }
                }}
                 >
                    <Select IconComponent={BsThreeDotsVertical} labelId="demo-simple-select-error-label">
                        <MenuItem ><CountryEdit data={params.row} ></CountryEdit></MenuItem>
                        <MenuItem  > <DeleteCountry data={params.row}></DeleteCountry></MenuItem>
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
                        <div className="col"> <h2>  Countries
                        </h2></div>
                        <div className="col cat_but" >  <span className='btn'> <h2><CountriesPopup></CountriesPopup></h2></span></div>
                    </div>

                    <div className='col-12' >
                  
                            
                        <ThemeProvider theme={CustomFontTheme}>
                            <div style={{ height: 400, width: '100%', }}>
                                <DataGrid rows={rows} columns={columns}  components={{ Toolbar: GridToolbar }}  
                                sx={{
                                    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                                       outline: "1px solid black ",
                                    },
                                 }}
                                />
                            </div>
                        </ThemeProvider>
                 
                    </div>
                </div>




            </div>

        </div>


    )
}
