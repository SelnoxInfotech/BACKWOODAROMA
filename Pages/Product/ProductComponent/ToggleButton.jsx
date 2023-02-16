import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { makeStyles } from '@material-ui/styles';



const useStyles = makeStyles({ root: { color: "#5316AE" } });

export default function ToggleButton({ Product, SetProduct }) {
    const classes = useStyles();



      const handleChange = (event) =>{
        SetProduct({
            ...Product, [event.target.name]: event.target.value
        })
      }

    return (

        <Box sx={{ display: "flex" }}>
            <Box className="mask-box">
                <Box
                    color="success"
                    className="mask"
                    style={{
                        transform: `translateX(${Product.Status === "Active" ? 0 : "100px"})`
                    }}
                />
                <Button
                    classes={classes}
                    disableRipple
                    variant="text"
                    name="Status"
                    value="Active"
                    sx={{
                        color: Product.Status === "Active" ? "#ffffff" : "#5316AE"
                    }}
                    onClick={handleChange}
                >
                    Active
                </Button>
                <Button
                    disableRipple
                    variant="text"
                    name="Status"
                    value="Hide"
                    sx={{ color: Product.Status === "Hide" ? "#ffffff" : "#5316AE" }}
                      onClick={handleChange} 
                >
                    Hide
                </Button>
            </Box>
        </Box>

    );
}
