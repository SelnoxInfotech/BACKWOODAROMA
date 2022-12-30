import React from 'react'
import Cookies from 'universal-cookie';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import CityPopUp from "./Citypopup"
import axios from "axios";

export default function City() {
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
        axios("http://34.201.114.126:8000/AdminPanel/Get-Cities/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            setTotal(response.data)
            console.log(response.data)
                
        })
    }, [token_data])


    const columns = [
        { field: 'CityName', headerName: 'City Name', width: 200, editable: true, headerClassName: 'super-app-theme--header' },
        { field: 'state_name', headerName: 'States Name', width: 200, editable: true, headerClassName: 'super-app-theme--header' },
        { field: 'Status', headerName: 'Status', type: 'text', editable: true, width: 300, headerClassName: 'super-app-theme--header' },
        { field: 'Edit', headerName: 'Edit', type: 'button', editable: true, headerClassName: 'super-app-theme--header' },
        

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
                        <ThemeProvider theme={CustomFontTheme}>
                            <div style={{ height: 400, width: '100%', }}>
                                <DataGrid rows={rows} columns={columns}  components={{ Toolbar: GridToolbar }}  checkboxSelection/>
                            </div>
                        </ThemeProvider>
                    </div>
                </div>




            </div>

        </div>


    )
}
