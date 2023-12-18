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
    <div className="w-full  bg-gray-200  flex flex-col">
      <div className="flex font-semibold bg-[#fafafa] shadow-md  w-full p-6 border-2 border-b-gray-200">
        <OpcionsProfessor nameButton={"profesores"} option={setShowOption} />
      </div>
      <div className="flex w-full my-6 justify-center  overflow-auto">
        <div className="flex w-full">
        {showOption ? (
          professors ==null?<>Cargando</>:<UserStatistics datos={professors} />
        ) : <ProfessorForm set={setShowOption} />}
        </div>
      </div>
    </div>
  );
};

export default Professor;
