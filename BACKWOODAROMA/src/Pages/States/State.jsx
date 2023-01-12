import React from 'react'
import Cookies from 'universal-cookie';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import StatePopUp from "./Statespopup"
import axios from "axios";
import Box from '@mui/material/Box';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import StateEdit from  "./StateEdit"
import StateDelete from './StatesDelete';



export default function State() {
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
        axios("http://34.201.114.126:8000/AdminPanel/Get-States/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            setTotal(response.data)
            console.log(response.data)
                
        })
    }, [token_data])


    const columns = [
        { field: 'StateName', headerName: 'States Name', width: 200, editable: true, headerClassName: 'super-app-theme--header' },
        { field: 'country_name', headerName: 'Country Name', width: 200, editable: true, headerClassName: 'super-app-theme--header' },
        { field: 'Status', headerName: 'Status', type: 'text', editable: true, width: 300, headerClassName: 'super-app-theme--header',
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
        { field: 'Edit', headerName: 'Edit', type: 'button', editable: true, headerClassName: 'super-app-theme--header',
        renderCell: (params) => (
            <>
                <Box >
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
                            <div style={{ height: 400, width: '100%', }}>
                                <DataGrid rows={rows} columns={columns}  components={{ Toolbar: GridToolbar }}  checkboxSelection/>
                            </div>
                        </ThemeProvider>
                        </Box>
                    </div>
                </div>




            </div>

        </div>


    )
}
