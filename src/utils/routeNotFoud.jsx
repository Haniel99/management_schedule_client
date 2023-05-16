import { Routes, Route } from "react-router-dom";

const RouteNotFount = ({children}) => {
 return (
    <Routes>
        {children}
        <Route path="*" element = {<>not fount</>}></Route>
    </Routes>
 );
}

export default RouteNotFount;