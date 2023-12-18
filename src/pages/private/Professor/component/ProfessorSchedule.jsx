import React, { useState, useEffect } from "react";
import Schedule from "./Schedule";
import ManagementSchedule from "../../../../components/adminComponent/ManagementSchedule";
import { useSelector } from "react-redux";
import {
  useGetSchedule,
  useGetSemesters,
  useGetHorarioProfessor,
  useSetHorarioProfesor,
  useDeleteBlock
} from "../../../../hooks/useProfessor";
import HorarioDisponibilidad from "./HorarioDisponible";

const ProfessorSchedule = () => {
  const dataRedux = useSelector((state) => state.user);
  const [seeOption, setSeeOption] = useState(null);
  //
  const [dataSection, setDataSection] = useState([]);
  const [dataOfWeek, setDataOfWeek] = useState([]);
  const [dataProfessor, setDataProfessor] = useState(null);
  const [horario, setHorario] = useState(null);
  const [ update, setUpdate ] = useState(1);
  useEffect(() => {
    async function get() {
      //This res is to get the schedules datas
      const res = await useGetHorarioProfessor(dataRedux.token, horario);
      if (!res.status) {
        return;
      }
      //save the datas in datasetion
      setDataProfessor(res.response);
    }
    get();
  }, [horario, update]);

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
    ["11:20", 3],
    ["14:45", 4],
    ["16:20", 5],
    ["17:55", 6],
    ["18:40", 7],
    ["19:30", 8],
  ];

  const setSemester = async (schehule) => {
    setHorario(schehule);
    const data = {
      schedule_id: schehule,
    };

    const res = await useGetSemesters(dataRedux.token, data);
    if (res.status) {
      setDataOfWeek(res.response);
    }
  };
  const deleteBlock = async (id) =>{
    await useDeleteBlock(dataRedux.token, id);
    setUpdate(update+1);
  }
  const selectedSlotClick = async (selectedTime, dayOfWeek) => {
    const data = {
      dia: dayOfWeek,
      bloque_id: selectedTime[1],
      horario_id: horario,
    };
    await useSetHorarioProfesor(dataRedux.token, data);
    const res = await useGetHorarioProfessor(dataRedux.token, horario);
      if (!res.status) {
        return;
      }
      //save the datas in datasetion
      setDataProfessor(res.response);
  };

  return (
    <div className="flex flex-col w-full p-2">
      <nav className="mb-4">
        <ul className="flex gap-3">
          <li onClick={() => setSeeOption("H")}>
            {dataSection.length === 0 ? (
              <div className="button">No Hay registros</div>
            ) : (
              <ManagementSchedule data={dataSection} fn={setSemester} />
            )}
          </li>

          <li
            onClick={() => setSeeOption("C")}
            id={"C"}
            className="button  cursor-pointer"
          >
            Configuracion de disponibilidad
          </li>
        </ul>
      </nav>
      <div className="bg-gray-100 p-4 h-full overflow-auto  rounded-lg">
        <div className="flex justify-center items-center w-full">
          {seeOption === "H" ? (
            dataOfWeek.length === 0 ? (
              <>Seleccciones un semestre</>
            ) : (
              <div>
                {" "}
                <span className="flex border border-gray-300  w-full justify-center text-xl font-semibold text-gray-700 p-1 shadow-md rounded-lg   ">
                  Horario semestral
                </span>{" "}
                <Schedule dataOfWeek={dataOfWeek} timeSlots={timeSlots} />
              </div>
            )
          ) : (
            <></>
          )}
          {seeOption === "C" ? (
            dataOfWeek.length === 0 ? (
              <>Configuracion</>
            ) : (
              <div>
                <span className="flex border border-gray-300  w-full justify-center text-xl font-semibold text-gray-700 p-1 shadow-md rounded-lg   ">
                  Horario de disponibilidad
                </span>
                <HorarioDisponibilidad
                  dataOfWeek={dataProfessor}
                  onSlotClick={selectedSlotClick}
                  delete={deleteBlock}
                  timeSlots={timeSlots}
                />
              </div>
            )
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessorSchedule;
