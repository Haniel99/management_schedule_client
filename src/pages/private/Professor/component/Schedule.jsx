
const Schedule = ({ dataOfWeek, timeSlots }) => {
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
            const professor = value[1].find(
              (val) => val.hora_inicio === time[0]
            );
            if (!professor) {
              return (
                <td
                  key={index}
                 
                  className="px-6 py-4 whitespace-nowrap text-center border-b-2 border-gray-200 cursor-pointer transition-colors hover:bg-rose-300"
                >
                  Sin asignar
                </td>
              );
            }
            return (
              <td key = {index}
              >
                {value[1].map((val, i) => {
                  if (val.hora_inicio === time[0]) {
                    return (
                      <div
                        key={i}  
                                           
                        className="px-6 py-4 whitespace-nowrap text-center border-b-2 border-gray-200 cursor-pointer transition-colors hover:bg-blue-100"
                      >
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
                    )
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
