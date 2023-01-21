import axios from 'axios'
import React, { useState } from 'react'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Cookies from 'universal-cookie';
import { Link, useNavigate } from 'react-router-dom';


export default function Login_logout() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [otpvalid, setotpvalid] = useState({});
    const [inputs, setInputs] = useState({});
    const [show, setOpen] = useState(false);
    const [isLoggedIn, loading] = useState(false)
    const [OTP, setotp] = useState("");

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
    function password_show_hide() {
        var x = document.getElementById("password");
        var show_eye = document.getElementById("show_eye");
        var hide_eye = document.getElementById("hide_eye");
        hide_eye.classList.remove("d-none");
        if (x.type === "password") {
            x.type = "text";
            show_eye.style.display = "none";
            hide_eye.style.display = "block";
        } else {
            x.type = "password";
            show_eye.style.display = "block";
            hide_eye.style.display = "none";
        }
    }




    return (
        <>

            <div className='container  login_border center'>
                <div className='row gy-3'>
                    <div className='col-12'>
                        <p className="Login_font">ADMIN PANEL</p>
                        <p className='color Login_font'> Login to access your account</p>
                    </div>
                    <div className='col  '>
                        <form onSubmit={handleSubmit}>
                            <div className='form mx-sm-3 mb-2'>
                                <label> Name:

                                    <input required placeholder=' User Name ' type="text" name="username" value={inputs.username || ""} onChange={handleChange} />
                                </label>
                                <label>Email:
                                    <input required placeholder=' Email Address' type="email" name="Email" value={inputs.Email || ""} onChange={handleChange} />
                                </label>
                                <label> Password:
                                    <input required placeholder='Password' type="password" id="password" name="password" value={inputs.password || ""} onChange={handleChange} >
                                    </input>
                                    <span className='eye' onClick={password_show_hide}>
                                        <i className="fas fa-eye" id="show_eye"></i>
                                        <i className="fas fa-eye-slash d-none" id="hide_eye"></i>
                                    </span>
                                </label>
                                <label> Remember me :
                                    <input type="checkbox" name='checkbox' value={inputs.checkbox || ""} onChange={handleChange}  ></input>

                                </label>
                                <div>
                                    {isLoggedIn ? <>
                                        <button className='color' id='Submit_but' type="submit" > Submit</button>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        <span className="visually-hidden">Loading...</span>
                                    </> : <button className='btn btn-success' id='Submit_but' type="submit" > Submit</button>}


                                </div>
                            </div>
                        </form>
                        <div className='col-12  check'>

                            <Link to={"/Forgot"}> <button className='color btn'>Forgot Password?</button></Link>
                        </div>
                    </div>

                </div>
                <div>

                    <Dialog open={show} onClose={handleClose}>
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
                                    <button className='btn otpbtn ' onClick={handleSubmit}>resend</button> 
                                    <button className='btn otpbtn ' onClick={otp_send}>Verify</button>
                                </p>
                                 :<button className='btn otpbtn ' onClick={otp_send}>Verify</button>
                            }
                            
                            
                        </DialogActions>
                    </Dialog>
                </div>



            </div>
        </>


    )
}
