
// const initialUser = {  
//   Name: '',  
//   Age: '',  
//   Gender: 'logout'  
// }  

const reducer = (state, action) => {  
  switch (action.type) { 
      case 'Login':  
      return {...state, login: action.login  }
    default:  
      return state  
  }  
}  

export default reducer