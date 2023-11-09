

const Rooms = ({data}) => {
    return (
        <div className="w-full">
        <table className="mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y shadow-md  divide-gray-300 overflow-hidden">
          <thead className="bg-gray-50">
            <tr className="text-gray-600 text-left">
              <th className="font-semibold text-sm uppercase px-6 py-4">
                Nombre
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4">
                Numero
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4">
                Piso
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((empleado, index) => (
              <tr key={index} className="text-gray-600 text-left">
                <td className="px-6 py-4 whitespace-nowrap">{empleado.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap">{empleado.numero}</td>
                <td className="px-6 py-4 whitespace-nowrap"></td>
                <td className="px-6 py-4 whitespace-nowrap"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default Rooms;