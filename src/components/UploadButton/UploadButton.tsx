import React from 'react';

import { AiOutlineCamera } from 'react-icons/ai';

interface UploadButtonProps {
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  image?: string | unknown
}

const UploadButton: React.FC<UploadButtonProps> = ({ onInput, image }) => {
  console.log(image)
  return (
    <>
      <label htmlFor="avatar">
        <AiOutlineCamera className='w-50px h-50px' />
        <input type="file" hidden id="avatar" onChange={onInput} />
      </label>
    </>

  )
}

export default UploadButton