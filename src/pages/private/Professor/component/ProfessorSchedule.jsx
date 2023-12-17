import React, { useState, useEffect } from "react";
import Schedule from "./Schedule";
import ProfessorSetting from "./ProfessorSetting";
import ManagementSchedule from "../../../../components/adminComponent/ManagementSchedule";
import { useSelector } from "react-redux";
import {
  useGetSchedule,
  useGetSemesters,
} from "../../../../hooks/useProfessor";

const ProfessorSchedule = () => {
  const dataRedux = useSelector((state) => state.user);
  const [seeOption, setSeeOption] = useState(null);
  //
  const [dataSection, setDataSection] = useState([]);
  const [dataOfWeek, setDataOfWeek] = useState([]);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState(null); // Nuevo estado para el bloque horario seleccionado
  const [confirmation, setConfirmation] = useState("");
  const [horario_id, setHorarioId] = useState(null)

  useEffect(() => {
    async function get() {
      //This res is to get the schedules datas
      const res = await useGetSchedule(dataRedux.token);
      if (!res.status) {
        return false;
      }
      console.log(res);
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
    ["14:45", 5],
    ["16:20", 6],
    ["17:55", 7],
    ["18:40", 8],
    ["19:30", 9],
  ];

  const change = (e) => {
    setSeeOption(e.target.id);
  };

  const setSemester = async (schehule, plan, semester) => {
    setHorarioId(schehule);
    const data = {
      schedule_id: schehule,
    };

    const res = await useGetSemesters(dataRedux.token, data);
    if (res.status) {
      setDataOfWeek(res.response);
    }
  };

  const selectedSlotClick = (selectedTime, dayOfWeek) => {
    console.log(selectedTime, dayOfWeek);
    setSelectedTimeSlots(selectedTime);
    setSelectedBlock({
      timeSlot: selectedTime[0],
      dayOfWeek: dayOfWeek, // Utiliza el día de la semana obtenido
    });
    setIsSettingModalOpen(true);
  };

  const SaveSetting = (selectedTime) => {
    if (!dataOfWeek || dataOfWeek.length === 0) {
      console.error("DataOfWeek is null or empty");
      return;
    }

    // Actualizar el estado del bloque horario disponible en dataOfWeek
    const updatedDataOfWeek = dataOfWeek.map((dayData) => {
      // Verificar que dayData no sea null o undefined
      if (!dayData || !dayData[1]) {
        console.error("DayData or DayData[1] is null or undefined");
        return [dayData[0], []];
      }

      const updatedBlocks = dayData[1].map((block) => {
        if (
          block.hora_inicio === selectedTime[0] &&
          dayData[0] === selectedTime[1]
        ) {
          return { ...block, disponible: true, confirmation: "confirmed" };
        }
        return block;
      });

      return [dayData[0], updatedBlocks];
    });

    setDataOfWeek(updatedDataOfWeek);

    // Enviar los datos al padre para guardar en la base de datos
    // ...
    updateSchedule({
      timeSlot: selectedBlock.timeSlot,
      dayOfWeek: selectedBlock.dayOfWeek,
      confirmation: "confirmed",
    });

    // Cerrar el modal y limpiar el estado de confirmación
    setIsSettingModalOpen(false);
    setConfirmation("");
  };

  const updateSchedule = ({ timeSlot, dayOfWeek, confirmation }) => {
    const className = `.px-6.py-4.whitespace-nowrap.text-center.border-b-2.border-gray-200.bg-green-100.ring.ring-green-400.ring-opacity-50[data-time="${timeSlot}"][data-day="${dayOfWeek}"]`;

    const selectedBlockElement = document.querySelector(className);
    if (selectedBlockElement) {
      selectedBlockElement.classList.remove(
        "bg-green-100",
        "ring",
        "ring-green-400",
        "ring-opacity-50"
      );
      selectedBlockElement.classList.add("bg-gray-100");
    }

    const selectedBlockTextElement = selectedBlockElement?.querySelector(
      ".text-sm .font-medium"
    );
    if (selectedBlockTextElement) {
      selectedBlockTextElement.textContent = "Horario disponible";
    }
  };

  const CancelSetting = () => {
    //Cerrar el modal sin guardar
    setIsSettingModalOpen(false);
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
          <li
            onClick={() => {
              setSeeOption("M");
            }}
            id={"M"}
            className="button  cursor-pointer"
          >
            Más información
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
                <Schedule
                  dataOfWeek={dataOfWeek}
                  onSlotClick={selectedSlotClick}
                  horarioId={horario_id}
                  timeSlots={timeSlots}
                />
                {isSettingModalOpen && (
                  <ProfessorSetting
                    onSave={SaveSetting}
                    onCancel={CancelSetting}
                    selectedBlock={selectedBlock}
                    setIsSettingModalOpen={setIsSettingModalOpen}
                    setConfirmation={setConfirmation}
                    updateSchedule={setDataOfWeek}
                  />
                )}
              </div>
            )
          ) : (
            <></>
          )}
          {seeOption === "M" ? <>Mas</> : <></>}
        </div>
      </div>
    </div>
  );
};

export default ProfessorSchedule;
