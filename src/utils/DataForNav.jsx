import { RxDashboard } from "react-icons/rx";
import { BsFillCalendarCheckFill } from "react-icons/bs"; 
import { 
    FaChalkboardTeacher,
    FaAddressBook 
} from "react-icons/fa";
import { BiLogOut } from "react-icons/bi"

export const adminExit = 
    {
        id: 5,
        icon: <BiLogOut className="nav" aria-hidden="true"/>,
        text: "Salir"
    }

export const adminElements = [
    {
        id: 1,
        icon: <RxDashboard className="nav" aria-hidden="true"/>,
        text: "Inicio"
    },
    {
        id: 2,
        icon: <BsFillCalendarCheckFill className="nav" aria-hidden="true"/>,
        text: "Gestion"
    },
    {
        id: 3,
        icon:<FaChalkboardTeacher className="nav" aria-hidden="true" />,
        text: "Profesores"
    },
    {
        id: 4,
        icon: <FaAddressBook className="nav" aria-hidden="true"/>,
        text: "Asignaturas"
    },
]