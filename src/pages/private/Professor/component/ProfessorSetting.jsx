import React, { useState } from "react";

const ProfessorSetting = ({ onSave, onCancel, selectedBlock, setIsSettingModalOpen }) => {
  const [confirmation, setConfirmation] = useState("");

  const handleSave = () => {
    // Construir el objeto con los datos del bloque horario disponible
    const availabilityData = {
      timeSlot: selectedBlock.timeSlot, // Hora del bloque
      dayOfWeek: selectedBlock.dayOfWeek, // Día de la semana
      confirmation: confirmation, // Confirmación del profesor
    };
  
    // Enviar los datos al padre para guardar en la base de datos
    onSave(availabilityData);
  
  
    // Cerrar el modal y limpiar el estado de confirmación
    setIsSettingModalOpen(false);
    setConfirmation("");
  };

  const handleCancel = () => {
    // Cerrar el modal sin guardar cambios
    onCancel();
    setIsSettingModalOpen(false);
  };

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" onClick={handleCancel}></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8">
            <div className="bg-white py-4 px-6">
              <div className="mb-6">
                <h2>
                  ¿Está seguro que desea confirmar disponibilidad para el bloque
                  de {selectedBlock.timeSlot} el día {selectedBlock.dayOfWeek}?
                </h2>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-700 cursor-pointer"
                >
                  Confirmar
                </button>

                <button
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-900 rounded-md px-4 py-2 hover:bg-gray-400 cursor-pointer ml-4"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorSetting;