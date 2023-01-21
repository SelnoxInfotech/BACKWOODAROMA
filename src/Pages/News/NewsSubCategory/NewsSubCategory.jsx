import React , {useContext} from 'react'
import Cookies from 'universal-cookie';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import Box from '@mui/material/Box';
import axios from "axios";
import { BsThreeDotsVertical } from 'react-icons/bs';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import NewsSubCategoryEdit from "./EditSubCategory"
import Createcontext from "../../../Hooks/Context/Context"
import DeleteSubCategory from "./DeleteSubCategory"
import AddNewsCategory from "./AddSubCategory"
export default function NewsSubCategory() {
    const { state} = useContext(Createcontext)
    const CustomFontTheme = createTheme({
        typography: {
            fontSize: 25
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
    React.useEffect(() => {
        const cookies = new Cookies();
        const token_data = cookies.get('Token_access')
        axios("http://34.201.114.126:8000/AdminPanel/Get-NewsSubCategory", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            setTotal(response.data.data)

        })
    }, [state])
    
    const columns = [
        { field: 'name', headerName: 'Name', width: 200, editable: true, headerClassName: 'super-app-theme--header' },
        { field: 'category_name', headerName: 'News Category', type: 'text', editable: true, width: 300, headerClassName: 'super-app-theme--header' },
        {
            field: 'Edit', headerName: 'Edit', type: 'button', headerClassName: 'super-app-theme--header', cellClassName: 'Edit',
            renderCell: (params) => (
                <>
                    <Box >
                        <Select IconComponent={BsThreeDotsVertical} labelId="demo-simple-select-error-label">
                            <MenuItem ><NewsSubCategoryEdit data={params.row} ></NewsSubCategoryEdit></MenuItem>
                            <MenuItem  > <DeleteSubCategory data={params.row}></DeleteSubCategory> </MenuItem>
                        </Select>
                    </Box>
                </>

            )


        }
    ]

        const rows = totel
return (
    <div className='container-fluid'>
        <div className='row'>

            <div className='col-sm-2 '>

            </div>
            <div className='col-8 border   ' >

                <div className='col-12 Add_Category'>
                    <div className="col"> <h2>News Sub Category
                    </h2></div>
                    <div className="col cat_but" >  <span className='btn'> <h2> <AddNewsCategory></AddNewsCategory></h2></span></div>
                </div>

                <div className='col-12' >
                    <Box sx={{

                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#E1FFED',

                        },
                        '& .css-e07ewl-MuiButtonBase-root-MuiButton-root': {
                            color: '#000000',
                            display: "flex",

                        }
                    }}>
                        <ThemeProvider theme={CustomFontTheme}>
                            <div style={{ height: 400, width: '100%', }}><DataGrid rows={rows} columns={columns} components={{ Toolbar: GridToolbar }}/>
                            </div>
                        </ThemeProvider>
                    </Box>
                </div>
            </div>




        </div>

    </div>


)
}
