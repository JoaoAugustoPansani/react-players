import React, { useState, useEffect } from 'react';

import './App.css';
import PlaylistPlayer from './Components/PlaylistPlayer/PlaylistPlayer';
import MusicPlayerGrid from './Components/MusicPlayer/MusicPlayerGrid'
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Footer from './Components/Footer';

function App() {
  const tracks = [
    {
      id: 1,
      src: './assets/songs/rhcp.mp3',
      img_src: './assets/album_covers/rhcp.jpeg',
      title: 'Scar Tissue',
      artist_names: 'Red Hot Chilli Peppers',
    },
    {
      id: 2,
      src: './assets/songs/mac-miller.mp3',
      img_src: './assets/album_covers/mac-miller.jpeg',
      title: 'Friends',
      artist_names: 'Mac Miller',
    },
    {
      id: 3,
      src: './assets/songs/artic-monkeys.mp3',
      img_src: './assets/album_covers/artic-monkeys.jpeg',
      title: 'Fluorescent Adolescent',
      artist_names: 'Frank Ocean',
    },
    {
      id: 4,
      src: './assets/songs/khalid.mp3',
      img_src: './assets/album_covers/khalid.jpeg',
      title: 'Confidence',
      artist_names: 'Khalid',
    },
  ];

  const album = {
    title: 'Human',
    img_src: './assets/album_covers/human.jpeg',
    songs: [
      {
        id: 1,
        src: './assets/songs/one.mp3',
        title: 'Deixa Bater',
        artist_names: 'Garius'
      },
      {
        id: 2,
        src: './assets/songs/two.mp3',
        title: 'X-FILES',
        artist_names: 'Garius'
      },
      {
        id: 3,
        src: './assets/songs/three.mp3',
        title: 'Exagerado',
        artist_names: 'Garius'
      },
    ]
  };


  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{width: '390px', margin: 'auto'}}>
        <Typography variant='h2' mt={4} component="div" sx={{
          color: 'white', fontWeight: 'bold', width: 'fit-content'
        }}>
          React Players
        </Typography>
        <Typography variant='caption' component="div" sx={{
          color: 'white', fontWeight: 'bold', width: 'fit-content',
          margin: '10px 0px 0px auto'
        }}>
          by João Augusto Pansani
        </Typography>
        </Box>
      <section>
        <PlaylistPlayer
          tracks={tracks} />
      </section>
      <section>
        <MusicPlayerGrid
          songs={tracks} />
      </section>
      <Footer/>
    </Box>
  );
}

export default App;
