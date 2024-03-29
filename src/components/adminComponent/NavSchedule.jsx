import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { NavLink } from 'react-router-dom';
import NavSemester from './NavSemester';

const NavSchedule = ({show, options = [], plan = ""}) => {
  return (
    <div className="flex items-center justify-between shadow border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Gestion de semestre <span className="font-medium">1</span> a <span className="font-medium">10</span> - {plan}
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <NavLink
              
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </NavLink>
            <NavSemester semesters={options} number = {show} />
            <NavLink
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default NavSchedule;