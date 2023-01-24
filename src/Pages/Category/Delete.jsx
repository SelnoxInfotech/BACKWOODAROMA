import  React ,{useContext} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from "axios"
import Cookies from 'universal-cookie';
import Createcontext from "../../Hooks/Context/Context"
import { useSnackbar } from 'notistack';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Delete(props) {
  const { enqueueSnackbar } = useSnackbar();
  const { dispatch} = useContext(Createcontext)
    const cookies = new Cookies();
  const [open, setOpen] = React.useState(false);
  const token_data = cookies.get('Token_access')
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const Delete = () => {
    const id = props.data.id
       axios.delete(`http://34.201.114.126:8000/AdminPanel/delete-Category/${id}`, {

           headers: {
               'Authorization': `Bearer ${token_data}`
           }
       }).then(response => {
        setOpen(false);
        dispatch({type:'api',api: true})
        enqueueSnackbar('Delete Category success !', { variant: 'success' });
       })
   };

  return (
    <div>
      <Button color='success' onClick={handleClickOpen}>
      Delete
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete Category?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={Delete} sx={{ color: 'red'}}>yes</Button>
          <Button onClick={handleClose} sx={{ color: '#31B665'}}>no?</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}