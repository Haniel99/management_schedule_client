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
    <div className="w-full  bg-gray-200  flex flex-col">
      <div className="flex font-semibold bg-[#fafafa] shadow-md  w-full p-6 border-2 border-b-gray-200">
        <OptionClassRooms nameButton={"salas"} option={setShowOption} />
      </div>
      <div className="flex w-full my-6 justify-center  overflow-auto">
        <div className="flex w-full">
          {showOption ? (<>{rooms!==null?<Rooms data={rooms}/>: <>cargando</>}</>) : <RoomForm set={showOption}/>}
        </div>
      </div>
    </div>
  );
};

export default ClassRooms;
