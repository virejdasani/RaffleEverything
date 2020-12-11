import React, { useState, useEffect } from 'react';
import './App.css';
import Posts from './Post';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { db } from './firebase';

function App() {


const theme = createMuiTheme({
  // For the colors in things like buttons
  palette: {
    primary: {
      light: '#757ce8',
      main: '#40A9F4', 
      dark: '#2874A6',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  // For the fonts
  typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
});

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      // Everytime new data is added in the firebase, this part is executed
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);

  return (
    <div className="app">

      {/*---------- HEADER ----------*/}
      <div className="appHeader">
        {/* TODO  Site Logo, left aligned with style: object-fit: contain; so it doesn't stretch*/}
        
        {/* About button */}
        <div className="aboutButton">
          <MuiThemeProvider theme={theme}>
            <span className="enterRaffleButton">
              <Box pt={2}> {/* This will add 3px padding-top */}
                <Button className="enterButton" variant="contained" size="small" disableElevation>
                  ABOUT
                </Button>
              </Box>
            </span>
          </MuiThemeProvider>
        </div> 

        <h1 className="title">Raffle Everything!</h1>

      </div>
      {/*---------- header ----------*/}

      {/* Mapping throught the posts above and output this data: */}
      {
        posts.map(({id, post}) =>(
          <Posts key={id} itemName={post.itemName} coins={post.coins} imageAlt={post.imageAlt} imageSrc={post.imageSrc}/>
        ))
      }
      

    </div>
  );
}

export default App;
