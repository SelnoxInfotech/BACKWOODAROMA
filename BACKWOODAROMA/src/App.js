
import Router from "./Routes/Router";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import './App.css';
import { Context } from "./Hooks/Context/Context";
import { SnackbarProvider } from 'notistack';
import { styled } from "@mui/material";
function App() {
  const StyledSnackbarProvider = styled(SnackbarProvider)`
  &.SnackbarItem-contentRoot {
    width: 500px ;
    height : 60px ;
   
  }
  & .SnackbarItem-message {
    font-size : 20px
  }
`;

  return (
    <>
      <StyledSnackbarProvider>
        <Context>
          <Router></Router>
        </Context>
      </StyledSnackbarProvider>
    </>
  );
}

export default App;
