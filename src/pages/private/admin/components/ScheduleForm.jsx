import { useRef, useState } from "react";
import { useCreateSchedule } from "../../../../hooks/useAdmin";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const ScheduleForm = ({toggle}) => {
  const dataRedux = useSelector(state => state.user);
  const navigate = useNavigate();
  const plan = {
    plan2019: 11,
    plan2013: 12
  }
  const selectRef = useRef();
  const dateRef = useRef();
  const semesterRef = useRef();
  const [option, setOption] = useState(plan.plan2019);
  const [optionSemester, setOptionSemester] = useState(1);
  const [prevent, setPrevent] = useState(true);

  const handleCreate = async (e) => {
    e.preventDefault();
    const selectedOptionText =
      selectRef.current.options[selectRef.current.selectedIndex].text;
    if (selectedOptionText && dateRef.current.value &&  optionSemester) {
      //objet of semester data
      const obSemester = {
        plan: selectedOptionText,
        fecha_creacion: dateRef.current.value,
        semestre: optionSemester
      }

      const answer = await  useCreateSchedule( dataRedux.token, obSemester);
      alert(answer.response);
      navigate('/admin/');
    }
    setPrevent(false);
  };
  return (
    <div className="flex justify-center text-center">
      <form className="mt-8 space-y-6">
      {prevent ? null : <p className="text-red-500">Complete el formulario</p>}
        <div className="flex flex-col items-center">
          <label htmlFor="plan" className="mb-2 font-medium text-gray-700">
            Seleccione el plan
          </label>
          <select
            ref={selectRef}
            name="plan"
            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setOption(e.target.value)}
            value={option}
            >
            <option
                value="11"
                className="hover:bg-blue-500 hover:text-white"
            >Plan 2019</option>
            <option
                value="12"
                className="hover:bg-blue-500 hover:text-white"
            >Plan 2013</option>
            </select>
            <label htmlFor="plan" className="mb-2 font-medium text-gray-700">
            Seleccione el semestre
          </label>
            <select
            ref={semesterRef}
            name="semester"
            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setOptionSemester(e.target.value)}
            value={optionSemester}
            >
            <option
                value="1"
                className="hover:bg-blue-500 hover:text-white"
            >Semestre 1</option>
            <option
                value="2"
                className="hover:bg-blue-500 hover:text-white"
            >Semestre 2</option>
            </select>
        </div>
        <div className="flex flex-col items-center">
          <label
            htmlFor="datecrete"
            className="mb-2 font-medium text-gray-700"
          >
            Fecha de creacion
          </label>
          <input
            ref={dateRef}
            type="date"
            name="datecrete"
            id="datecrete"
            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="numSemesters" className="mb-2 font-medium text-gray-700">
            Numero de semestres
          </label>
          <p id="numSemesters" className="text-lg font-medium text-gray-700">
            {option}
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleCreate}
            className="px-4 py-2 text-white bg-indigo-500 rounded-md shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm"
          >
            Crear horario
          </button>
          <button
            onClick={() => toggle(false) }
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default
 ScheduleForm;

/**
 * nombre 1
 * nombre 2
 * nombre 3
 * 
 * 
*/