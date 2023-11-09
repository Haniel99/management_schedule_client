import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Search from "./SearchSubject";
import {
  useGetProfessors,
  useGetRooms,
  useGetSubjects,
  useAddClassBlock,
} from "../../../../hooks/useAdmin";
import { useNavigate } from "react-router-dom";

const grupos = [
  {
    grupo_id: 1,
    nombre: "A",
  },
  {
    grupo_id: 2,
    nombre: "B",
  },
  {
    grupo_id: 3,
    nombre: "C",
  },
];

const AddClassBlockForm = ({ data, setShowForm }) => {
  const navigate = useNavigate();
  const [professors, setProfessors] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [subjects, setSubjects] = useState(null);
  const [selectProfesor, setSelectProfesor] = useState(null);
  const [selectRomm, setSelectRoom] = useState(null);
  const [selectSubject, setSelectSubject] = useState(null);
  const [selectGroup, setSelectGroup] = useState(null);
  const [error, setError] = useState(false);
  const dataRedux = useSelector((state) => state.user);
  //This effect is to get the subjects
  useEffect(() => {
    async function getSubjects() {
      const res = await useGetSubjects(dataRedux.token);
      setSubjects(res.response.response);
    }
    getSubjects();
  }, []);
  //This effect is to get the rooms
  useEffect(() => {
    async function getRooms() {
      const res = await useGetRooms(dataRedux.token);
      setRooms(res.response);
    }
    getRooms();
  }, []);
  //This effect is to get the professors
  useEffect(() => {
    async function getProfessor() {
      const res = await useGetProfessors(dataRedux.token);
      setProfessors(res.response);
    }
    getProfessor();
  }, []);
  //Send datas to the data base
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fecha = new Date();
    const yearActual = fecha.getFullYear();
    const dataQ = {
      bloque_id: data.bloque[1],
      semestre_id: parseInt(data.semesterId),
      dia: data.dia,
      semestre: parseInt(data.semestre),
      asignatura_id: selectSubject.asignatura_id,
      docente_id: selectProfesor.profesor_id,
      sala_id: selectRomm.sala_id,
      year: yearActual,
      grupo: selectGroup.nombre,
    };
    const res = await useAddClassBlock(dataRedux.token, dataQ);
    if (res.status) {
      alert(res.response.response);
      navigate("/admin/");
    }
    setError(true);
  };

  return (
    <div className="flex h-full gap-3">
      <div className="grow bg-gray-50 shadow-lg  p-8 rounded-lg">
        <h2 className="text-lg text-gray-600 font-semibold my-4">
          Profesores disponibles para el bloque - {data.bloque[0]}
        </h2>
        <div className="flex flex-col overflow-auto h-80 px-2 ">
          {professors == null ? (
            <>cargando...</>
          ) : (
            professors.map((item) => {
              return (
                <div
                  onClick={() => {
                    setSelectProfesor(item);
                  }}
                  className="px-4 cursor-pointer text-gray-700 font-normal text-base py-2 border rounded-md my-1 hover:bg-gray-100 hover:shadow-md border-b-2 border-gray-300 "
                >
                  {item.nombre}
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className="grow  bg-gray-50 shadow-lg  p-8 rounded-lg">
        <h2 className="text-lg text-gray-600 font-semibold my-4">Seleccione los datos para el bloque</h2>
        <div className="flex flex-col my-3">
          <div className="">
            {subjects == null ? (
              <>cargando...</>
            ) : (
              <Search
                placeName={"Buscar asignatura"}
                data={subjects}
                setData={setSelectSubject}
              />
            )}
          </div>
        </div>
        <div className="my-3">
          {rooms == null ? (
            <>cargando...</>
          ) : (
            <Search
              setData={setSelectRoom}
              placeName={"Buscar sala"}
              data={rooms}
            />
          )}
        </div>

        <div className="my-3">
          <Search
            placeName={"Agregar grupo"}
            data={grupos}
            setData={setSelectGroup}
          />
        </div>
      </div>
      <div className="grow  bg-gray-50 shadow-lg  p-8 rounded-lg">
        <h2 className="text-lg text-gray-600 font-semibold my-4">Datos a guardar para el bloque</h2>
        <div className="mb-6">
          <ul>
            <li className="flex justify-between mb-2 border-gray-300  border-b-2 py-1 px-2">
              <label form="semestre" className="font-normal">
                Semestre:
              </label>
              <span className="font-semibold">{data.semestre}</span>
            </li>
            <li className="flex justify-between mb-2 border-gray-300  border-b-2 py-1 px-2">
              <label form="bloque" className="font-normal">
                Bloque de horaria:
              </label>
              <span className="font-semibold">{data.bloque[0]}</span>
            </li>
            <li className="flex justify-between mb-2 border-gray-300  border-b-2 py-1 px-2">
              <label form="dia" className="font-normal">
                Día:
              </label>
              <span className="font-semibold">{data.dia}</span>
            </li>
            <li className="flex justify-between mb-2 border-gray-300  border-b-2 py-1 px-2">
              <label form="asignatura" className="font-normal">
                Asignatura:
              </label>
              <span className="font-semibold">
                {selectSubject == null ? " " : selectSubject.nombre}
              </span>
            </li>
            <li className="flex justify-between mb-2 border-gray-300  border-b-2 py-1 px-2">
              <label form="sala" className="font-normal">
                Sala:
              </label>
              <span className="font-semibold">
                {selectRomm == null ? " " : selectRomm.nombre}
              </span>
            </li>
            <li className="flex justify-between mb-2 border-gray-300  border-b-2 py-1 px-2">
              <label form="professor" className="font-normal">
                Profesor:
              </label>
              <span className="font-semibold">
                {selectProfesor == null ? " " : selectProfesor.nombre}
              </span>
            </li>
            <li className="flex justify-between mb-2 border-gray-300  border-b-2 py-1 px-2">
              <label form="grupo" className="font-normal">
                Grupo:
              </label>
              <span className="font-semibold">
                {selectGroup == null ? " " : selectGroup.nombre}
              </span>
            </li>
          </ul>
          {error ? (
            <p className="text-red-500 bg-red-200 px-4 py-2 rounded">
              Error al agregar el bloque de horario
            </p>
          ) : (
            <></>
          )}
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md mr-2"
          >
            Guardar
          </button>
          <button
            onClick={() => setShowForm(false)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddClassBlockForm;
