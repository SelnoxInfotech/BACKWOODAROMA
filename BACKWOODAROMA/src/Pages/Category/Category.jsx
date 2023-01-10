import React from 'react'
import Cookies from 'universal-cookie';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Categorypopup from './Categorypopup';
import axios from "axios"
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import Box from '@mui/material/Box';
import { BsThreeDotsVertical } from 'react-icons/bs';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CategoryEditbox from "./CategoryEdit"
export default function Category() {
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
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


        }
    });

    const [totel, setTotal] = React.useState([])
    React.useEffect(() => {
       
        axios("http://34.201.114.126:8000/AdminPanel/Get-Category/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }
        }).then(response => {
            setTotal(response.data)


        })
    },[token_data])
   


    const Delete = (event) => {
     const id = event.id
        axios.delete(`http://34.201.114.126:8000/AdminPanel/delete-Category/${id}`, {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }
        }).then(response => {
            


        })
    };
   

    const columns = [
        { field: 'name', headerName: 'Name', editable: true, width: 180, headerClassName: 'super-app-theme--header', headerAlign: 'center', },
        { field: 'Status', headerName: 'Status', type: 'number', editable: true, headerClassName: 'super-app-theme--header', headerAlign: 'center', },
        {
            field: 'Edit', headerName: 'Edit', type: 'button', editable: false, headerClassName: 'super-app-theme--header', headerAlign: 'center',
            renderCell: (params) => (
                <>
                   <Box >
                   <Select  sx={{ borderColor: 'grey.500' }}  value={""}  closeOnSelect={true} IconComponent={BsThreeDotsVertical} labelId="demo-simple-select-error-label">
                        <MenuItem ><div value={""}><CategoryEditbox  data={params.row}></CategoryEditbox></div></MenuItem>
                        <MenuItem value={""} ><button  className='btn' onClick={() => { Delete( params) }}> Delete</button> </MenuItem>
                        <MenuItem value={""} >Duplicate</MenuItem>
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
                                    <DataGrid rows={rows} columns={columns} components={{ Toolbar: GridToolbar, }} />
                                </div>
                            </ThemeProvider>
                        </Box>
                    </div>







                </div>




            </div>

        </div>


    )
}
