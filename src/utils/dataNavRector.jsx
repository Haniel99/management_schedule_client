import { RxDashboard } from "react-icons/rx";
import { HiBuildingOffice } from "react-icons/hi2";

import { BiLogOut } from "react-icons/bi"

export const RectorExit = 
    {
        id: 4,
        icon: <BiLogOut className="nav" aria-hidden="true"/>,
        text: "Salir"
    }

export const RectorElements = [
    {
        id: 1,
        icon: <RxDashboard className="nav" aria-hidden="true"/>,
        text: "Inicio"
    },
    {
        id: 2,
        icon: <HiBuildingOffice className="nav" aria-hidden="true"/>,
        text: "Gestionar"
    },
]