import React, { useState } from "react";
import { useSelector } from "react-redux";

const Gestion = () => {
  const [option, setOption] = useState(true);
  const dataRedux = useSelector((state) => state.user);

  const change = () => {
    setOption(!option);
  };
  return (
    <div className="flex flex-col w-full p-2">
      <nav className="mb-4">
        <ul className="flex gap-3">
          <li onClick={change} className="button  cursor-pointer">
            Administrar departamentos
          </li>
          <li onClick={change} className="button  cursor-pointer">
            Configuracion
          </li>
        </ul>
      </nav>
      <div className="bg-gray-100 p-4 h-full overflow-auto  rounded-lg">
        <div className="flex justify-center items-center w-full">
            {option?<>Administrar</>: <>Ver</>}
        </div>
      </div>
    </div>
  );
};

export default Gestion;
