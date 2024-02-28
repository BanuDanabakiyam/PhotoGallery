import React, { useState, useEffect } from "react";
import "./modal.css";
import { AddPhoto } from "../AddPhoto";
import CloseIcon from '@mui/icons-material/Close';


const Modal = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (modal) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }
  }, [modal]);

  return (
    <>
            <AddPhoto onClick={toggleModal}/>

      
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <div>
            <label className="modal-Label">Photographer Name</label>
            <input type="text"/>
            </div>
            <div>
            <label className="modal-Label">Photo URL</label>
            <input type="text"/>
            </div>
            <div>
            <label className="modal-Label">Location</label>
            <input type="text"/>
            </div>
            <div>
            <button className="up-Btn">Upload</button>
            </div>
            <CloseIcon className="close-modal" onClick={toggleModal}/>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
