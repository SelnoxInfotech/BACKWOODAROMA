import React ,{useContext}from 'react'
import Cookies from 'universal-cookie';
import Createcontext from "../../Hooks/Context/Context"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import StatePopUp from "./Statespopup"
import axios from "axios";
import Box from '@mui/material/Box';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import StateEdit from  "./StateEdit"
import StateDelete from './StatesDelete';



export default function State() {
    const { state ,dispatch} = useContext(Createcontext)
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
    const [totel, setTotal] = React.useState([])

    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    React.useEffect(() => {
        axios("http://34.201.114.126:8000/AdminPanel/Get-States/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            setTotal([...response.data])
                
        })
    }, [state,token_data])
    function SubmitEditData(params) {
    
        const form = {
            "id":params.row.id,
            "Country_id":params.row.Country_id,
            "StateName":params.row.StateName,
           " country_name":params.row.CountryName,
            "Status": params.row.Status === "Active" ? "Hide" : "Active"
        }
        axios.post(`http://34.201.114.126:8000/AdminPanel/update-States/${params.row.id}`, form, {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            if (response) {
                dispatch({ type: 'api', api: true })
               

            }
        }).catch(
            function (error) {
                return Promise.reject(error)
            }
        )
    }
    

    const columns = [
        { field: 'StateName', headerName: 'States Name', width: 200, editable: true, headerClassName: 'super-app-theme--header' },
        { field: 'country_name', headerName: 'Country Name', width: 200, editable: true, headerClassName: 'super-app-theme--header' },
        { field: 'Status', headerName: 'Status', type: 'text', editable: true, width: 300, headerClassName: 'super-app-theme--header',
        renderCell: (params) => {

            if (params.formattedValue === "Active") {
                return (
                    <p
                        style={{ color: "#31B665 ", fontSize: 25, cursor: "pointer" }}
                        variant="contained"
                        color="primary"
                        onClick={() => { 
                        SubmitEditData(params);
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
                SubmitEditData(params);
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
                        <MenuItem  > <StateEdit data={params.row} ></StateEdit></MenuItem>
                        <MenuItem  > <StateDelete data={params.row} ></StateDelete></MenuItem>
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
                        <div className="col"> <h2> States
                        </h2></div>
                        <div className="col cat_but" >  <span className='btn'> <h2><StatePopUp></StatePopUp></h2></span></div>
                    </div>

                    <div className='col-12' >
                    <Box 
                   sx={{

                    height: 400,
                    width: '100%',
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#E1FFED',
                    },
                    '& .css-e07ewl-MuiButtonBase-root-MuiButton-root': {
                        color: '#000000',
                        display: "flex",

                    },
                    
                    
                }}
                    >

                        <ThemeProvider theme={CustomFontTheme}>
                            <div style={{ height: 400, width: '100%', }}>
                                <DataGrid rows={rows} columns={columns}  components={{ Toolbar: GridToolbar }}  checkboxSelection
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
