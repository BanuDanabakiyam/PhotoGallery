import React, { useState } from "react";
import "./modal.css";
import axios from 'axios';
import { AddPhoto } from "../AddPhoto";
import CloseIcon from '@mui/icons-material/Close';

export const Modal = () => {
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
      console.log("Inside handleSubmit")
      const response = await axios.post('http://localhost:8000/photos', {
        photographerName,
        photoURL,
        description,
        isLiked: false
      });
      console.log(response.data);
      toggleModal();
      inputClear();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const inputClear = () => {
    setPhotographerName('');
    setPhotoURL('');
    setDescription('');
  };

  return (
    <>
      <AddPhoto onClick={toggleModal}/>
      {modal && (
        <div className="modal">
          <div className="modal-content">
            <form>
              <div>
                <label className="modal-Label">Photographer Name</label>
                <input type="text" value={photographerName} onChange={(e) => setPhotographerName(e.target.value)} />
              </div>
              <div>
                <label className="modal-Label">Photo URL</label>
                <input type="text" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
              </div>
              <div>
                <label className="modal-Label">Description</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div>
                <button className="up-Btn" type="submit" onClick={handleSubmit}>Upload</button>
              </div>
            </form>
            <CloseIcon className="close-modal" onClick={toggleModal} />
          </div>
        </div>
      )}
    </>
  );
};

