import { useEffect, useState } from "react";
import OpcionsProfessor from "../../../components/adminComponent/OpcionsProfessor";
import UserStatistics from "./table/UserStatistics";
import { useGetProfessors } from "../../../hooks/useAdmin";
import { useSelector } from "react-redux";
import ProfessorForm from "./components/ProfessorForm";
const Professor = () => {
  const [professors, setProfessors] = useState(); //It is for professor's data
  const [showOption, setShowOption] = useState(true); // It is show option. add or show profesors
  const dataRedux = useSelector((state) => state.user);

  useEffect(() => {
    async function getProfessor() {
      const res = await useGetProfessors(dataRedux.token);
      setProfessors(res.response);
    }
    getProfessor();
  }, [showOption]);
  return (
    <div className="w-full flex flex-col">
      <div className="flex font-semibold w-full p-6 border-2 border-y-gray-300">
        <OpcionsProfessor nameButton={"profesor"} option={setShowOption} />
      </div>
      <div className="flex justify-center flex-grow overflow-auto">
        <div className="w-11/12">
        {showOption ? (
          professors ==null?<>Cargando</>:<UserStatistics datos={professors} />
        ) : <ProfessorForm set={setShowOption} />}
        </div>
      </div>
    </div>
  );
};

export default Professor;
