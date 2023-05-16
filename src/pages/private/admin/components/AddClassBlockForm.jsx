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
  const [dataClassBlock, setdataClassBlock] = useState();
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
      <div className="w-2/5 border border-gray-300 p-8 rounded-md">
        <h2 className="text-xl my-5">Seleccione los datos para el bloque</h2>
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
          {professors == null ? (
            <>cargando...</>
          ) : (
            <Search
              setData={setSelectProfesor}
              placeName={"Buscar profesor"}
              data={professors}
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
      <div className="w-3/5 border border-gray-300 p-8 rounded-md">
        <h2 className="text-xl my-5">Datos a guardar para el bloque</h2>
        <div className="mb-6">
          <ul>
            <li className="mb-2">
              <label htmlFor="semestre" className="font-semibold">
                Semestre:
              </label>{" "}
              {data.semestre}
            </li>
            <li className="mb-2">
              <label htmlFor="bloque" className="font-semibold">
                Bloque de horaria:
              </label>{" "}
              {data.bloque[0]}
            </li>
            <li className="mb-2">
              <label htmlFor="dia" className="font-semibold">
                Día:
              </label>{" "}
              {data.dia}
            </li>
            <li className="mb-2">
              <label htmlFor="asignatura" className="font-semibold">
                Asignatura:
              </label>{" "}
              {selectSubject == null ? " " : selectSubject.nombre}
            </li>
            <li className="mb-2">
              <label htmlFor="sala" className="font-semibold">
                Sala:
              </label>{" "}
              {selectRomm == null ? " " : selectRomm.nombre}
            </li>
            <li className="mb-2">
              <label htmlFor="professor" className="font-semibold">
                Profesor:
              </label>{" "}
              {selectProfesor == null ? " " : selectProfesor.nombre}
            </li>
            <li className="mb-2">
              <label htmlFor="grupo" className="font-semibold">
                Grupo:
              </label>{" "}
              {selectGroup == null ? " " : selectGroup.nombre}
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
            className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
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
