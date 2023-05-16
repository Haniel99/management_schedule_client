import { useSelector } from "react-redux";
import OpcionsSubjects from "../../../components/adminComponent/OpcionsProfessor";
import { useGetSubjects } from "../../../hooks/useAdmin";
import SubjectsTable from "./table/SubjectsTable";
import { useEffect, useState } from "react";
const Subjects = () => {
    const [showOption, setShowOption] = useState(false);
    const dataRedux = useSelector((state) => state.user);
    const [ subjects, setSubjects ] = useState(null);
    useEffect( () => {
        async function getSubjects() {
            const res = await useGetSubjects(dataRedux.token); 
            setSubjects(res.response.response);
        }
        getSubjects();
    }, []);
    return (
        <div className="w-full flex flex-col">
            <div className="flex font-semibold w-full p-6 border-2 border-y-gray-300">
                <OpcionsSubjects nameButton = {"asignatura"}  option = {setShowOption} />
            </div>
            <div className="flex justify-center my-6 items-center">
                {
                    showOption?(<SubjectsTable datos={subjects} />):(<>formulario</>)
                }
            </div>
        </div>
    );
}

export default Subjects;