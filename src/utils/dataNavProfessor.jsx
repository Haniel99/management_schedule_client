import { RxDashboard } from "react-icons/rx";
import { BsFillCalendarCheckFill } from "react-icons/bs"; 

import { BiLogOut } from "react-icons/bi"

export const ProfessorExit = 
    {
        id: 4,
        icon: <BiLogOut className="nav" aria-hidden="true"/>,
        text: "Salir"
    }

export const ProfessorElements = [
    {
        id: 1,
        icon: <RxDashboard className="nav" aria-hidden="true"/>,
        text: "Inicio"
    },
    {
        id: 2,
        icon: <BsFillCalendarCheckFill className="nav" aria-hidden="true"/>,
        text: "Horario"
    },
]