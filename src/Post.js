import React from 'react'
import './Post.css'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

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

function Posts({ itemName, coins, participants, imageSrc, imageAlt }) {
    return (
        <div className="post">
            {/* Name of item */}
            <h1 className="itemName">{itemName}</h1>

            {/* Picture of winning gift on left */}
            <img className="postImage" src={imageSrc} alt={imageAlt}/>
         
            <div className="imageText">
            {/* Min amount of coins to enter raffle */}
                <span className="coins">
                    <Box pt={0}>
                        <h3 className="light">
                            <strong>Coins for one Raffle entry:</strong> {coins}
                        </h3>
                    </Box>
                </span>
            {/* Num of participants */}
                <span className="participants">
                    <Box pt={2}>
                        <h3 className="light">
                            <strong>Participants:</strong> {participants} (from firebase)
                        </h3>
                    </Box>
                </span>
            {/* "Enter raffle" button  */}
                <MuiThemeProvider theme={theme}>
                    <span className="enterRaffleButton">
                        <Box pt={2}> {/* This will add 3px padding-top */}
                            <Button className="enterButton" variant="contained" size="medium" color="primary" disableElevation>
                                Enter Raffle
                            </Button>
                        </Box>
                    </span>
                </MuiThemeProvider>
            </div>
        </div>
    )
}

export default Posts
