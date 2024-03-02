import React from "react";
import '../button/AddPhoto.css';

export const AddPhoto = ({onClick}) => {
    return(
        <>
         <button  onClick={onClick} className="photoBtn">Add Photo</button>
        </>
    );

}