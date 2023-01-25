import React, { useEffect, useContext } from 'react'
import Createcontext from "../../Hooks/Context/Context"
import Cookies from 'universal-cookie';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Categorypopup from './Categorypopup';
import axios from "axios"
import { useSnackbar } from 'notistack';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import Box from '@mui/material/Box';
import { BsThreeDotsVertical } from 'react-icons/bs';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CategoryEditbox from "./CategoryEdit"
import Eelete from "../Category/Delete";
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';
export default function Category(props) {
    const { dispatch } = useContext(Createcontext)

    const { enqueueSnackbar } = useSnackbar();
    const { state } = useContext(Createcontext)
   
    const CustomFontTheme = createTheme({
        typography: {
            fontSize: 25
        },
        components: {
            MuiContainer: {
                styleOverrides: {
                    root: {
                        fontSize: 24,

                    }
                }
            },


        },
        
   
    });

    const [totel, setTotal] = React.useState([])


    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    useEffect(() => {

        axios("http://34.201.114.126:8000/AdminPanel/Get-Category/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }
        }).then(response => {

            setTotal([...response.data])
        })

    }, [state,token_data])




     function SubmitEditData   (params)  {
                    const form = {

                        "name": params.row.name,
                        "Status": params.row.Status === "Active" ? "Hide" : "Active" 
                    }
                    axios.post(`http://34.201.114.126:8000/AdminPanel/update-Category/${params.row.id}`, form, {
            
                        headers: {
                            'Authorization': `Bearer ${token_data}`
                        }
            
                    }).then(response => {
                        if (response) {
                            dispatch({ type: 'api', api: true })
                            enqueueSnackbar('Edit Category Status success  !', { variant: 'success' });
                           
                        }
                    }).catch(
                        function (error) {
                            return Promise.reject(error)
                        }
                    )
                }
    


    const columns = [
        { field: 'name', headerName: 'Name', editable: false, width: 180, headerClassName: 'super-app-theme--header', headerAlign: 'center', },
        {
            field: 'Status', headerName: 'Status', type: 'number', editable: true, headerClassName: 'super-app-theme--header', headerAlign: 'center',
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
        {
            field: 'Edit', headerName: 'Edit', type: 'button', editable: false, headerClassName: 'super-app-theme--header', headerAlign: 'center',
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
                            <MenuItem  ><CategoryEditbox data={params.row} ></CategoryEditbox></MenuItem>
                            <MenuItem  ><Eelete data={params.row}></Eelete> </MenuItem>
                        </Select>
                    </Box>
                </>

            )
        },

    ];

    const rows = totel

    return (
        <div className='container-fluid '>
            <div className='row'>

                <div className='col-sm-2 border  '>

                </div>
                <div className='col-8 border   ' >

                    <div className='col-12 Add_Category'>
                        <div className="col"> <h2>  Category
                        </h2></div>
                        <div className="col cat_but " >   <span className='btn'>{<Categorypopup></Categorypopup>}</span></div>
                    </div>

                    <div className='col-12'>
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
                            <ThemeProvider theme={CustomFontTheme}>
                                <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid rows={rows} columns={columns} components={{ Toolbar: GridToolbar, }} 
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
