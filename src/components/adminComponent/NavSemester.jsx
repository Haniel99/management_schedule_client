import { useEffect, useState } from "react";
const NavSemester = ({semesters = [], number}) => {
    const [showOption, setShowOption] = useState(semesters[0].semestre_id);
    useEffect( ()=> {
        setShowOption(semesters[0].semestre_id);
    },[semesters])
    const showColor = (e) => {
        number(e.target.id, e.target.innerText);
        setShowOption(e.target.id); 
    }
    return (
        <>
        {
            semesters.map( (value, index) => {
                return (
                    <p
                    key={index}
                    itemID={index}
                    id={value.semestre_id}
                    onClick={showColor}
                    aria-current="page"
                    className={ `${showOption==value.semestre_id? "bg-indigo-500 text-white ":"text-gray-900 hover:bg-gray-50" } relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 cursor-pointer`}
                    >{value.numero_semestre}</p>
                )
            })
        }
        </>
    )
}

export default NavSemester;