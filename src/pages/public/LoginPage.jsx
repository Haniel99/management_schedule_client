import React, { useRef, useState } from "react";
import ButtonOnSubmit from "../../components/Button";
import { useLogin } from "../../hooks/useLogin";
import { useDispatch } from "react-redux";
import { createUser } from "../../app/state/user";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({});
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [type, setType] = useState("Jefe de carrera");
  const email = useRef();
  const password = useRef();

  const whitten = (refInput) => {
    setLoginData({
      ...loginData,
      [refInput.current.name]: refInput.current.value,
    });
  };

  const handleTypeChange = (selectedType) => {
    setType(selectedType);
  };

  const loginAction = async (e) => {
    e.preventDefault();
    var res;
    try {
      if (type === "Jefe de carrera") {
        res = await useLogin("head", loginData);
        if (res.status) {
          const { response } = res;
          dispatch(createUser({ token: response }));
          window.location.href = "/";
        }
      } else if (type === "Rector") {
        res = await useLogin("rector", loginData);
        if (res.status) {
          const { response } = res;
          dispatch(createUser({ token: response }));
          window.location.href = "/";
        }
      } else {
        res = await useLogin("professor", loginData);
        if (res.status) {
          const { response } = res;
          dispatch(createUser({ token: response }));
          window.location.href = "/";
          return
        }
      }

      setAlert(true);
      setAlertText(res.response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="../../../public/logo_web_uta.png"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Inicia sesión en su cuenta
            </h2>
          </div>
          {alert ? <p className="text-center">{alertText}</p> : <></>}
          <form action="/admin" className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  E-mail
                </label>
                <input
                  id="email-address"
                  name="correo"
                  type="email"
                  autoComplete="email"
                  required
                  ref={email}
                  onChangeCapture={() => whitten(email)}
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="E-mail"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="contrasena"
                  type="password"
                  autoComplete="current-password"
                  required
                  ref={password}
                  onChangeCapture={() => whitten(password)}
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Contraseña"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Recordar
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="/recover"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>
            <ButtonOnSubmit
              actions={{ start: "Iniciar sesión", on: loginAction }}
            />
          </form>
          <div className="text-center">
            <p className="text-lg mb-2">Inicia sesión como</p>
            <div className="flex justify-center">
              <button
                onClick={() => handleTypeChange("Jefe de carrera")}
                className={`rounded-sm py-2 px-3 text-sm font-semibold text-white
                  ${type === "Jefe de carrera" ? "bg-red-700" : "bg-gray-300"}
                  hover:bg-indigo-500 focus-visible:outline 
                  focus-visible:outline-2 focus-visible:outline-offset-2 
                  focus-visible:outline-indigo-600`}
              >
                Jefe de carrera
              </button>
              <button
                onClick={() => handleTypeChange("Rector")}
                className={`rounded-sm py-2 px-3 ml-2 text-sm font-semibold text-white
                  ${type === "Rector" ? "bg-blue-700" : "bg-gray-300"}
                  hover:bg-indigo-500 focus-visible:outline 
                  focus-visible:outline-2 focus-visible:outline-offset-2 
                  focus-visible:outline-indigo-600`}
              >
                Rector
              </button>
              <button
                onClick={() => handleTypeChange("Docente")}
                className={`rounded-sm py-2 px-3 ml-2 text-sm font-semibold text-white
                  ${type === "Docente" ? "bg-green-700" : "bg-gray-300"}
                  hover:bg-indigo-500 focus-visible:outline 
                  focus-visible:outline-2 focus-visible:outline-offset-2 
                  focus-visible:outline-indigo-600`}
              >
                Docente
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
