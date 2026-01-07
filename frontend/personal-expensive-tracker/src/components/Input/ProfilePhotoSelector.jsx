import React, { useRef, useState } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Handle file selection and generate preview URL
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  // Trigger hidden file input click
  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className='flex justify-center mb-6'>
      {/* Hidden file input */}
      <input 
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className='hidden' 
      />

      {/* Default avatar if no image selected */}
      {!image ? (
        <div className='w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative'>
          <LuUser className='text-4xl text-primary'/>
          <button 
            type='button'
            className='w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1'
            onClick={onChooseFile}
          >
            <LuUpload/>
          </button>
        </div>
      ) : (
        // Show preview image with remove button
        <div className='relative'>
          <img 
            src={previewUrl}
            alt="Profile Picture"
            className='w-20 h-20 rounded-full object-cover'
          />
          <button
            type='button'
            className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1'
            onClick={handleRemoveImage}
          >
            <LuTrash/>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
