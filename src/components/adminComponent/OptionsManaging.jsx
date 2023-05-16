import CreateLog from "./CreateRegsiter";
import ManagementSchedule from "./ManagementSchedule";
const OpcionsManaging = ({dataSemester = [], toggle, set, fn }) => {
    //state for a new calendar 

    return (
        <div className="flex gap-4">
            <CreateLog  to={toggle} set={set}/> 
            {
                dataSemester.length==0?(<></>):
                (<ManagementSchedule fn={fn} data={dataSemester} /> )
            }
        </div>
    )
}

export default OpcionsManaging;
