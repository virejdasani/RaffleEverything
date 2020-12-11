import React, { useState } from 'react'
import './App.css';
import Posts from './Post'

function App() {
  
  // const [posts, setPosts] = useState([
  //   {
  //     <Posts itemName="iPhone 12 PRO" coins="5000" participants="0" imageAlt="iPhone 12 PRO" imageSrc="https://m.media-amazon.com/images/I/71i2XhHU3pL._AC_UY218_.jpg"/>

  //   },
  //   {}
  // ]);

  return (
    <div className="app">

      {/*---------- HEADER ----------*/}
      <div className="appHeader">
        {/* Site Logo, left aligned with style: object-fit: contain; so it doesn't stretch*/}

        <h1 className="title">Raffle Everything!</h1>

      </div>
      {/*---------- header ----------*/}

      {/*---------- POSTS ----------*/}

     
      <Posts itemName="iPhone 12 PRO" coins="5000" participants="0" imageAlt="iPhone 12 PRO" imageSrc="https://m.media-amazon.com/images/I/71i2XhHU3pL._AC_UY218_.jpg"/>
      <Posts itemName="iPhone 12 PRO" coins="100" participants="0" imageAlt="iPhone 12 PRO" imageSrc="https://m.media-amazon.com/images/I/71i2XhHU3pL._AC_UY218_.jpg"/>
    
      {/*---------- posts ----------*/}

    </div>
  );
}

export default App;
