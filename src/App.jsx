import { 
  BrowserRouter, 
  Outlet, 
  Route,
  Routes
} from 'react-router-dom';
import RouteNotFount from './utils/routeNotFoud';
import { useSelector } from 'react-redux'; 
import { ProtectedPath, ProtectedLogin } from './utils/protectedPath';
import Login from './pages/public';
import Rector from './pages/private/Rector';
import Professor from './pages/private/Professor';
import Admin from './pages/private/admin';
function App() {
  return (
  <> 
    <BrowserRouter>
    <RouteNotFount>
    <Route path='/login' element= {<Login/>} />
    <Route path='/admin/*' element ={<Admin/>}/>
    </RouteNotFount>
     </BrowserRouter>
  </>
  )
}

export default App
