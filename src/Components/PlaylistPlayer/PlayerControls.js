import React, { useState, useEffect } from "react";

import { Slider, SvgIcon } from "@mui/material";
import { Box } from "@mui/system";
import { styled, useTheme } from '@mui/material/styles';
import { Typography } from "@mui/material";

import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

import VolumeSlider from "./VolumeSlider";

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.5,
    fontWeight: 500,
    letterSpacing: 0.2,
    color: "white"
});


const PlayerControls = (props) => {
    const theme = useTheme();

    //Volume Slider
    const [showSlider, setShowSlider] = useState({ opacity: "0" });
    const openSlider = () => {
        setShowSlider({ opacity: "1" })
    };
    const closeSlider = () => {
        setShowSlider({ opacity: "0" })
    };

    //Volume Icon Handler
    const [volumeValue, setVolumeValue] = useState(30);
    const [volumeIcon, setVolumeIcon] = useState(VolumeDownIcon);

    const handleChange = (event, newValue) => {
        setVolumeValue(newValue);
    };

    useEffect(() => {
        //Handling the audio volume
        props.audioElement.current.volume = volumeValue / 100;
        //Volume icon conditions
        if (volumeValue === 0) {
            setVolumeIcon(VolumeMuteIcon)
        }
        if (volumeValue > 0 && volumeValue <= 65) {
            setVolumeIcon(VolumeDownIcon)
        }
        if (volumeValue > 65) {
            setVolumeIcon(VolumeUpIcon)
        }
    })

    const muteAudio = () => {
        if (volumeValue > 0) {
            setVolumeValue(0)
        };
        if (volumeValue === 0) {
            setVolumeValue(30)
        };
    };


    return <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: 'auto',
    }}>
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: -2,
                }}
            >
                <TinyText>{props.formatDuration(props.currentTime)}</TinyText>
                <TinyText>-{props.formatDuration(props.duration)}</TinyText>
            </Box>
            <Slider
                aria-label="time-indicator"
                size="small"
                value={props.currentTime}
                min={0}
                step={1}
                max={props.maxPosition}
                onChange={(_, value) => {
                    props.setSliderChange(true);
                    props.setCurrentTime(value);
                    props.setDuration(
                        props.audioElement.current.duration - props.currentTime
                    );
                }}
                sx={{
                    color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(255,255,255,0.87)',
                    height: 4,
                    '& .MuiSlider-track': {
                        border: 'none',
                        color: '#ff4834',
                    },
                    '& .MuiSlider-thumb': {
                        width: 8,
                        height: 8,
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
                            width: 20,
                            height: 20,
                        },
                    },
                    '& .MuiSlider-rail': {
                        opacity: 0.28,
                    },
                }}
            />
        </Box>
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            height: '32px',
            alignItems: 'center',
        }}>
            <Box>
                <FastRewindRounded sx={{ color: 'white' }}
                    onClick={() => props.skipSong(false)} />
            </Box>
            <Box>
                {props.isPlaying ?
                    <PauseRounded fontSize="large" sx={{ color: 'white', margin: 'auto 10px' }}
                        onClick={() => props.setIsPlaying(!props.isPlaying)} />
                    :
                    <PlayArrowRounded fontSize="large" sx={{ color: 'white', margin: 'auto 10px' }}
                        onClick={() => props.setIsPlaying(!props.isPlaying)} />}
            </Box>
            <Box>
                <FastForwardRounded sx={{ color: 'white' }}
                    onClick={() => props.skipSong()} />
            </Box>
            <Box sx={{
                marginLeft: 'auto',
                marginRight: '24px',
                position: 'relative',
            }}
                onMouseEnter={openSlider} onMouseLeave={closeSlider}>
                <Box sx={
                    ({
                        ...showSlider,
                        position: 'absolute',
                        top: 'auto',
                        bottom: '100%',
                        padding: '18px 0px',
                        transition: 'all 0.2s ease 0.1s'
                    })
                }>
                    <VolumeSlider
                        value={volumeValue}
                        onChange={handleChange}
                        audio={props.audioElement}
                    />
                </Box>
                <SvgIcon component={volumeIcon} onClick={muteAudio} sx={{ color: 'white' }} />
            </Box>
        </Box>
    </Box>
};

export default PlayerControls;

