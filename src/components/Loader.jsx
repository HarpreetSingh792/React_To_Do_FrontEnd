import BookLoader from "./Book.gif"; 
import CircleLoader from "./Circles-menu-3.gif"; 
const Loader = ()=>{
    return (
        <div style={{display:"grid",justifyContent:"center",margin:"80px auto"}}>
        <img src={BookLoader} alt="loader" width={"80px"} height={"80px"}/>
        <img src={CircleLoader} alt="loader" width={"80px"} height={"80px"}/>
        </div>
    );
}
export default Loader;