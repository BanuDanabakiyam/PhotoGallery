import React from "react";
import { useState } from "react";
import SortIcon from '@mui/icons-material/Sort';
import { IconButton, Menu, MenuItem, FormControlLabel, RadioGroup, Radio } from "@mui/material";

export const Sort = ({imageData,setSortedImage,setSortActive,setFilterActive}) => {
    const [anchorEl, setAnchorEl] = useState('');
    const [selectedSorting, setSelectedSorting] = useState('');
    
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setSortActive(true);
        setFilterActive(false);
        setSelectedSorting('');

    };

    const handleClose = () => {
        setSortActive(false);
        setFilterActive(true);
        setAnchorEl('');

    };
    const handleSortingChange = (event) => {
        console.log("Before sorted image ",imageData);
        console.log("Inside sorting")
        setSelectedSorting(event.target.value);
        setAnchorEl(''); 
        let sortedData = [...imageData];
        if(event.target.value === "Time") {
            console.log("Time")
            sortedData.sort((a,b) => new Date(a.createdTime) - new Date(b.createdTime));
        }else if(event.target.value === "Name") {
            console.log("Name")
            sortedData.sort((a,b) => {
                const upperNameA = a.photographerName.toUpperCase();
                const upperNameB= b.photographerName.toUpperCase();
                if(upperNameA < upperNameB) return -1;
                if(upperNameA > upperNameB) return 1;
                return 0;
            })
        } else if (event.target.value === "Favourite") {
            console.log("Liked")
            sortedData = imageData.filter(item => item.isLiked === true);
        } 
        console.log("After SortedData : " , sortedData);
        setSortedImage(sortedData);
    }

    return(
        <>
            <IconButton onClick={handleClick}>
                <SortIcon/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <RadioGroup value={selectedSorting} onChange={handleSortingChange} >
                
                    <MenuItem>
                        <FormControlLabel value="Time" control={<Radio />} label="Time" />
                    </MenuItem>
                    <MenuItem>
                        <FormControlLabel value="Name" control={<Radio />} label="Name" />
                    </MenuItem>
                    <MenuItem>
                        <FormControlLabel value="Favourite" control={<Radio />} label="Favourite" />
                    </MenuItem>
                    
                </RadioGroup>
            </Menu>
            
        </>
    );
}