import React, { useState, useEffect } from 'react';
import './App.css';
import Posts from './Post';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { db, auth } from './firebase';
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

  // For modals
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  // For sign up modal
  const [open, setOpen] = useState(false);

  // For sign in modal
  const [openSignIn, setOpenSignIn] = useState(false);

  // For about modal
  const [openAbout, setOpenAbout] = useState(false);

  // For posts
  const [posts, setPosts] = useState([]);

  // For authentication
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); 
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User has logged in
        console.log(authUser);
        setUser(authUser);

      } else {
        // User logged out
        setUser(null);
      }
    })

    return () => {
      // Detach the listener so no duplicates are present
      unsubscribe();
    }
  }, [user, username]);

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      // Everytime new data is added in the firebase, this part is executed
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);

  // Sign up handler
  const signUp = (event) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));

    // Close modal after sign up
    setOpen(false);
  }

  // Sign in handler
  const signIn = (event) => {
    event.preventDefault();
    
    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message));

    // Close the modal after sign in
    setOpenSignIn(false);

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

                  {/* USERNAME */}
                  <Input
                    placeholder="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                  
                  <Box pt={2}>
                    <Button variant="contained" size="medium" color="primary" type="submit" onClick={signUp}>Sign Up</Button>
                  </Box>
                  
                  <Box pt={2}>
                    <Button variant="text" color="secondary" size="small" onClick={() => {setOpenSignIn(true)}} >Sign in?</Button>
                  </Box>
                </div>
            </center>
          </form>
        </div>
      </Modal>
      {/* sign-up modal (pop-up) */}

      {/* SIGN-IN MODAL (POP-UP) */}
      <Modal 
      open={openSignIn}
      onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="signInForm">
            <center>
              <h3>Welcome back</h3>
              <div className="signInInputFields">
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
                  <Box pt={2}>
                    <Button variant="contained" size="medium" color="primary" type="submit" onClick={signIn}>Sign In</Button>
                  </Box>
                  
                  <Box pt={2}>
                    <Button variant="text" color="secondary" size="small" onClick={() => {setOpen(true)}} >Sign up?</Button>
                  </Box>

                </div>
            </center>
          </form>
        </div>
      </Modal>
      {/* sign-in modal (pop-up) */}


      {/* ABOUT MODAL */}
      <Modal 
      open={openAbout}
      onClose={() => setOpenAbout(false)}>
        <div style={modalStyle} className={classes.paper}>
          <h3 className="aboutModalTitle">
            About Raffle Everything
          </h3>
          <h4 className="aboutModalContent">
            • Each item on the website can be won by transferring the said amount via paytm
          </h4>
          <h4 className="aboutModalContent">  
            • You can also buy additional raffle tickets to increase your chance of winning
          </h4>
          <h4 className="aboutModalContent">
            • Once the payment has been recieved, you will automatically be entered in the contest.
          </h4>
          <h4 className="aboutModalContent">
            • Win or lose, you are doing a good deed because all profits go towards efforts for stopping covid-19 at the end of each month.
          </h4>
          <h4 className="aboutModalContent">
            • If you win, you will receive a mail or message for your shipping info so we can deliver the product to you for FREE!
          </h4>
        </div>
      </Modal>
      {/* about modal */}

      {/*---------- HEADER ----------*/}
      <div className="appHeader">
        {/* TODO  Site Logo, left aligned with style: object-fit: contain; so it doesn't stretch*/}
  
        {/* ABOUT BUTTON */}    
        <table>
          <th>
            <div className="aboutButton">
              <MuiThemeProvider theme={theme}>
                <span className="enterRaffleButton">
                  <Box pt={2}> {/* This will add 2px padding-top */}
                    <Button onClick={() => {setOpenAbout(true)}} className="enterButton" variant="contained" size="small" disableElevation>
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
            {/* If signed in, button will show Logout, onClick => logout */}
            {user ? (
              <div className="signUpButton">
                <Button variant="outlined" color="secondary" size="medium" disableElevation onClick={() => auth.signOut()}> 
                  Logout
                </Button>
              </div>  
             
            ): (
              // Else, it will show Sign up and login
              <div className="signInButtons">
                <center>
                    <Button variant="outlined" color="secondary" size="medium" disableElevation onClick={() => {setOpen(true)}}> 
                      Sign Up
                    </Button>

                    <Button variant="outlined" color="secondary" size="medium" disableElevation onClick={() => {setOpenSignIn(true)}}> 
                      Sign In
                    </Button>
                </center>
              </div>
              
            )}
          
        </div>
        {/* authentication */}

        <div className="welcomeUser">       
          {/* This is to show welcome, name */}
          {user ? (
                <h5 className="welcomeUser">Welcome { user.displayName }</h5>
              ): ( 
                // Else is not logged in, it will show not signed in
                <h5>Not logged in</h5>
              )}
        </div>       
      </div>
      {/*---------- header ----------*/}

      {/* Mapping through the posts above and outputting this data: */}
      {
        posts.map(({id, post}) =>(
          <Posts key={id} itemName={post.itemName} coins={post.coins} imageAlt={post.imageAlt} imageSrc={post.imageSrc} participants={post.participants} maxParticipants={post.maxParticipants}/>
        ))
      }
      

    </div>
  );
}

export default App;
