import React, { useState, useRef } from "react";

import { Box, Typography } from "@mui/material";

const PlaylistTrackItem = (props) => {
    //Getting the songs durations
    const playlistItemRef = useRef(null);
    
    const [songDuration, setSongDuration] = useState(0)
    
    function getSongDuration() {
        setSongDuration(props.formatDuration(playlistItemRef.current.duration));
    };

    return <Box sx={{
            width: '95%',
            padding: '6px',
            color: 'white',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'nowrap',
        }}>
            <audio src={props.src} ref={playlistItemRef} onLoadedData={getSongDuration}></audio>
            <Box
                sx={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '5px',
                }}>
                <Box component="img"
                    src={props.imgSrc}
                    sx={{
                        width: '100%',
                        heigth: '100%',
                        borderRadius: '5px'
                    }} />
            </Box>
            <Box sx={{
                color: 'white',
                marginLeft: '18px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%',
            }}>
                <Typography variant="subtitle1" 
                sx={props.currentSongIndex == props.track.id - 1 ? {
                    color: 'red'
                } : {
                    color: 'white'
                }}>
                    {props.title}
                </Typography>
                <Typography variant="caption" 
                sx={props.currentSongIndex == props.track.id - 1 ? {
                    color: 'red'
                } : {
                    color: 'white'
                }}>
                    {props.artists}
                </Typography>
            </Box>
            <Typography variant="caption"
                sx={{
                    marginLeft: 'auto',
                    textAlign: 'right',
                    lineHeight: 2
                }}>
                {songDuration}
            </Typography>
        </Box>
};

export default PlaylistTrackItem;