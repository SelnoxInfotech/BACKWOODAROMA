
// const initialUser = {  
//   Name: '',  
//   Age: '',  
//   Gender: 'logout'  
// }  

const reducer = (state, action) => {  
  console.log(action)
  switch (action.type) {  
    // case 'Login_state':  
    //   return {  
    //     ...state,  
    //     Login_state: action.Login_state  
    //   } 
      
      case 'Login':  
      return {...state, login: true  }
    
    default:  
      return state  
  }  
}  

export default reducer