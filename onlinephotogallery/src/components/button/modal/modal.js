import React, { useState, useEffect } from "react";
import "./modal.css";
import axios from 'axios';
import { AddPhoto } from "../AddPhoto";
import CloseIcon from '@mui/icons-material/Close';


const Modal = () => {
  const [modal, setModal] = useState(false);
  const [photographerName, setPhotographerName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [description, setDescription] = useState('');


  const toggleModal = () => {
    setModal(!modal);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/images', {
        photographerName,
        photoURL,
        description
      });
      console.log(response.data);
      toggleModal();
    } catch (error) {
      console.error('Error:', error);
    }
  };


  // useEffect(() => {
  //   if (modal) {
  //     document.body.classList.add('active-modal');
  //   } else {
  //     document.body.classList.remove('active-modal');
  //   }
  // }, [modal]);

  return (
    <>
            <AddPhoto onClick={toggleModal}/>

      
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
            <div>
            <label className="modal-Label">Photographer Name</label>
            <input type="text" value={photographerName} onChange={(e) => setPhotographerName(e.target.value)}/>
            </div>
            <div>
            <label className="modal-Label">Photo URL</label>
            <input type="text" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)}/>
            </div>
            <div>
            <label className="modal-Label">Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <div>
            <button className="up-Btn">Upload</button>
            </div>
            </form>
            <CloseIcon className="close-modal" onClick={toggleModal}/>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
