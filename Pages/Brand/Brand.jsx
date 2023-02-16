import React , {useContext}from 'react'
import Createcontext from "../../Hooks/Context/Context"
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import axios from "axios";
import Cookies from 'universal-cookie';
import Brandpopup from './Brandpopup';
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import BrandEdit from "./BrandEdit"
import BrandDelete from "./BrandDelete"


const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: "65%",
    color: theme.palette.text.primary,
}));



export default function Brand() {
    const cookies = new Cookies();
    const { state ,dispatch} = useContext(Createcontext)
    const token_data = cookies.get('Token_access')
    const [totel, setTotal] = React.useState([])
   
    React.useEffect(() => {
        axios("http://34.201.114.126:8000/AdminPanel/Get-Brand/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            setTotal(response.data)

        })



    }, [token_data ,state])


 
    const Submit = (params) => {
        const formdata = new FormData();
        formdata.append('Brand_description',params.row.Brand_description);
        formdata.append('Link',params.row.Link);
        formdata.append("Status", params.row.Status === "Active" ? "Hide" : "Active");
        formdata.append('name',params.row.name);
    

        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };
        axios.post(
            `http://34.201.114.126:8000/AdminPanel/update-Brand/${params.row.id}`,
            formdata,
            config
        ).then(() => {
            

            dispatch({type:'api',api: true})
        })
    };




    const columns = [
        {
            field: 'Brand_Logo', headerName: 'Brand Logo', editable: true, headerClassName: 'super-app-theme--header', width: 120,
            renderCell: (params) => <img src={"http://34.201.114.126:8000/" + params.value} alt="flavoursImage" width="35" height="30" />,
        },
        { field: 'name', headerName: 'Brand Name', editable: true, headerClassName: 'super-app-theme--header', width: 120 },
        { field: 'Link', headerName: 'Link', editable: true, headerClassName: 'super-app-theme--header', width: 150 },
        {
            field: 'Brand_description', headerName: 'Brand Description',  editable: true, width: 180, headerClassName: 'super-app-theme--header',
            renderCell: (params) => <span dangerouslySetInnerHTML={{ __html: params.formattedValue }} />
        },
        { field: 'Status', headerName: 'Status', editable: false, width: 90, headerClassName: 'super-app-theme--header' ,
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
        { field: 'Edit', headerName: 'Edit', type: 'button' ,editable: true, headerClassName: 'super-app-theme--header',
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
                        <MenuItem> <BrandEdit data={params.row} ></BrandEdit></MenuItem>
                        <MenuItem> <BrandDelete data={params.row} ></BrandDelete> </MenuItem>
                    </Select>
                </Box>
            </>

        )
    },

    ];

    const rows = totel;

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
    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                <div className='col-12 Add_Category margin_top '>
                        <div className="col hadding_al "> <h2>Brand
                        </h2></div>
                        <div className="col cat_but popup_A" >  <span className='btn'> <h2> <Brandpopup></Brandpopup> </h2></span></div>
                    </div>

                </div>
            
             <Box sx={{
                    height: 400,
                    width: '100%',
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#E1FFED',
                    },
                    '& .MuiButton-root': {
                        color: '#000000',
                        display: "flex",
                    }
                }}>
                <StyledPaper sx={{ my: 11, mx: 'auto', p: 2, }}>
                    <Grid container wrap="nowrap" spacing={2}>
                    
                        <Grid item xs>

                            <div className='col-12' >
                                <ThemeProvider theme={CustomFontTheme}>
                                    <div style={{ height: 500, width: '100%', }}>
                                        <DataGrid rows={rows} columns={columns} components={{ Toolbar: GridToolbar }} checkboxSelection
                                        sx={{
                                            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                                                outline: "1px solid black ",
                                            },
                                        }}
                                        
                                        />
                                    </div>
                                </ThemeProvider>
                            </div>
                        </Grid>
                    </Grid>
                </StyledPaper>
            </Box>
            </div>
        </>
    );
}