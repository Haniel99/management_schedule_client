import { useState } from "react";
import { adminElements, adminExit } from "../../utils/DataForNav";
import { NavLink } from "react-router-dom";
import ElementsNav from "./ElementsNav";
import NavLinks from "../NavLink";
const NavBar = ({items}) => {
    const [toogle, setToggle] = useState(false);

    return (
        <div className="py-4 flex flex-col justify-between px-4 h-full">
            <div className="scroll-auto">
                <div className="border-2 border-pink-600 h-[8em] mb-4 flex justify-center items-center" >
                <NavLink to={'/admin'}>
                <img
                  className="mx-auto h-auto w-auto"
                  src="../../../public/logo_web_uta.png"
                  alt="Your Company"
                />
                </NavLink>
                </div>
                <ElementsNav items = {adminElements} />
            </div>
            <div className="">
                <NavLinks text={adminExit.text} icon={adminExit.icon} link={adminExit.text} />
            </div>
        </div>
    );
}


export default NavBar;