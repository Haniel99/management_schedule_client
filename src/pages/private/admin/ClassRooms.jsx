import { useEffect, useState } from "react";
import OptionClassRooms from "../../../components/adminComponent/OpcionsProfessor";
import { useGetRooms } from "../../../hooks/useAdmin";
import { useSelector } from "react-redux";
import Rooms from "./table/Rooms";
import RoomForm from "./components/RoomForm";

const ClassRooms = () => {
  const [showOption, setShowOption] = useState(true);
  const [rooms, setRooms] = useState(null);
  const dataRedux = useSelector((state) => state.user);
  useEffect(() => {
    async function getRooms() {
      const res = await useGetRooms(dataRedux.token);
      setRooms(res.response);
    }
    getRooms();
  }, [showOption]);
  return (
    <div className="w-full flex flex-col">
      <div className="flex font-semibold w-full p-6 border-2 border-y-gray-300 mb-6">
        <OptionClassRooms nameButton={"salas"} option={setShowOption} />
      </div>
      <div className="flex justify-center flex-grow overflow-auto">
        <div className="w-11/12">
          {showOption ? (<>{rooms!==null?<Rooms data={rooms}/>: <>cargando</>}</>) : <RoomForm set={showOption}/>}
        </div>
      </div>
    </div>
  );
};

export default ClassRooms;
