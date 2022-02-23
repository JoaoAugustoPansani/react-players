import React from "react";

import Slider from '@mui/material/Slider';
import { useTheme } from '@mui/material/styles';

const VolumeSlider = (props) => {
    const theme = useTheme();

    return <Slider
        value={props.value}
        onChange={props.onChange}
        aria-label="Volume"
        orientation="vertical"
        size='small'
        padding="12px 0px"
        margin="12px 0px"
        sx={{
            height: '120px',
            color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(255,255,255,0.87)',
            '& .MuiSlider-track': {
                border: 'none',
                color: '#ff4834',
            },
            '& .MuiSlider-thumb': {
                width: 18,
                height: 18,
                backgroundColor: '#ff4834',
                '&:before': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                },
                '&:hover, &.Mui-focusVisible, &.Mui-active': {
                    boxShadow: 'none',
                },
            },
        }} />
};

export default VolumeSlider;