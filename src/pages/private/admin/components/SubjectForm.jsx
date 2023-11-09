import React, { useState } from 'react';
import { useSetSubject } from '../../../../hooks/useAdmin';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StatusMessage from '../../../../components/StatusMessage';

function SubjectForm({set}) {
  const [subjectData, setSubjectData] = useState({
    nombre: '',
    codigo: '',
    tipo_formacion: 'Profesional'
  });
  const [ alrt, setAlrt ] = useState(false);
  const [ alertText, setAlertText ] = useState('');
  const [ alertT, setAlertT ] = useState('');
  const dataRedux = useSelector((state) => state.user);
  const saveSubjectData = (event) => {
    const { name, value } = event.target;
    setSubjectData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const inputHandle = async (event) => {
    event.preventDefault();
    if(subjectData.codigo.length !== 0 && subjectData.nombre.length !==0 ){
      const res = await useSetSubject(subjectData, dataRedux.token);
      setAlrt(true);
      if(res.status){
        setAlertText('La asignatura se agrego correctamente');
        setAlertT(true);
      }else{
        setAlertText('Algo salio mal');
        setAlertT(false);
      }
    }else{
      setAlertText('Complete los campo');
      setAlrt(true);
      setAlertT(false);
    }
  };

  const handleC = (event) => {
    set(true);
    event.preventDefault();
  };

  const handleCodeInput = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const regex = /^[0-9]+$/;

    if (!regex.test(keyValue) && keyCode !== 8 && keyCode !== 46) {
      event.preventDefault();
    }
  };


  return (
    <div className="flex flex-col m-auto justify-center bg-white p-4 shadow-lg rounded-md items-center text-center">
      <h2 className="text-2xl font-bold mb-4">Ingrese los datos de la asignatura</h2>
      <form className="w-full max-w-sm" action="">
        <div className='flex flex-col items-center mb-4'>
        {alrt?<StatusMessage isSuccess={alertT} message={alertText} />: <></>}
        </div>
        <div className="flex flex-col items-center mb-4">
          <input
            name="nombre"
            id="nombre"
            placeholder="Nombre de la asignatura"
            onChange={saveSubjectData}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
          />
        </div>
        <div className="flex flex-col items-center mb-4">
          <input
            name="codigo"
            id="codigo"
            onChange={saveSubjectData}
            onKeyDown={handleCodeInput}
            placeholder="Codigo de la asignatura"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
          />
        </div>
        <div className="flex flex-col items-center mb-4">
          <select
            name="tipo_formacion"
            id="tipo_formacion"
            onChange={saveSubjectData}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Profesional">Profesional</option>
            <option value="General">General</option>
          </select>
        </div>
        <div className="flex justify-center space-x-4 mb-4 ">
          <button
            onClick={inputHandle}
            className="px-4 py-2 text-white bg-indigo-500 rounded-md shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm"
          >
            Agregar
          </button>
          <button
            onClick={handleC}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default SubjectForm;
