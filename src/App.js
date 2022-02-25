import React, { useState } from 'react';

import './App.css';
import PlaylistPlayer from './Components/PlaylistPlayer/PlaylistPlayer';
import MusicPlayerGrid from './Components/MusicPlayer/MusicPlayerGrid'
import { Alert, Typography, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import Footer from './Components/Footer';

function App() {
  //Phone alert states and handlers
  const iphoneDetect = useMediaQuery('(max-width: 600px)');
  const [open, setOpen] = useState(true);

  //Fake database
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

  return (
    <Box sx={{ width: '100%' }}>
      {iphoneDetect && open ? 
        <Alert severity='info' onClose={() => {
          setOpen(false)
        }} >
          If you're using an Iphone, the audio informations will load after playing. &nbsp;
          <Box component='a'
          target="_blank"
          href="https://stackoverflow.com/questions/23551456/ios-browsers-not-respecting-html5-audio-preload-tag">
            <Box component='span' sx={{
              textDecoration: 'underline'
            }}>
              Read More
            </Box>
          </Box>
        </Alert> : ''}
      <Box sx={{ width: '390px', margin: 'auto' }}>
        <Typography variant='h2' mt={4} component="div" sx={{
          color: 'white', fontWeight: 'bold', width: 'fit-content'
        }}>
          React Players
        </Typography>
        <Typography variant='caption' component="div" sx={{
          color: 'white', width: 'fit-content',
          margin: '5px 0px 0px auto'
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
      <Footer />
    </Box>
  );
}

export default App;
