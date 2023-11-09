import { useSelector } from "react-redux";
import OpcionsSubjects from "../../../components/adminComponent/OpcionsProfessor";
import { useGetSubjects } from "../../../hooks/useAdmin";
import SubjectsTable from "./table/SubjectsTable";
import { useEffect, useState } from "react";
import SubjectForm from "./components/SubjectForm";

const Subjects = () => {
  const [showOption, setShowOption] = useState(true);
  const dataRedux = useSelector((state) => state.user);
  const [subjects, setSubjects] = useState(null);

  useEffect(() => {
    async function getSubjects() {
      const res = await useGetSubjects(dataRedux.token);
      setSubjects(res.response.response);
    }
    getSubjects();
  }, [showOption]);

  return (
    <div className="w-full  bg-gray-200  flex flex-col">
      <div className="flex font-semibold bg-[#fafafa] shadow-md  w-full p-6 border-2 border-b-gray-200">
        <OpcionsSubjects nameButton={"asignatura"} option={setShowOption} />
      </div>
      <div className="flex w-full my-6 justify-center  overflow-auto">
        <div className="flex w-full">
          {showOption ? (
            subjects==null?<>Cargando</>: <SubjectsTable datos={subjects}/>
          ) : 
          <SubjectForm set={setShowOption} /> }
        </div>
      </div>
    </div>
  );
};

export default Subjects;
