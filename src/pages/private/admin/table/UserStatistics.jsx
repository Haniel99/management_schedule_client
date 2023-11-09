import { useState } from "react";
import "./table.css";
import Schedule from "../../Professor/component/Schedule";
const UserStatistics = ({ datos }) => {
  const [showShedule, setShowSchedule] = useState(false);
  const [dataOfWeek, setDataOfWeek] = useState([
    ["Lunes", []],
    ["Martes", []],
    ["Miercoles", []],
    ["Jueves", []],
    ["Viernes", []],
  ]);

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

  return (
    <div className="w-full">
      {showShedule ? (
        <div className="flex w-full">
          <Schedule dataOfWeek={dataOfWeek} timeSlots={timeSlots}></Schedule>
        </div>
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
                    <div>
                      <span
                        onClick={() => {
                          setShowSchedule(true);
                        }}
                        className="text-xs shadow-xl rounded-lg bg-gray-200 px-3 cursor-pointer py-1 text-gray-700 font-medium"
                      >
                        Disponibilidad
                      </span>{" "}
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
