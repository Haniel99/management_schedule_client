import React, { useState, useEffect } from "react";
import "./table.css";
import { useGetClassBlock } from "../../../../hooks/useAdmin";
import { useSelector } from "react-redux";
import AddClassBlockForm from "../components/AddClassBlockForm";
import ModalRgister from "../../../../components/adminComponent/ModalRegister";
import ModifyBlock from "../components/ModifyBlock";

const ScheduleTable = ({ semesterId,  dsemestre }) => {
  //REDUX
  const dataRedux = useSelector((state) => state.user);
  //STATES
  const [dataOfWeek, setDataOfWeek] = useState([]);
  const [professorData, setProfessorData] = useState({
    semesterId: null,
    bloque: "",
    dia: "",
    semestre: null,
  });
  const [showForm, setShowForm] = useState(false);
  const [ showModify, setShowModify ] = useState(false);
  const [open, setOpen] = useState(false);
  const [ dataBlock, setDataBlock ] = useState(null);
  //This useEffect is to get all semester datas from a single semester id
  useEffect(() => {
    async function dataSemester() {
      const data = {
        semester_id: semesterId,
      };
      const res = await useGetClassBlock(dataRedux.token, data);
      setDataOfWeek(res.response.response);
    }
    dataSemester();
  }, [semesterId, showModify]);

  const handleBlockClick = (bloque, dia) => {
    setProfessorData({
      semesterId,
      bloque,
      dia,
      semestre: dsemestre,
    });
    setShowForm(true);
  };
  const modifyBlock = (bloque, datas, dia) => {
    setProfessorData({
      semesterId,
      bloque,
      dia,
      semestre: dsemestre,
    });
    setDataBlock(datas);
    setOpen(true);
  }
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

  const timeSlots = [
    ["08:00", 1],
    ["09:40", 2],
    ["11:20", 3],
    ["14:45", 4],
    ["16:20", 5],
    ["17:55", 6],
    ["18:40", 7],
    ["19:30", 8],
  ];
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
                onClick={() => handleBlockClick(time, value[0])}
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
                      onClick={() => modifyBlock(time,val, value[0]) }                    
                      className="px-6 py-4 whitespace-nowrap text-center border-b-2 border-gray-200 cursor-pointer transition-colors hover:bg-blue-100"
                    >
                      <div className="text-sm">
                        <span className="font-medium">{val.asignatura}</span>
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
          {/* It is to render the form */}
          {showModify?<ModifyBlock data={professorData} dataS={dataBlock} setShowForm={setShowModify} />:(
        showForm ? (
          <div className="w-full h-full">
            <AddClassBlockForm
              data={professorData}
              setShowForm={setShowForm}
            />
          </div>
        ) : (
          <>
            {/* It is to render the schedule table */}
            <table className="mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden border border-gray-400">
              <thead>{renderHeader()}</thead>
              <tbody>{renderTimeSlots()}</tbody>
            </table>
          </>
        )
      )}
        </div>
      )}
      <ModalRgister open={open} setOpen={setOpen} add={setShowForm} modify={setShowModify} ></ModalRgister>
      
    </>
  );
};

export default ScheduleTable;
