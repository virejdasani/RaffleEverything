import React from 'react'
import './Post.css'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';


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
                            <strong>Coins:</strong> {coins}
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
                <span className="enterRaffleButton">
                    <Box pt={2}> {/* This will add 3px padding-top */}
                        <Button variant="contained" color="primary" disableElevation>
                            Enter Raffle
                        </Button>
                        
                    </Box>
                </span>
            </div>
        </div>
    )
}

export default Posts
