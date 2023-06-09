import React, { useState, useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';
import NavBar from './NavBar'
import Home from './Home'
import NewPost from './NewPost'
import About from './About'

function App() {

  const [blogs, setBlogs] = useState([])
  
  useEffect(() => {
    fetch("http://localhost:4000/blogs")
      .then((r) => r.json())
      .then((blogsArray) => setBlogs(blogsArray));
  }, []);

  function handleAddPost(newItem) {
    setBlogs([...blogs, newItem]);
  }

  function handlePlusLike(likedId) {
    const updatedBlogs = [...blogs];
    const objToUpdate = updatedBlogs.find(obj => obj.id === likedId);
    objToUpdate.likes = objToUpdate.likes + 1;
    setBlogs(updatedBlogs)
  }

  return (
    <div className='App'>
       <NavBar />
      <Switch>
        <Route path="/new-post">
          <NewPost onAddItem={handleAddPost}/>
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <Home blogs={blogs} handlePlusLike={handlePlusLike}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
