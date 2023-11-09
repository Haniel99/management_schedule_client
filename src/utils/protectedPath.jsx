import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useGetType, useIsType } from "../hooks/useAdmin";
//Verify if exist token in the local storage
export const ProtectedPathAdmin = ({ children }) => {
  const userState = useSelector((Store) => Store.user);
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  if (!userState.token) {
    return <Navigate to={"/login"} />;
  }

  useEffect(() => {
    const fetchIsAdmin = async () => {
      try {
        const res = await useIsType(userState.token, "admin");
        setIsAdmin(res.status);
        setLoading(false);
      } catch (error) {
        setIsAdmin(false);
        setLoading(false);
      }
    };

    fetchIsAdmin();
  }, []);

  if (loading) {
    return <>Cargando</>; // Mostrar un componente de carga mientras se realiza la consulta
  }

  if (!isAdmin) {
    return <Navigate to={"/"} />; // Redireccionar si el usuario no es administrador
  }

  return children; // Mostrar el contenido si el usuario es administrador
};

//This function is to protected login, and veryfy than it don't exist session
export const ProtectedLogin = ({ children }) => {
  const userState = useSelector((Store) => Store.user);
  if (userState.token) {
    return <Navigate to={"/"} />;
  }
  return children;
};

export const ProtectedPathProfessor = ({ children, type }) => {
  const userState = useSelector((Store) => Store.user);
  const [isProfessor, setIsProfessor] = useState(null);
  const [loading, setLoading] = useState(true);

  if (!userState.token) {
    return <Navigate to={"/login"} />;
  }

  useEffect(() => {
    const fetchIsProfessor = async () => {
      try {
        const res = await useIsType(userState.token, type);
        setIsProfessor(res.status);
        setLoading(false);
      } catch (error) {
        setIsProfessor(false);
        setLoading(false);
      }
    };

    fetchIsProfessor();
  }, []);

  return children; // Mostrar el contenido si el usuario es administrador
};
export const VerifyType = ({ children }) => {
  const userState = useSelector((Store) => Store.user);
  const [type, setType] = useState(null);
  const [loading, setLoading] = useState(true);
  if (!userState.token) {
    return children;
  }

  useEffect(() => {
    const fetchType = async () => {
      try {
        const res = await useGetType(userState.token);
        if (res.status) {
          setType(res.response);
        } else {
          setType("ERROR");
        }
        setLoading(false);
      } catch (error) {
        setType(false);
        setLoading(false);
      }
    };

    fetchType();
  }, []);

  if (loading) {
    return <>Cargando</>; // Mostrar un componente de carga mientras se realiza la consulta
  }
  if (type === "PROFESOR") {
    return <Navigate to={"/professor"} />;
  } else if (type === "HEAD") {
    return <Navigate to={"/admin"} />;
  } else if (type === "RECTOR") {
    return <Navigate to={"/rector"} />;
  } else {
    return children;
  }
};

export default {
  ProtectedPathAdmin,
  ProtectedLogin,
  ProtectedPathProfessor,
  VerifyType,
};
