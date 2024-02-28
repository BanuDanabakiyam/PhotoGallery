import React from "react";
import '../button/AddPhoto.css';
export const AddPhoto = ({onClick}) => {
    return(
        <>
        <button className="photoBtn" onClick={onClick}>Add Photo</button>
        </>
    );

}