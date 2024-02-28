import React, { useState } from "react";
import image1 from '../image/image1.jpg';
import image2 from '../image/image2.jpg';
import image3 from '../image/image3.jpg';
import image4 from '../image/image4.jpg';
import '../gallery/Gallery.css'
import CloseIcon from '@mui/icons-material/Close';

export const Gallery = () => {
    let imageData = [
        {
            id:1,
            imgsrc: image1,
        },{
            id:2,
            imgsrc: image2,
        },{
            id:3,
            imgsrc:image3,
        },{
            id:4,
            imgsrc:image4,
        }
    ];

    const [itemImage,setItemImage] = useState(false);
    const [tempImgSrc,setTempImgSrc] = useState('');

    const getImage =(imgsrc) => {
        setTempImgSrc(imgsrc);
        setItemImage(true);

    }
    const closeImage = () => {
        setItemImage(false);
    }

    return (
        <>
        <div className="gallery-wrapper">
            <div className="grid-container">
                {imageData.map((item,index) => (
                    <div className="pics" key={index} onClick={() => getImage(item.imgsrc)}>
                        <img src={item.imgsrc} alt={`Image ${item.id}`}  />
                    </div>
                ))}
            </div>
            {
                itemImage && (
                    <div className="modal">
                        <span className="close" onClick={closeImage}>
                            <CloseIcon/>
                        </span>
                        <img className="modal-content" src={tempImgSrc}></img>
                    </div>
                )
            }
        </div>
        </>
    );
};
