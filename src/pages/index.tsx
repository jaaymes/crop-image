import React from 'react';
import type { NextPage } from 'next'
import Image from 'next/image';


import { convertBase64 } from '../utils/convertBase65';
import ModalImage from '../components/Modal';
import UploadButton from '../components/UploadButton';

const Home: NextPage = () => {
  const [image, setImage] = React.useState<string | unknown>(null)
  const [show, setShow] = React.useState(false);
  const [cropData, setCropData] = React.useState<string | unknown>(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangeLogo = React.useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files) {
      const previewImage = e.target.files[0]

      const image = await convertBase64(previewImage)

      setImage(image)
      handleShow()
    }
  }, [])

  return (
    <>
      <div className='w-100 d-flex mt-4 justify-content-center'>
        <UploadButton onInput={handleChangeLogo} image={image} />
        <ModalImage onClose={handleClose} isOpen={show} image={image} setCropData={setCropData} />
      </div>

      {cropData && (
        <div className='w-100 d-flex mt-4 justify-content-center'>
          <Image width={400} height={150} src={String(cropData)} alt="cropped" />
        </div>
      )}

    </>

  )
}

export default Home
