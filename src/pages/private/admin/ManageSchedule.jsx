import { useEffect, useState } from "react";
import OpcionsManaging from "../../../components/adminComponent/OptionsManaging";
import NavSchedule from "../../../components/adminComponent/NavSchedule";
import ScheduleTable from "./table/Schedule";
import ScheduleForm from "./components/ScheduleForm";
import { useGetSchedule, useGetSemesters } from "../../../hooks/useAdmin";
import { useSelector } from "react-redux";
const ManageSchedule = () => {
  const [toggleNewR, setToggleNewR] = useState(false); //para mostrar el formulario de nuevo registro
  const [dataSection, setDataSetion] = useState([]);
  const [dataSemesters, setDataSemester] = useState([]); //datos de un semestre
  const [semesterId, setSemesterId] = useState(null); //this const is to save the semester id
  const [numero, setNumber] = useState(1);
  const [plan, setPlan] = useState(null); //This constant save the semester number and plan
  const [semestre, setSemestre] = useState(); 
  const dataRedux = useSelector((state) => state.user);
  useEffect(() => {
    async function get() {
      //This res is to get the schedules datas
      const res = await useGetSchedule(dataRedux.token);
      if (!res.status) {
        return false;
      }
      //save the datas in datasetion
      setDataSetion(res.response);
    }
    get();
  }, []);
  const fn = async (num, plan, semestre) => {
    const data = {
      horario_id: num,
    };
    setPlan(plan);
    setSemestre(semestre);
    try {
      const res = await useGetSemesters(dataRedux.token, data);
      if (res.status) {
        setDataSemester(res.response);
        setSemesterId(res.response[0].semestre_id);
      }
    } catch (error) {}
  };
  const showData = (id, numero) => {
    setSemesterId(id);
    setNumber(numero);
  };
  return (
    <div className="w-full flex flex-col">
      <div className="flex font-semibold w-full p-6 border-2 border-y-gray-300">
        {/* Este componente verifica si existen semestres activos */}
        <OpcionsManaging
          fn={fn}
          toggle={toggleNewR}
          set={setToggleNewR}
          dataSemester={dataSection}
        />
      </div>
      {toggleNewR ? (
        <ScheduleForm toggle={setToggleNewR} />
      ) : dataSection.length == 0 ? (
        <div>No hay registros</div>
      ) : (
        <>
          <div className="flex  overflow-auto flex-col">
            {dataSemesters.length == 0 ? (
              <>seleccione un semestre</>
            ) : (
              <>
                <NavSchedule
                  show={showData}
                  plan={plan}
                  options={dataSemesters}
                />
                <div className="flex my-3 justify-center items-center">
                  {semesterId == null ? (
                    <>cargando...</>
                  ) : (
                    <ScheduleTable semesterId={semesterId} numero={numero} dsemestre = {semestre} />
                  )}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default ManageSchedule;
