import { useEffect, useState } from "react";
import OpcionsProfessor from "../../../components/adminComponent/OpcionsProfessor";
import UserStatistics from "./table/UserStatistics";
import { useGetProfessors } from "../../../hooks/useAdmin";
import { useSelector } from "react-redux";
const Professor = () => {
  const [professors, setProfessors] = useState(); //It is for professor's data
  const [showOption, setShowOption] = useState(false); // It is show option. add or show profesors
  const dataRedux = useSelector((state) => state.user);

  useEffect(() => {
    async function getProfessor() {
      const res = await useGetProfessors(dataRedux.token);
      setProfessors(res.response);
    }
    getProfessor();
  }, []);
  return (
    <div className="w-full flex flex-col">
      <div className="flex font-semibold w-full p-6 border-2 border-y-gray-300">
        <OpcionsProfessor nameButton={"profesor"} option={setShowOption} />
      </div>
      <div className="flex justify-center my-6 items-center">
        {showOption ? (
          <UserStatistics datos={professors} />
        ) : <>formulario</>}
      </div>
    </div>
  );
};

export default Professor;
