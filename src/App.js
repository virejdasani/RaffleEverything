import React, { useState, useEffect } from 'react';
import './App.css';
import Posts from './Post';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { db } from './firebase';
import About from './About';
import { Input } from '@material-ui/core';

// Styling for modal
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
// For the colors in things like buttons
const theme = createMuiTheme({
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

  // For modal
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  // For posts
  const [posts, setPosts] = useState([]);
  // For authentication
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState(''); 


  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      // Everytime new data is added in the firebase, this part is executed
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);

  const signUp = (event) => {

  }

  return (
    <div className="app">

      {/* SIGN-UP MODAL (POP-UP) */}
      <Modal 
      open={open}
      onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="signUpForm">
            <center>
              <h3>Register</h3>
              <div className="signUpInputFields">
                {/* EMAIL */}
                <Input
                  placeholder="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
                  {/* PASSWORD */}
                  <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                  {/* CONFIRM PASSWORD */}
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                  <Button onClick={signUp}>Sign Up</Button>
                </div>
            </center>
          </form>
        </div>
      </Modal>
      {/* sign-up modal (pop-up) */}

      {/*---------- HEADER ----------*/}
      <div className="appHeader">
        {/* TODO  Site Logo, left aligned with style: object-fit: contain; so it doesn't stretch*/}
  
        {/* ABOUT BUTTON */}    
        <table>
          <th>
            <div className="aboutButton">
              <MuiThemeProvider theme={theme}>
                <span className="enterRaffleButton">
                  <Box pt={2}> {/* This will add 3px padding-top */}
                    <Button onClick={() => {setOpen(true)}} className="enterButton" variant="contained" size="small" disableElevation>
                      ABOUT
                    </Button>
                  </Box>
                </span>
              </MuiThemeProvider>
            </div> 
          </th>
        </table>
        {/* about button */}

        <h1 className="title">Raffle Everything!</h1>

        {/* AUTHENTICATION */}
        <div className="authOptions">
          <div className="signUpButton">
            <Button variant="outlined" color="secondary" size="medium" disableElevation onClick={() => {setOpen(true)}}> 
              Sign Up
            </Button>
          </div>
        </div>
        {/* authentication */}

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
