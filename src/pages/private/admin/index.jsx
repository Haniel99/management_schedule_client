import React from 'react';
import { adminElements } from '../../../utils/DataForNav';
import { adminExit } from '../../../utils/DataForNav';
import ManageSchedule from './ManageSchedule';
import { 
    Route
} from 'react-router-dom';
import Navbar from '../../../components/adminComponent/NavBar';
import RouteNotFount from '../../../utils/routeNotFoud';
import Professor from './Professors';
import Subjects from "./Subjects";
import ClassRooms from './ClassRooms';

const Admin = () => {
    return (
        <div className='w-full h-screen
        object-cover flex'>
        <div className='flex flex-col h-screen w-auto line-clamp-1 bg-rose-700'>
            <Navbar items={adminElements} exit={adminExit}/>
        </div> 
        <RouteNotFount>
            <Route index element = {<></>} />
            <Route path='/inicio' element = {<></>} />
            <Route path='/gestion' element = {<ManageSchedule/>} />
            <Route path='/profesores' element = {<Professor/>} />
            <Route path='/asignaturas' element = {<Subjects/>} />
            <Route path='/salas' element = {<ClassRooms/>} />
            <Route path='/salir' element = {<></>} />
        </RouteNotFount>
        </div>
    )
}

export default Admin;