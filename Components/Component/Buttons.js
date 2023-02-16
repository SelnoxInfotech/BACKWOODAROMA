
const Buttons=({bgCol,onChange,children})=>{
   
    return(
        <div>

            <button style={{backgroundColor:`${bgCol}` }} onChange={onChange}>{children}</button>

        </div>
 
    )
}
export default Buttons