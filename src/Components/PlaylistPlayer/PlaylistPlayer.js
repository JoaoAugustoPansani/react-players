import React, { useState, useRef, useEffect } from "react";

import PlayerControls from "./PlayerControls";
import { Box, Typography } from "@mui/material";
import PlaylistTrackItem from "./PlaylistTrackItem";

const PlaylistPlayer = (props) => {
    //Detecting and refering to the DOM audio tag
    const audioElement = useRef(null);
    //State for the audio condition 
    const [isPlaying, setIsPlaying] = useState(false)
    //Setting current song array position (returns a number)
    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    useEffect(() => {

        if (isPlaying) {
            audioElement.current.play();
        } else {
            audioElement.current.pause();
        }
    });

    //Skip Song Handler
    const skipSong = (fowards = true) => {
        if (fowards) {
            setCurrentSongIndex(() => {
                let temp = currentSongIndex;
                temp++

                if (temp > props.tracks.length - 1) {
                    temp = 0;
                }

                return temp;
            })
        }
        //Return song handler
        else {
            setCurrentSongIndex(() => {
                let temp = currentSongIndex;
                temp--;

                if (temp < 0) {
                    temp = props.tracks.length - 1;
                }

                return temp;

            });
        }
    };

    //Formatting Duration To mm:ss
    function formatDuration(value) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${Math.round(secondLeft) <= 9 ? `0${Math.round(secondLeft)}` : (Math.round(secondLeft))}`;
    };

    // Audio current time and duration handlers
    const [duration, setDuration] = useState();

    //Progressbar handlers
    const [currentTime, setCurrentTime] = useState(0)
    const [maxPosition, setMaxPosition] = useState(200);
    //State for detect if slider changes (returns boolean)
    const [sliderChange, setSliderChange] = useState(false)
    //Getting, setting and handling audio data
    function getUpdatedTime() {
        if (!sliderChange) {
            setCurrentTime(audioElement.current.currentTime);
        } else {
            audioElement.current.currentTime = currentTime;
            setSliderChange(false)
        };
        setMaxPosition(audioElement.current.duration);
        setDuration(audioElement.current.duration - currentTime);
    };

    //Mapping the playlist props.tracks
    const playlistTrackMap = props.tracks.map(track =>
        <PlaylistTrackItem key={track.id}
            src={track.src}
            imgSrc={track.img_src}
            title={track.title}
            artists={track.artist_names}
            track={track}
            formatDuration={formatDuration}
            currentSongIndex={currentSongIndex}
        />
    );


    return <Box sx={{
        maxWidth: '600px',
        maxHeight: '500px',
        margin: '20px auto',
        padding: '20px 0px',
    }}>
        <Typography variant="h4" sx={{
            color: 'white', fontWeight: 'bold', marginBottom: '30px'
            }}>
        Playlist Player
        </Typography>
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            paddingBottom: '20px',
        }}>
            <audio src={props.tracks[currentSongIndex].src}
                onLoadedData={getUpdatedTime} onTimeUpdate={getUpdatedTime} ref={audioElement}
                onEnded={() => {
                    skipSong();
                    setCurrentTime(0);
                }}></audio>
            <Box sx={{
                width: '168px',
                height: '168px',
                borderRadius: '15px',
            }}>
                <Box component="img"
                    src={props.tracks[currentSongIndex].img_src}
                    sx={{
                        width: '168px',
                        height: '168px',
                        borderRadius: '15px',
                    }} />
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '20px',
                position: 'relative',
                width: '100%'
            }}>
                <Typography variant="h5"
                    sx={{ color: "white" }} >
                    {props.tracks[currentSongIndex].title}
                </Typography>
                <Typography variant="body2"
                    sx={{ color: 'white' }}>
                    {props.tracks[currentSongIndex].artist_names}
                </Typography>
                <PlayerControls
                    audioElement={audioElement}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    skipSong={skipSong}
                    duration={duration}
                    setDuration={setDuration}
                    currentTime={currentTime}
                    setCurrentTime={setCurrentTime}
                    sliderChange={sliderChange}
                    setSliderChange={setSliderChange}
                    maxPosition={maxPosition}
                    formatDuration={formatDuration}
                />
            </Box>
        </Box>
        <Box sx={{
            width: '100%',
            display: 'flex',
            maxHeight: '180px',
            overflow: 'scroll',
            '&::-webkit-scrollbar': {
                display: "none"
            },
        }}>
            <Box sx={{
                marginTop: '65px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {playlistTrackMap}
            </Box>
        </Box>
    </Box >
};

export default PlaylistPlayer;