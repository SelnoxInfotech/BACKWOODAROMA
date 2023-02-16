import axios from 'axios'
import React, { useState } from 'react'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Cookies from 'universal-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';



export default function Login_logout() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [otpvalid, setotpvalid] = useState({});
    const [inputs, setInputs] = useState({});
    const [show, setOpen] = useState(false);
    const [isLoggedIn, loading] = useState(false)
    const [OTP, setotp] = useState("");
    const [values, setValues] = React.useState({
        password: "",
        showPassword: false,
    });
    const data = {
        email: inputs.Email,
        username: inputs.username,
        password: inputs.password
    }
    const otp_data = {
        email: inputs.Email,
        OTP: OTP.OTP,

    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleotp = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setotp(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post("http://34.201.114.126:8000/AdminPanel/Login/", data,

            loading(true)
        ).then((response) => {
            loading(false)
            alert(response.data.message)
            setOpen(true)
            loading(false)


        }).catch((error) => {
            if (error) {
                alert(
                    "Invalid credentials"
                )
                loading(false)

            }
        })
        setTimeout(alertFunc, 5 * 60 * 1000)
    }


    function alertFunc() {
        setOpen(false);
    }

    
    const otp_send = () => {

        setOpen(false);
        axios.post("http://34.201.114.126:8000/AdminPanel/VerifyOtp/", otp_data,

        ).then((response) => {
            if (response.data.data === "invalid Otp") {
                setOpen(true);
                setotpvalid(response.data.data)
            }
            else {
                let date = new Date();
                date.setTime(date.getTime() + (60 * 60 * 8000))
                cookies.set('Token_access', response.data.tokens.access, { expires: date })
                navigate("/");
            }
        })
    };



    const handleClose = () => {
        setOpen(false);
    
     
    }


    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    return (
        <>

            <div className='container  center '>
                <div className='row '>
                    <div className='col-12 center login_border'>
                        <p className="Login_font">ADMIN PANEL</p>
                        <p className='color Login_font'> Login to access your account</p>
                    </div>
                    <div className='col-12 '>

                        <div className='col-12  label top  con'>
                            <div className='col-sm-5'>

                                <label className='label'>
                                    <span className='required'>*</span>
                                    Name:
                                </label>
                            </div>
                            <div className='col display'>
                                <TextField placeholder='User Name' id="outlined-basic" variant="outlined"
                                    name="username" style={{ minWidth: 190 }} inputProps={{ style: { fontSize: 15, height: 5 } }}
                                    onChange={handleChange}
                                    value={inputs.username || ""}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '&.Mui-focused fieldset': {
                                                borderWidth: "1px",
                                                borderColor: 'black',
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>

                        <div className='col-12  label top  con'>
                            <div className='col-sm-5'>

                                <label className='label'>
                                    <span className='required'>*</span>
                                    Email:
                                </label>
                            </div>
                            <div className='col display'>
                                <TextField placeholder='Email Address ' id="outlined-basic" variant="outlined" name="Email"
                                    type="email" style={{ minWidth: 190, fontSize: 15 }} inputProps={{ style: { fontSize: 15, height: 5 } }}
                                    value={inputs.Email || ""}
                                    onChange={handleChange}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '&.Mui-focused fieldset': {
                                                borderWidth: "1px",
                                                borderColor: 'black',
                                            },
                                        },

                                    }}
                                />
                            </div>
                        </div>
                        <div className='col-12  label top  con'>
                            <div className='col-sm-5'>

                                <label className='label'>
                                    <span className='required'>*</span>
                                    Password:
                                </label>
                            </div>
                            <div className='col  display '>
                                <TextField placeholder='Password' type={values.showPassword ? "text" : "password"} id="outlined-basic" variant="outlined"
                                    name="password" style={{ minWidth: 190 }} inputProps={{ style: { fontSize: 15, height: 5 } }}
                                    onChange={handleChange}

                                    value={inputs.password || ""}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '&.Mui-focused fieldset': {
                                                borderWidth: "1px",
                                                borderColor: 'black',
                                            },
                                        },
                                        '& .MuiButtonBase-root': {
                                            fontSize: "1.5625rem",
                                            color: "#31B665"
                                        }
                                    }}
                                />
                                <span >
                                    {
                                        values.showPassword === false ? <AiFillEye className='eye' onClick={handleClickShowPassword} ></AiFillEye> : <AiOutlineEyeInvisible className='eye' onClick={handleClickShowPassword}  ></AiOutlineEyeInvisible>
                                    }
                                </span>
                            </div>
                        </div>
                        <label className='top'> Remember me :
                            <input type="checkbox" name='checkbox' value={inputs.checkbox || ""} onChange={handleChange} />

                        </label>
                        <div className='top'>
                            {isLoggedIn ? <>
                                <button className='color' id='Submit_but' type="submit" onClick={handleSubmit} > Submit</button>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                <span className="visually-hidden">Loading...</span>
                            </> : <button className='btn btn-success' id='Submit_but' type="submit" onClick={handleSubmit}  > Submit</button>}


                        </div>

                        <div className='col-12   check'>

                            <Link to={"/Forgot"}> <button className='color btn'>Forgot Password?</button></Link>
                        </div>
                    </div>

                </div>
                <div>

                    <Dialog open={show} onClose={handleClose}  disableEscapeKeyDown>
                        <DialogTitle>Enter Otp</DialogTitle>
                        <DialogContent>
                            <DialogContentText>

                                {
                                    otpvalid === "invalid Otp" &&

                                    <div className='col-12 center colorotp'>
                                        <p>{otpvalid}</p>
                                    </div>
                                }
                                Please Enter Otp Which Is Sent Your Register Email


                            </DialogContentText>


                            <input className='otp' placeholder='Enter Otp' type="number" id="otp" name="OTP" min="4" max="4" value={OTP.OTP || ""} onChange={handleotp} />
                        </DialogContent>
                        <DialogActions>
                            {
                                otpvalid === "invalid Otp" ? <p>
                                    <button className='btn Sub_button size ' onClick={handleSubmit}>resend</button>
                                    <button className='btn Sub_button  size' onClick={otp_send}>Verify</button>
                                </p>
                                    : <button className='btn Sub_button  size' onClick={otp_send}>Verify</button>
                            }


                        </DialogActions>
                    </Dialog>
                </div>



            </div>
        </>


    )
}
