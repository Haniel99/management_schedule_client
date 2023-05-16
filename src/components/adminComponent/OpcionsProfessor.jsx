
const OpcionsAdmin = ({option, nameButton}) => {
    const addProfessor = ()=>{
        option(true);
    }

    const showProfessors = () => {
        option(false);
    }
    return (
        <div className="flex gap-4">
            <div>
                <button onClick={addProfessor} className='button'>Estadisticas de {nameButton}</button>
            </div>
            <div>
                <button onClick={showProfessors} className='button'>Agregar {nameButton}</button>               
            </div>
        </div>
    );
}

export default OpcionsAdmin;