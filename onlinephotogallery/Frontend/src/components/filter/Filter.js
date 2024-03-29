import React, { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import { IconButton, Menu, MenuItem, FormControlLabel, RadioGroup, Radio } from "@mui/material";


export const Filter = ({imageData,setFilteredImage,setFilterActive,setSortActive}) => {
    const [anchorEl, setAnchorEl] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('');
    
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setFilterActive(true);
        setSelectedFilter('');
        setSortActive(false);
    };

    const handleClose = () => {
        setFilterActive(false);
        setAnchorEl('');
        setSortActive(true);

    };

    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value);
        setAnchorEl(''); 
        let filteredData = [...imageData];
        if(event.target.value === "All") {
            filteredData = imageData;
        }else if(event.target.value === "Name") {
            filteredData.sort((a,b) => {
                const upperNameA = a.photographerName.toUpperCase();
                const upperNameB= b.photographerName.toUpperCase();
                if(upperNameA < upperNameB) return -1;
                if(upperNameA > upperNameB) return 1;
                return 0;
            })
        } else if (event.target.value === "Liked") {
            filteredData = imageData.filter(item => item.isLiked === true);
        } else if (event.target.value === "unLiked") {
            filteredData = imageData.filter(item => item.isLiked === false);
        } 
        setFilteredImage(filteredData);
    };

    return (
        <>
            <IconButton onClick={handleClick} >
                <FilterListIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <RadioGroup value={selectedFilter} onChange={handleFilterChange}>
                    <MenuItem>
                        <FormControlLabel value="All" control={<Radio />} label="All" />
                    </MenuItem>
                    <MenuItem>
                        <FormControlLabel value="Name" control={<Radio />} label="Name" />
                    </MenuItem>
                    <MenuItem>
                        <FormControlLabel value="Liked" control={<Radio />} label="Liked" />
                    </MenuItem>
                    <MenuItem>
                        <FormControlLabel value="unLiked" control={<Radio />} label="UnLiked" />
                    </MenuItem>
                </RadioGroup>
            </Menu>
         </>
    );
};
