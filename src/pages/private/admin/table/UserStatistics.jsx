import { useState, useEffect } from "react";
import "./table.css";
import { FaEye } from "react-icons/fa";
import HorarioDisponibilidad from "../../Professor/component/HorarioProfesor";
import {
  useGetSchedule,
  useGetHorarioProfessor,
} from "../../../../hooks/useAdmin";
import ManagementSchedule from "../../../../components/adminComponent/ManagementSchedule";
import { useSelector } from "react-redux";

const UserStatistics = ({ datos }) => {
  const dataRedux = useSelector((state) => state.user);
  const [showShedule, setShowSchedule] = useState(false);
  const [dataSection, setDataSection] = useState([]);
  const [horario, setHorario] = useState(null);
  const [profesor, setProfesor] = useState(null);
  const setSemester = async (schehule) => {
    const data = {
      horario_id: schehule,
      user_id: profesor.profesor_id,
    };
    const res = await useGetHorarioProfessor(dataRedux.token, data);
    setDataOfWeek(res.response);
  };
  const [dataOfWeek, setDataOfWeek] = useState([
    ["Lunes", []],
    ["Martes", []],
    ["Miercoles", []],
    ["Jueves", []],
    ["Viernes", []],
  ]);
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
  const verProfesor = async (profesor) => {
    setShowSchedule(true);
    setProfesor(profesor);
  };

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

  return (
    <div className="w-full">
      {showShedule ? (
        <>
          <div className="flex mx-48">
            <ManagementSchedule data={dataSection} fn={setSemester} />
          </div>
          <div className="flex w-full">
            <HorarioDisponibilidad
              dataOfWeek={dataOfWeek}
              timeSlots={timeSlots}
            />
          </div>
        </>
      ) : (
        <table className="mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y shadow-md  divide-gray-300 overflow-hidden">
          <thead className="bg-gray-50">
            <tr className="text-gray-600 text-left">
              <th className="font-semibold text-sm uppercase px-6 py-4">
                Nombre Completo
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4">RUT</th>
              <th className="font-semibold text-sm uppercase px-6 py-4">
                Correo
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4">
                Horas de trabajo
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {datos.map((empleado, index) => (
              <tr key={index} className="text-gray-600 text-left">
                <td className="px-6 py-4 whitespace-nowrap">
                  {empleado.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{empleado.rut}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {empleado.correo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {empleado.horasTrabajo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <div
                      className="flex gap-3 cursor-pointer items-center"
                      onClick={() => verProfesor(empleado)}
                    >
                      <FaEye />
                      <span className="text-xs  py-1 text-gray-700 font-medium">
                        Ver horario
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserStatistics;
