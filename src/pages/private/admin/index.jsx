import React from 'react';
import ManageSchedule from './ManageSchedule';
import { 
    Route
} from 'react-router-dom';
import Navbar from '../../../components/adminComponent/NavBar';
import RouteNotFount from '../../../utils/routeNotFoud';
import Professor from './Professors';
import Subjects from "./Subjects";
const Admin = () => {
    return (
        <div className='w-full h-screen
        object-cover flex'>
        <div className='flex flex-col h-screen w-auto line-clamp-1 bg-rose-800'>
            <Navbar />
        </div> 
        <RouteNotFount>
            <Route index element = {<>It's index</>} />
            <Route path='/inicio/*' element = {<>It's index</>} />
            <Route path='/gestion/*' element = {<ManageSchedule/>} />
            <Route path='/profesores/*' element = {<Professor/>} />
            <Route path='/asignaturas/*' element = {<Subjects/>} />
        </RouteNotFount>
        </div>
    )
}

export default Admin;