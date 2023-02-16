import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
export default function Editbox(props) {
  const [open, setOpen] = React.useState(false);
  const [data, setdata] = React.useState('Active');

  const handleClickOpen = () => {
    setOpen(true);
    setdata(props.data)
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
      Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
        <div className='container-fluid '>
                        <div className='row '>

                            <div className='col-12  ' >

                                <div className='col-12 Add_Category center'>
                                    <div className="col "> <h2> Add Category
                                    </h2>
                                    </div>
                                </div>
                                <div className='col-12 top label  con'>
                                   <div className='col'>
                                   <label className='label'>
                                        Name:
                                    </label>
                                   </div>
                                   <div className='col'>
                                   <TextField placeholder='Add Category' id="outlined-basic" variant="outlined" value={data.name}
                                         style={{minWidth: 190 ,fontSize:15}} />
                                   </div>
                                </div>
                                <div className='col-12 top label  con'>
                                    <div className='col'>
                                    <label className='label'>
                                        Status:
                                    </label>
                                    </div>
                                    <div className='col ' >
                                    <Select value={data.Status}  displayEmpty inputProps={{ 'aria-label': 'Without label',}} style={{minWidth: 190 , fontSize:15}} >
                                        <MenuItem >

                                        </MenuItem>
                                        <MenuItem value={"Active"} style={{ fontSize:15}}>Active</MenuItem>
                                        <MenuItem value={"Hide"} style={{ fontSize:15}}>  Hide</MenuItem>

                                    </Select>
                                    </div>
                                </div>
                                    <div className='col-12 center top'>
                                    <button className='btn Sub_button'   style={{ fontSize:15}}>
                                        Save Changes
                                    </button>
                                    </div>



                            </div>




                        </div>

                    </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}