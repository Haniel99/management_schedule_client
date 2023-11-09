import React, { useState } from "react";
import { useSetProfessor } from "../../../../hooks/useAdmin";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StatusMessage from "../../../../components/StatusMessage";
const ProfessorForm = ({set}) => {
  const [profesor, setProfesor] = useState({
    nombre: "",
    apellido: "",
    rut: "",
    correo: "",
    contrasena: "",
    telefono: "",
  });
  const [alrt, setAlrt] = useState('');
  const { nombre, apellido, rut, correo, contrasena, telefono } = profesor;
  const dataRedux = useSelector((state) => state.user);
  const [status, setStatus] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfesor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Verificar que todos los campos estén completos
    if (
      nombre.trim() === "" ||
      apellido.trim() === "" ||
      rut.trim() === "" ||
      correo.trim() === "" ||
      contrasena.trim() === "" ||
      telefono.trim() === ""
    ) {
      setStatus(false);
      setAlrt("Todos los campos son obligatorios");
      return;
    }

    // Validar el formato del RUT (8 dígitos, guión, y último dígito número o letra)
    const rutRegex = /^[0-9]{7,8}-[0-9Kk]$/;
    if (!rutRegex.test(rut)) {
      setStatus(false);
      setAlrt("El formato del RUT no es válido");
      return;
    }

    // Validar el formato del correo electrónico
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(correo)) {
      setStatus(false);
      setAlrt("El formato del correo electrónico no es válido");
      return;
    }

    // Validar el formato del número de teléfono (9 dígitos y comienza con 9)
    const telefonoRegex = /^9[0-9]{8}$/;
    if (!telefonoRegex.test(telefono)) {
      setStatus(false);
      setAlrt("El formato del número de teléfono no es válido");
      return;
    }

    // Aquí puedes hacer lo que quieras con el objeto 'profesor' que contiene los datos capturados
    const res = await useSetProfessor(profesor, dataRedux.token); 
    if(res.status){
      setStatus(true);
      setAlrt('El usuario se creo exitosamente');
      return; 
    }
    setStatus(false);
    setAlrt("El usuario ya existe");
  };

  return (
    <div className="flex flex-col mx-auto  justify-center bg-gray-50 py-6 px-8  shadow-lg rounded-lg">
      <h2 className="text-2xl text-gray-700 font-bold mb-4">
        Ingrese los datos del profesor
      </h2>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
      {alrt.length !==0?<StatusMessage isSuccess={status} message={alrt}/>:<></>}
        <div className="mb-4">
          <input
            name="nombre"
            id="nombre"
            placeholder="Nombre del profesor"
            className="input-style"
            type="text"
            value={nombre}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <input
            name="apellido"
            placeholder="Apellido del profesor"
            className="input-style"
            type="text"
            value={apellido}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <input
            name="rut"
            placeholder="Rut (ejemplo: 12345678-9)"
            className="input-style"
            type="text"
            value={rut}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <input
            name="correo"
            placeholder="Correo electrónico"
            className="input-style"
            type="email"
            required
            value={correo}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <input
            name="contrasena"
            placeholder="Contraseña"
            className="input-style"
            type="password"
            value={contrasena}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <input
            name="telefono"
            placeholder="Teléfono (ejemplo: 987654321)"
            className="input-style"
            type="text"
            value={telefono}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center space-x-4">
          <button className="button-primary" type="submit">
            Agregar
          </button>
          <a className="button-secondary cursor-pointer " onClick={()=>set(true)} >Cancelar</a>
        </div>
      </form>
    </div>
  );
};

export default ProfessorForm;
