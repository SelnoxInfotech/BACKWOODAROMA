
import Router from "./Routes/Router";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import './App.css';
import { Context } from "./Hooks/Context/Context";

function App() {
  
  
  return (
   <>
   <Context>
   <Router></Router>
   </Context>
   </>
  );
}

export default App;
