import { NavLink } from "react-router-dom";
const NavLinks = ({icon, text, link}) => {
    return (<NavLink to={link}  className="group  relative flex w-full 
    rounded-sm my-3 py-2 px-8 text-sm font-semibold text-white
   hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
    {icon}
    </span>
    <p className="mx-3">{text}</p>
    </NavLink> )
}

export default NavLinks;
    