import React, { useState } from "react";

import MusicPlayer from "./MusicPlayer";
import { slugify } from "./helper";
import { Box, Typography, useMediaQuery } from "@mui/material";

const MusicPlayerGrid = (props) => {
    //Identifying current music player
    const [currentPlayer, setCurrentPlayer] = useState();
    //Detecting ViewWidth (returns boolean)
    const mediaQuery = useMediaQuery('(max-width: 600px)');

    let current;

    const togglePlay = (id, index) => {
        //Getting current player
        const currentAudio = document.getElementById(id);

        //Getting all audio players as a HTMLCollection
        const players = document.getElementsByTagName('audio');

        //Casting HTMLCollection to array so we can do stuff
        const playersArray = [...players];

        //Getting array of players that are not playing
        const notPlaying = playersArray.filter(item => {
            if (item !== currentAudio) {
                return item
            }
            return null
        })

        if (!currentAudio.paused) {
            currentAudio.pause();
        } else {
            //If we are paused, play 
            currentAudio.play();

            //Pause all other players
            notPlaying.map(player => {
                player.pause();
                setCurrentPlayer(!player);
                return null;
            })
        }

        //Reset current
        current = currentAudio;
        setCurrentPlayer(current);

        console.log(currentPlayer)
    }


    //Mapping track components
    const mapPlayers = <Box sx={mediaQuery ? {
        maxWidth: '1024px',
        margin: '10px auto',
        display: 'grid',
        gridTemplateRows: 'auto auto',
        gap: '50px',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        color: 'white'
    } : {
        maxWidth: '1024px',
        margin: '10px auto',
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        gridTemplateRows: 'auto auto',
        gap: '30px 50px',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        color: 'white'
    }}>
        {
            props.songs.map((item, index) => {
                const slug = slugify(
                    item.title + '-' + item.artist_names + '-' + item.id
                )
                return (
                    <MusicPlayer
                        key={item.id}
                        slug={slug}
                        index={index}
                        togglePlay={togglePlay}
                        audioSrc={item.src}
                        imgSrc={item.img_src}
                        title={item.title}
                        artistsNames={item.artist_names}
                        spotifyStreams={item.spotify_streams}
                        youtubeStreams={item.youtube_streams}
                        isCurrent={
                            currentPlayer && currentPlayer.id === slug
                                ? true
                                : false
                        }
                    />)
            })
        }
    </Box >

    return <Box sx={{ width: 'fit-content', 
    margin: '80px auto 40px auto' }}>
        <Typography variant="h4" sx={{
            color: 'white', fontWeight: 'bold', marginBottom: '30px'
        }}>
            Music Player Grid
        </Typography>
        {mapPlayers}
    </Box>
};

export default MusicPlayerGrid;