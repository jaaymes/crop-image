import React from 'react'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { BiRotateRight, BiRotateLeft } from 'react-icons/bi';

interface ModalImageProps {
  onClose: () => void
  isOpen: boolean
  image?: string | unknown
  setCropData: React.Dispatch<React.SetStateAction<string>>;
}

const ModalImage: React.FC<ModalImageProps> = ({ onClose, isOpen, image, setCropData }) => {
  const imageRef = React.createRef<ReactCropperElement>();
  const [cropper, setCropper] = React.useState<any>();

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const handleClose = () => {
    onClose()
    getCropData()
  }

  const rotateForward = () => {
    if (imageRef) {
      imageRef.current?.cropper.rotate(90);
    }
  }

  const rotateForwardBack = () => {
    if (imageRef) {
      imageRef.current?.cropper.rotate(-90);
    }
  }

  return (
    <Modal show={isOpen} centered onHide={onClose}>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body style={{ width: "100%", display: 'flex', flexDirection: 'column' }}>
        <Cropper
          // dragMode='move'
          style={{ height: 400, width: "100%" }}
          initialAspectRatio={1}
          preview=".img-preview"
          // @ts-ignore
          src={image}
          ref={imageRef}
          viewMode={1}
          guides={true}
          aspectRatio={16 / 4}
          // minCropBoxHeight={10}
          // minCropBoxWidth={10}
          background={false}
          responsive={true}
          checkOrientation={false}
          rotatable={true}
          onInitialized={(instance) => setCropper(instance)}
        />
        <div className='d-flex w-100 justify-content-center gap-4'>
          <BiRotateLeft className='w-30px h-30px text-primary' onClick={rotateForwardBack} />
          <BiRotateRight className='w-30px h-30px text-primary' onClick={rotateForward} />
        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Sair
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Salvar e Sair
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalImage