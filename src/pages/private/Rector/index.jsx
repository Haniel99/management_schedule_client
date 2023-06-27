import { Route } from "react-router-dom";
import NavBar from "../../../components/adminComponent/NavBar";
import { RectorElements } from "../../../utils/dataNavRector";
import { RectorExit } from "../../../utils/dataNavRector";
import RouteNotFount from "../../../utils/routeNotFoud";
import Gestion from "./components/Gestion";
const Rector = () => {
  return (
    <div className='w-full h-screen
        object-cover flex'>
        <div className='flex flex-col h-screen w-auto line-clamp-1 bg-rose-800'>
            <NavBar items={RectorElements} exit={RectorExit} />
        </div> 
        <RouteNotFount>
            <Route index element = {<>It's index</>} />
            <Route path='/inicio' element = {<>It's index</>} />
            <Route path='/Gestionar' element = {<Gestion/>} />
        </RouteNotFount>
    </div>
  )
}

export default Rector;