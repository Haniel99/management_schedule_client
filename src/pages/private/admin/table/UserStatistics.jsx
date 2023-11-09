import './table.css';

const UserStatistics = ({datos}) => {

  return (
    <div className="w-full px-10 py-5 overflow-x-auto">
      <table className="mx-auto w-full shadow-lg whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
        <thead className="bg-gray-50">
          <tr className="text-gray-600 text-left">
            <th className="font-semibold text-sm uppercase px-6 py-4">
              Nombre Completo
            </th>
            <th className="font-semibold text-sm uppercase px-6 py-4">
              RUT
            </th>
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
              <td className="px-6 py-4 whitespace-nowrap">{empleado.nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap">{empleado.rut}</td>
              <td className="px-6 py-4 whitespace-nowrap">{empleado.correo}</td>
              <td className="px-6 py-4 whitespace-nowrap">{empleado.horasTrabajo}</td>
              <td className="px-6 py-4 whitespace-nowrap"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserStatistics;

