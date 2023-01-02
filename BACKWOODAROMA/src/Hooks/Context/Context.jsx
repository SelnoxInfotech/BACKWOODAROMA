import React, { useReducer, createContext } from 'react';
import Reducer from '../Reducer/Reducer'

const Createcontext = createContext();


const initialUser = {
  
  login: ""
}
function Context(props) {
  const [state, dispatch] = useReducer(Reducer, initialUser)
 
 
 
  return (
    <Createcontext.Provider value={{ state, dispatch }} >
      {props.children}
    </Createcontext.Provider>

  )

}

export default Createcontext;
export { Context }