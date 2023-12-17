import React, { useState } from 'react';
import { createAvailbleBlock } from '../../../../hooks/useProfessor';
import { useSelector } from 'react-redux';

const Schedule = ({ dataOfWeek, timeSlots, onSlotClick, updateSchedule, horarioId}) => {
  const dataRedux = useSelector((state) => state.user);
  const renderHeader = () => {
    return (
      <tr>
        <th className="px-6 py-4 text-left bg-gray-50 text-gray-600 uppercase font-semibold border-b-2 border-gray-200">
          Hora
        </th>
        {dataOfWeek.map((value, index) => {
          return (
            <th
              key={index}
              className="px-6 py-4 text-left bg-gray-50 text-gray-600 uppercase font-semibold border-b-2 border-gray-200"
            >
              {value[0]}
            </th>
          );
        })}
      </tr>
    );
  };

  const renderTimeSlot = (time) => {
    return (
      <tr key={time[0]}>
        <td className="px-6 py-4 whitespace-nowrap border-b-2 border-gray-200 bg-gray-100">
          {time[0]}
        </td>
        {dataOfWeek.map((value, index) => {
          const professor = value[1].find((val) => val.hora_inicio === time[0]);
  
          const isConfirmed = professor && professor.disponible && professor.confirmation === "confirmed";
  
          const slotClassName = `px-6 py-4 whitespace-nowrap text-center border-b-2 border-gray-200 cursor-pointer transition-colors ${
            isConfirmed ? "bg-green-100 ring ring-green-400 ring-opacity-50" : "hover:bg-rose-300"
          }`;
  
          if (!professor) {
            return (
              <td
                key={index}
                data-time={time[0]}
                data-day={value[0]}
                onClick={(e) =>{ 
                  onSlotClick && typeof onSlotClick === "function" && onSlotClick(time, value[0])
                  let td = e.target;
                  if (td.innerHTML == "Sin asignar") {
                    td.className = "bg-green-200 text-center cursor-pointer";
                    td.innerHTML = "Asignado";
                    createAvailbleBlock(dataRedux.token, time[1], value[0], horarioId);
                  } else {
                    td.className = "text-center cursor-pointer hover:bg-rose-300";
                    td.innerHTML = "Sin asignar";
                    createAvailbleBlock(dataRedux.token, time[1], value[0])
                  }
                }
                }
                className={slotClassName}
              >
                {isConfirmed ? "Horario disponible" : "Sin asignar"}
              </td>
            );
          }
  
          return (
            <td key={index}>
              {value[1].map((val, i) => {
                if (val.hora_inicio === time[0]) {
                  return (
                    <div key={i} className={slotClassName}>
                      <div className="text-sm">
                        <span className="font-medium">{professor.asignatura}</span>
                        <br />
                        {val.sala}
                        <br />
                        {val.nombre_profesor}
                        <br />
                        {val.grupo}
                      </div>
                    </div>
                  );
                }
              })}
            </td>
          );
        })}
      </tr>
    );
  };

  const renderTimeSlots = () => {
    return timeSlots.map((time) => renderTimeSlot(time));
  };

  return (
    <>
      {dataOfWeek.length === 0 ? (
        <>Cargando</>
      ) : (
        <div className="w-full m-5 overflow-x-auto">
          <table
            className="mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden border border-gray-400"
          >
            <thead>{renderHeader()}</thead>
            <tbody>{renderTimeSlots()}</tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Schedule;