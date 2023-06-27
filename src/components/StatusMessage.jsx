import React from 'react';

const StatusMessage = ({ isSuccess, message }) => {
  const baseClasses = 'px-4 py-2 rounded-lg';
  const successClasses = 'bg-green-500 text-white';
  const errorClasses = 'bg-red-500 text-white';

  const statusClasses = isSuccess ? successClasses : errorClasses;

  return (
    <div className={`${baseClasses} ${statusClasses} w-full`}>
      {message}
    </div>
  );
};

export default StatusMessage;
