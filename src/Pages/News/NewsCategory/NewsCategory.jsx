import React, { useEffect,useContext } from 'react'
import Createcontext from "../../../Hooks/Context/Context"
import Cookies from 'universal-cookie';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from "axios"
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import Box from '@mui/material/Box';
import { BsThreeDotsVertical } from 'react-icons/bs';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import AddNewsCategory  from "./AddNewsCategory"
import NewsCategoryEditbox from "./EditNewsCategory"
import NewsCategoryDelete  from "./DelectnewsCategory"
export default function NewsCategory(props) {
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

        axios("http://34.201.114.126:8000/AdminPanel/Get-NewsCategory/", {

        headers: {
            'Authorization': `Bearer ${token_data}`
        }
    }).then(response => {

        setTotal([...response.data])

    })

    },[state])




    const columns = [
        { field: 'name', headerName: 'Name', editable: true, width: 180, headerClassName: 'super-app-theme--header', headerAlign: 'center', },
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
                        '& . MuiDataGrid-root .MuiDataGrid-cell:focus': {
                            outline: "solid #0f1010 1px"
                        }
                    }}
                     >
                        <Select IconComponent={BsThreeDotsVertical} labelId="demo-simple-select-error-label">
                            <MenuItem  > <NewsCategoryEditbox data={params.row}></NewsCategoryEditbox></MenuItem>
                            <MenuItem  > <NewsCategoryDelete data={params.row}></NewsCategoryDelete></MenuItem>
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
                        <div className="col"> <h2>News Category
                        </h2></div>
                        <div className="col cat_but " >   <span className='btn'>{<AddNewsCategory></AddNewsCategory>}</span> </div>
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
