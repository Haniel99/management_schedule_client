import { 
  BrowserRouter,  
  Route,
} from 'react-router-dom';
import RouteNotFount from './utils/routeNotFoud';
import { ProtectedPathAdmin, ProtectedPathProfessor,ProtectedLogin, VerifyType } from './utils/protectedPath';
import Login from './pages/public';
import Admin from './pages/private/admin';
import Professor from './pages/private/Professor';
import Rector from './pages/private/Rector';
function App() {
  return (
  <> 
    <BrowserRouter>
    <RouteNotFount>
    <Route index element= {<VerifyType children = {<Login/>} />}/>
    <Route path='/login' element= {<ProtectedLogin children = {<Login/>} />} />
    <Route path='/admin/*' element ={<ProtectedPathAdmin children={<Admin/>} />}/>
    <Route path='/professor/*' element ={<ProtectedPathProfessor type={'professor'} children = {<Professor/>}  />} />
    <Route path='/rector/*' element ={<ProtectedPathProfessor type={'rector'} children = {<Rector/>}  />} />
    </RouteNotFount>
     </BrowserRouter>
  </>
  )
}

export default App
