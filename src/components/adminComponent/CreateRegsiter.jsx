import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const CreateLog = ( { to,set }) => {
    const setToggle = () => {
        set(!to);
    }
    return (
        <div className={''}>
            <button className='button' onClick={setToggle} >Crear horario</button>
        </div>
    );
}

export default CreateLog;

  
