import { LockClosedIcon } from '@heroicons/react/20/solid';
const ButtonOnSubmit = (props) => {
    return (
        <div>
            <button
            type='submit'
            onClick={props.actions.on}
            className="group button  " 
            >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
            {props.actions.start}
            </button>
        </div>
    )
}


export default ButtonOnSubmit;