import React, { useEffect, useState } from "react";
// import image1 from '../image/image1.jpg';
// import image2 from '../image/image2.jpg';
// import image3 from '../image/image3.jpg';
// import image4 from '../image/image4.jpg';
// import image5 from '../image/image5.jpg'
import '../gallery/Gallery.css'
import CloseIcon from '@mui/icons-material/Close';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import axios from "axios";
import { Filter } from "../filter/Filter";
import { Sort } from "../sort/Sort";

export const Gallery = () => {
    // let imageData = [
    //     {
    //         id: 1,
    //         imgsrc: image1,
    //         description: 'Hippos are large semi-aquatic mammals, with a large barrel-shaped body, short legs, a short tail and an enormous head! They have greyish to muddy-brown skin, which fades to a pale pink colour underneath',
    //         photographerName: 'Ansel Adams'
    //       },
    //       {
    //         id: 2,
    //         imgsrc: image2,
    //         description: 'High elevations on mountains produce colder climates than at sea level at similar latitude. These colder climates strongly affect the ecosystems of mountains: different elevations have different plants and animals.',
    //         photographerName: 'Dorothea Lange'
    //       },
    //       {
    //         id: 3,
    //         imgsrc: image3,
    //         description: 'There are lots of places to look if you want to see impressive photos of nature.',
    //         photographerName: 'Henri Cartier Bresson'
    //       },
    //       {
    //         id: 4,
    //         imgsrc: image4,
    //         description: 'Fog is a cloud that touches the ground. Fog can be thin or thick, meaning people have difficulty seeing through it. In some conditions, fog can be so thick that it makes it hard to drive safely because it obscures the road and other cars.',
    //         photographerName: 'John Paul'
    //       },
    //       {
    //         id: 5,
    //         imgsrc: image5,
    //         description: 'Atmosphere of this picture is positive as people are smiling.',
    //         photographerName: 'John Paul'
    //       }
    //     ];
    const [imageData,setImageData] = useState([]);  
    const [filteredImage,setFilteredImage] = useState([]); 
    const [sortedImage,setSortedImage] = useState([]);
    const [itemImage,setItemImage] = useState(false);
    const [tempImgSrc,setTempImgSrc] = useState('');
    const [filterActive,setFilterActive] = useState(true);
    const [sortActive,setSortActive] = useState(false);
    const [liked,setLiked] = useState({});

    useEffect(() => {
        console.log("Inside useEffect")
        axios.get('http://localhost:8000/getPhotos')
        .then(res => {
            console.log(res.data);
            setImageData(res.data);

            // isLiked reflect in UI based on DB
            const initialLikedState ={};
            res.data.forEach(item => {
                initialLikedState[item._id] = item.isLiked;
            });
            setLiked(initialLikedState);
            setFilteredImage(res.data);
            setSortedImage(res.data);
    })
        .catch(err => console.log("Error: " ,err))
    },[])

    const getImage =(photoURL) => {
        setTempImgSrc(photoURL);
        setItemImage(true);

    }
    const closeImage = () => {
        setItemImage(false);
    }

    const handleLikeButton =(id) => {
        console.log("Liked image!!!!");
        
        setLiked((prevLike) => {
            console.log("Inside liked Status");
            const newLikedImages = {...prevLike};
            newLikedImages[id] = !newLikedImages[id];
            axios.put(`http://localhost:8000/updateLikeStatus/${id}`,{
                isLiked: newLikedImages[id]
            })
            .then(res =>{ console.log(res.data);})
            .catch(err => {console.error(err)});
            console.log("isLiked",newLikedImages[id]);

            return newLikedImages;
});
    }
return (
        <>
        <Filter imageData = {imageData} setFilteredImage={setFilteredImage} setFilterActive={setFilterActive} setSortActive={setSortActive}/>
        <Sort   imageData = {imageData} setSortedImage={setSortedImage}     setSortActive={setSortActive}     setFilterActive={setFilterActive}/>

        <div className="gallery-wrapper">
            <div className="grid-container">
                {filterActive && filteredImage.map((item) => (
                    <div className="pics" key={item._id} onClick={() => getImage(item.photoURL)}>
                        <img src={item.photoURL} alt=""  />
                        <div className="like" style={{color: liked[item._id] ? 'blue' : 'white'}} onClick={(e) => {e.stopPropagation();
                            handleLikeButton(item._id)}}>
                                <ThumbUpAltIcon/>
                            </div>
                            <div className="photographer">{item.photographerName}</div>

                            <div className="description">{item.description}</div>
             </div>
                ))}
                  {sortActive && sortedImage.map((item) => (
                    <div className="pics" key={item._id} onClick={() => getImage(item.photoURL)}>
                        <img src={item.photoURL} alt=""  />
                        <div className="like" style={{color: liked[item._id] ? 'blue' : 'white'}} onClick={(e) => {e.stopPropagation();
                            handleLikeButton(item._id)}}>
                                <ThumbUpAltIcon/>
                            </div>
                            <div className="photographer">{item.photographerName}</div>

                            <div className="description">{item.description}</div>
             </div>
                ))}
                
            </div>
             {
                itemImage && (
                    <div className="modal">
                        <span className="close" onClick={closeImage}>
                            <CloseIcon/>
                        </span>
                        <img className="modal-content" alt="" src={tempImgSrc}></img>
                    </div>
                )
            }
        </div>
        </>
    );
};
