import React, { useState } from "react";

const ProfessorSetting = ({ onSave, onCancel }) => {
  const [subject, setSubject] = useState("");
  const [room, setRoom] = useState("");
  const [professor_name, setProfessorName] = useState("");
  const [professor_last_name, setProfessorLastName] = useState("");
  const [group, setGroup] = useState("");

  const handleSave = () => {
    onSave({
      subject,
      room,
      professor_name,
      professor_last_name,
      group,
    });
    // Limpiar los campos después de guardar
    setSubject("");
    setRoom("");
    setProfessorName("");
    setProfessorLastName("");
    setGroup("");
  };

  return (
    
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity"></div>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl 
                    transition-all sm:my-8">
                    <div className="bg-white py-4 px-6">
                        <h2 className="text-center text-2xl font-bold text-gray-900">Ingrese los datos</h2>
                        <div>
                        </div>
                        <div class="grid gap-6 mb-6 lg:grid-cols-2">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-black-900 dark:text-black-300" htmlFor="subject">
                                Nombre de la asignatura:
                                </label>
                                <input 
                                    type="text" 
                                    id="subject"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                                    placeholder="Nombre de la asignatura"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-black-900 dark:text-black-300" htmlFor="group">
                                Grupo de la asignatura:
                                </label>
                                <select 
                                id="group"
                                value={group}
                                onChange={(e) => setGroup(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option>A</option>
                                    <option>B</option>
                                    <option>C</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-black-900 dark:text-black-300" htmlFor="professor-name">
                                Nombre Profesor:
                                </label>
                                <input 
                                    type="text" 
                                    id="professor-name" 
                                    value={professor_name}
                                    onChange={(e) => setProfessorName(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                                    placeholder="Nombre del profesor"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-black-900 dark:text-black-300" htmlFor="professor-last-name">
                                Apellido Profesor:
                                </label>
                                <input 
                                    type="text" 
                                    id="professor-last-name" 
                                    value={professor_last_name} 
                                    onChange={(e) => setProfessorLastName(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                                    placeholder="Apellido del Profesor"
                                    required
                                />
                            </div>
                        </div>
                        <div class="mb-6">
                            <label className="block mb-2 text-sm font-medium text-black-900 dark:text-black-300" htmlFor="room">
                                Sala:
                                </label>
                                <select 
                                id="room"
                                value={room}
                                onChange={(e) => setRoom(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option>Licancabur</option>
                                    <option>Socompa</option>
                                    <option>Azufre</option>
                                    <option>Guallatire</option>
                                    <option>Parinacota</option>
                                    <option>Pomerape</option>
                                    <option>Auditorio</option>
                                </select>
                        </div>

                        <div class="grid gap-6 mb-6 lg:grid-cols-2">
                            <div>
                                <button 
                                type="button"
                                onClick={handleSave}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Guardar
                                </button>
                            </div>
                            <div>
                                <button 
                                type="button"
                                onClick={onCancel}
                                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

  );
};

export default ProfessorSetting;