import React, { useState, useEffect } from 'react'
import './App.css';
import Posts from './Post'
import { db } from './firebase';

function App() {

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
