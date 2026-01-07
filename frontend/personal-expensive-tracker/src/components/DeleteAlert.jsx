import React from 'react';

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div>
      {/* Alert message */}
      <p className='text-sm'>{content}</p>

      {/* Delete button */}
      <div className='flex justify-end mt-6'>
        <button
          type="button"
          className='add-btn add-btn-fill'
          onClick={onDelete} // Trigger deletion
        >
          Delete 
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
