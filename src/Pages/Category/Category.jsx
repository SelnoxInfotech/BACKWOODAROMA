import React, { useEffect,useContext } from 'react'
import Createcontext from "../../Hooks/Context/Context"
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
import Eelete from "../Category/Delete";
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';
export default function Category(props) {
    const { state} = useContext(Createcontext)

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
    
    
    useEffect(() => {
        const cookies = new Cookies();
        const token_data = cookies.get('Token_access')

        axios("http://34.201.114.126:8000/AdminPanel/Get-Category/", {

        headers: {
            'Authorization': `Bearer ${token_data}`
        }
    }).then(response => {

        setTotal([...response.data])
     
    })

    },[state ])




    const columns = [
        { field: 'name', headerName: 'Name', editable: true, width: 180, headerClassName: 'super-app-theme--header', headerAlign: 'center', },
        {
            field: 'Status', headerName: 'Status', type: 'number', editable: false, headerClassName: 'super-app-theme--header', headerAlign: 'center',
            renderCell: (params) => {

                if (params.formattedValue === "Active") {
                    return (
                        <GridActionsCellItem

                            index={params}
                            icon={<h2><AiFillEye /> </h2>}
                            label="Active"
                            style={{ color: "#31B665 ", fontSize: 25 }}
                            fontSize="100" >
                        </GridActionsCellItem>

                    )
                }
                return (
                    <GridActionsCellItem
                        index={params}
                        icon={<h2><AiOutlineEyeInvisible /></h2>}
                        label="hide"
                        style={{ color: "#FF0000" }}
                    />
                )
            }
        },
        {
            field: 'Edit', headerName: 'Edit', type: 'button', editable: false, headerClassName: 'super-app-theme--header', headerAlign: 'center',
            renderCell: (params) => (
                <>
                    <Box >
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
