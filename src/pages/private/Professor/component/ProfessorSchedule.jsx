import React, { useState, useEffect } from "react";
import Schedule from "./Schedule";
import ManagementSchedule from "../../../../components/adminComponent/ManagementSchedule";
import { useSelector } from "react-redux";
import {
  useGetSchedule,
  useGetSemesters,
} from "../../../../hooks/useProfessor";
const ProfessorSchedule = () => {
  const dataRedux = useSelector((state) => state.user);
  const [seeOption, setSeeOption] = useState(null);
  const [dataSection, setDataSection] = useState([]);
  const [ dataOfWeek, setDataOfWeek ] = useState([]);
  useEffect(() => {
    async function get() {
      //This res is to get the schedules datas
      const res = await useGetSchedule(dataRedux.token);
      if (!res.status) {
        return false;
      }
      //save the datas in datasetion
      setDataSection(res.response);
    }
    get();
  }, []);

  const timeSlots = [
    ["08:00", 1],
    ["09:40", 2],
    ["09:50", 3],
    ["11:20", 4],
    ["14:45", 6],
    ["16:20", 7],
    ["17:55", 8],
    ["18:40", 9],
    ["19:30", 10],
  ];

  const change = (e) => {
    setSeeOption(e.target.id);
  };


  const setSemester = async (schehule, plan, semester) => {
    const data = {
      schedule_id: schehule,
    };

    const res = await useGetSemesters(dataRedux.token, data);
    if(res.status){
        setDataOfWeek(res.response);
    }
};
  return (
    <div className="flex flex-col w-full p-2">
      <nav className="mb-4">
        <ul className="flex gap-3">
          <li onClick={() => setSeeOption('H') } >
          {dataSection.length === 0 ? (
            <div className="button">No Hay regsitros</div>
          ) : (
            <ManagementSchedule data={dataSection} fn={setSemester} />
          )}
          </li>

          <li onClick={()=>setSeeOption('C')}  id={"C"} className="button  cursor-pointer">
            Configurar disponibilidad
          </li>
          <li onClick={ () => {setSeeOption("M")} } id={"M"} className="button  cursor-pointer">
            Más información
          </li>
        </ul>
      </nav>
      <div className="bg-gray-100 p-4 h-full overflow-auto  rounded-lg">
        <div className="flex justify-center items-center w-full">
          {seeOption === "H" ? (dataOfWeek.length===0 ?<>Seleccciones un semestre</>:
            <Schedule dataOfWeek={dataOfWeek} timeSlots={timeSlots} />
          ) : (
            <></>
          )}
          {seeOption === "C" ? <>Configuracion</> : <></>}
          {seeOption === "M" ? <>Mas</> : <></>}
        </div>
      </div>
    </div>
  );
};

export default ProfessorSchedule;
