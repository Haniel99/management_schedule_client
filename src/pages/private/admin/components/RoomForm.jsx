import React, { useState } from 'react';
import { useSetRoom, useSetSubject } from '../../../../hooks/useAdmin';
import { useSelector } from 'react-redux';
import StatusMessage from '../../../../components/StatusMessage';

function RoomForm({ set }) {
  const [roomData, setRoomData] = useState({
    nombre: '',
    numero: null,
  });
  const [alrt, setAlrt] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [alertT, setAlertT] = useState('');
  const dataRedux = useSelector((state) => state.user);

  const saveRoomData = (event) => {
    const { name, value } = event.target;
    setRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const inputHandle = async (event) => {
    event.preventDefault();
    if (roomData.nombre.length !== 0 && roomData.numero.length !== 0) {
      const res = await useSetRoom(roomData, dataRedux.token);
      setAlrt(true);
      if (res.status) {
        setAlertText('La sala se agregó correctamente');
        setAlertT(true);
      } else {
        setAlertText('Algo salió mal');
        setAlertT(false);
      }
    } else {
      setAlertText('Complete los campos');
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
    const regex = /^[0-99]+$/;

    if (!regex.test(keyValue) && keyCode !== 8 && keyCode !== 46) {
      event.preventDefault();
    }
  };

  return (
    <div className="flex flex-col mx-auto  justify-center bg-gray-50 py-6 px-8  shadow-lg rounded-lg">
      <h2 className="text-2xl text-gray-700 font-bold mb-4">Ingrese los datos de la sala</h2>
      <form className="w-full max-w-sm" action="">
        <div className="flex flex-col items-center mb-4">
          {alrt ? <StatusMessage isSuccess={alertT} message={alertText} /> : <></>}
        </div>
        <div className="flex flex-col items-center mb-4">
          <input
            name="nombre"
            id="nombre"
            placeholder="Nombre de la sala"
            onChange={saveRoomData}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
          />
        </div>
        <div className="flex flex-col items-center mb-4">
          <input
            name="numero"
            id="numero"
            onChange={saveRoomData}
            onKeyDown={handleCodeInput}
            placeholder="Número de la sala"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type=""
          />
        </div>
        <div className="flex flex-col items-center mb-4">
          <input
            name="piso"
            id="piso"
            
            placeholder="Piso"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type=""
          />
        </div>
        <div className="flex justify-center space-x-4 mb-4">
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

export default RoomForm;
