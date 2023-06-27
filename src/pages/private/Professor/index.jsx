import { Route } from "react-router-dom";
import NavBar from "../../../components/adminComponent/NavBar";
import { ProfessorElements } from "../../../utils/dataNavProfessor";
import { ProfessorExit } from "../../../utils/dataNavProfessor";
import RouteNotFount from "../../../utils/routeNotFoud";
import ProfessorSchedule from "./component/ProfessorSchedule";
const Proffesor = () => {
  return (
    <div className='w-full h-screen
        object-cover flex'>
        <div className='flex flex-col h-screen w-auto line-clamp-1 bg-rose-800'>
            <NavBar items={ProfessorElements} exit={ProfessorExit} />
        </div> 
        <RouteNotFount>
            <Route index element = {<>It's index</>} />
            <Route path='/inicio' element = {<>It's index</>} />
            <Route path='/horario' element = {<ProfessorSchedule/>} />
        </RouteNotFount>
    </div>
  )
}

export default Proffesor;