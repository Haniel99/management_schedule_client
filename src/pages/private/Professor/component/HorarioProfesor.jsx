
const HorarioDisponibilidad = (props) => {
  const renderHeader = () => {
    return (
      <tr>
        <th className="px-6 py-4 text-left bg-gray-50 text-gray-600 uppercase font-semibold border-b-2 border-gray-200">
          Hora
        </th>
        {props.dataOfWeek.map((value, index) => {
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
        {props.dataOfWeek.map((value, index) => {
          const professor = value[1].find((val) => val.hora_inicio === time[0]);
          if (!professor) {
            return (
              <td
                key={index}
                className=""
                data-time={time[0]}
                data-day={value[0]}
              >
                No disponible
              </td>
            );
          }

          return (
            <td key={index} className="bg-green-400 border-green-700">
              {value[1].map((val, i) => {
                if (val.hora_inicio === time[0]) {
                  return (
                    <div key={i}>
                      <div className="text-base font-semibold text-gray-700 ">
                        Reservado
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
    return props.timeSlots.map((time) => renderTimeSlot(time));
  };

  return (
    <>
      {props.dataOfWeek.length === 0 ? (
        <>Cargando</>
      ) : (
        <>
          <div className="w-full m-5 overflow-x-auto">
            <table className="mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden border border-gray-400">
              <thead>{renderHeader()}</thead>
              <tbody>{renderTimeSlots()}</tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default HorarioDisponibilidad;
