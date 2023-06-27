import { NavLink } from "react-router-dom";
import ElementsNav from "./ElementsNav";
import NavLinks from "../NavLink";
import { useDispatch } from "react-redux";
import { resetUser } from "../../app/state/user"; 
const NavBar = ({items, exit}) => {
    const dispatch = useDispatch();
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
                <ElementsNav items = {items} />
            </div>
            <div onClick={()=> {
                dispatch(resetUser())
                window.location.href = "/"
                } } >
                <NavLinks  text={exit.text} icon={exit.icon} link={exit.text} />
            </div>
        </div>
    );
}


export default NavBar;