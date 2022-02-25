import React, { useRef, useState } from "react";

import { Slider, Box, SvgIcon, Typography } from "@mui/material";
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import { styled, useTheme } from "@mui/material/styles";

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.5,
    fontWeight: 500,
    letterSpacing: 0.2,
    color: "white"
});

const MusicPlayer = (props) => {
    //Detecting and refering to the DOM audio tag
    const audioRef = useRef(null);

    //State for the audio condition 
    const [isPlaying, setIsPlaying] = useState(false)

    //Material UI Theme Provider
    const theme = useTheme()

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

    const [sliderChange, setSliderChange] = useState(false)
    //Getting and setting audio data
    function getUpdatedTime() {
        if (!sliderChange) {
            setCurrentTime(audioRef.current.currentTime);
        } else {
            audioRef.current.currentTime = currentTime;
            setSliderChange(false)
        };
        setMaxPosition(audioRef.current.duration);
        setDuration(formatDuration(audioRef.current.duration - currentTime));
    };

    return <Box sx={{
        width: '250px',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20px'
    }}>
        <audio id={props.slug} src={props.audioSrc} onLoadedData={getUpdatedTime}
            onTimeUpdate={getUpdatedTime} onEnded={() => {setIsPlaying(false)}}
            ref={audioRef} preload='auto'/>
        <Box sx={{
            position: 'relative',
            width: '230px',
            height: '230px',
        }}>
            <Box component="img"
                sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '10px'
                }}
                src={props.imgSrc}
                alt="Capa do Album" />
            <Box sx={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Box sx={{
                    width: '30%',
                    height: '30%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    border: 'solid 1px white',
                    borderRadius: '50%',
                    cursor: 'pointer'
                }}>
                    {isPlaying && props.isCurrent ? (
                        <SvgIcon component={PauseRounded}
                            sx={{ color: 'white', fontSize: '55px' }}
                            onClick={() => {
                                setIsPlaying(false)
                                props.togglePlay(props.slug, props.index)
                            }}
                        />
                    ) : (
                        <SvgIcon component={PlayArrowRounded}
                            sx={{ color: 'white', fontSize: '55px' }}
                            onClick={() => {
                                setIsPlaying(true)
                                props.togglePlay(props.slug, props.index)
                            }}
                        />
                    )
                    }
                </Box>
            </Box>
        </Box>
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            mt: 1.5
        }}>
            <TinyText>{formatDuration(currentTime)}</TinyText>
            <Slider
                aria-label="time-indicator"
                size="small"
                value={currentTime}
                min={0}
                step={1}
                max={maxPosition}
                onChange={(_, value) => {
                    setSliderChange(true);
                    setCurrentTime(value);
                    setDuration(formatDuration(audioRef.current.duration - currentTime));
                }}
                sx={{
                    color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(255,255,255,0.87)',
                    height: 4,
                    width: '70%',
                    '& .MuiSlider-track': {
                        border: 'none',
                        color: '#ff4834',
                    },
                    '& .MuiSlider-thumb': {
                        width: 6,
                        height: 6,
                        transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                        color: '#ff4834',
                        '&:before': {
                            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                        },
                        '&:hover, &.Mui-focusVisible': {
                            boxShadow: `0px 0px 0px 8px ${theme.palette.mode === 'dark'
                                ? 'rgb(255 255 255 / 16%)'
                                : 'rgb(0 0 0 / 16%)'
                                }`,
                        },
                        '&.Mui-active': {
                            width: 10,
                            height: 10,
                        },
                    },
                    '& .MuiSlider-rail': {
                        opacity: 0.28,
                    },
                }}
            />
            <TinyText>-{duration}</TinyText>
        </Box>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
        }}>
            <Typography variant="body1">
                {props.title}
            </Typography>
            <Typography variant="caption" sx={{ mt: '-2px' }}>
                {props.artistsNames}
            </Typography>
        </Box>
    </Box >
};

export default MusicPlayer;