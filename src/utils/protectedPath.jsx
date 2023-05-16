import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
//Verify if exist token in the local storage 
export const ProtectedPath = ({children}) => {
    const userState = useSelector(Store => Store.user);
    console.log(userState.token)
    if(!userState.id){
        return <Navigate to={'/login'}/>
    }
    if(userState.type === `${type}`){
        return <Outlet/>
    }
    return <Navigate to={`/${userState.type}`}/>
}
//This function is to protected login, and veryfy than it don't exist session  
export const ProtectedLogin = ({children}) => {
    const userState = useSelector(Store => Store.user);
    console.log("it's login", userState.id)
    if(!userState.id){
        return children;
    }
    return <Navigate to={`/${userState.type}`}/>
}

export default {ProtectedPath, ProtectedLogin};