import { useRef, useState } from 'react';
import ButtonOnSubmit from '../../components/Button';
import { useNavigate } from 'react-router';
import {useLogin} from '../../hooks/useLogin';
import { useDispatch } from 'react-redux';
import {createUser} from "../../app/state/user";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({}); // In this state is save the data to login 
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const email = useRef(); 
  const password = useRef();
  //This function save the input
  const whitten = (refInput) => {
    setLoginData(
      {
        ...loginData,
        [refInput.current.name]: refInput.current.value
      }
    );
  }  
  //This function call to the api
  const loginAction = async (e) => {
    e.preventDefault();
    try {
      const res = await useLogin(loginData);  
      console.log(res);
      if(res.status){
        const { response } = res;
        dispatch(createUser({"token": response}));
        window.location.href = '/admin';
      }
      setAlert(true);
      setAlertText(res.response);   
    } catch (error) {
      console.log(error);
    }
  }
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
                  Inicia sesion en tu cuenta
                </h2>
              </div>
              {alert?(<p className='text-center'>{alertText}</p>):
               (<></>)}
              <form action='/admin' className="mt-8 space-y-6">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label htmlFor="email-address" className="sr-only ">
                      E-mail
                    </label>
                    <input
                      id="email-address"
                      name="correo"
                      type="email"
                      autoComplete="email"
                      required 
                      ref={email}
                      onChangeCapture ={() => whitten(email)} 
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
                      onChangeCapture ={() => whitten(password)} 
                      className="relative block w-full rounded-b-md border-0 py-1.5 
                      text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                      focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Recordar
                    </label>
                  </div>
    
                  <div className="text-sm">
                    <a href='/recover' className="font-medium text-indigo-600 hover:text-indigo-500">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                </div>
                <ButtonOnSubmit  actions = {{start: "Iniciar sesion",on:loginAction}} />
              </form>
            </div>
          </div>
        </>
        )
}

export default LoginPage;