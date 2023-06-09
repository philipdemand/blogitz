import { Redirect } from 'react-router-dom';
import React, { useState } from 'react';
import Login from "./Login"
import moment from 'moment';

function NewPost({ onAddItem}) {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [redirectTo, setRedirectTo] = useState(null);

  function showForm(event) {
    event.preventDefault();
    setIsLoggedIn(!isLoggedIn)
  }

  const [formData, setFormData] = useState({
    author: "",
    title: "",
    image: "",
    content: ""
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    setRedirectTo('/');

    const dateTimeString = moment().format('YYYYMMDDHHmmss')
    
    const obj = {
      author: formData.author,
      title: formData.title,
      image: formData.image,
      content: formData.content,
      timeStamp: dateTimeString,
      likes: 0
    }

    fetch("http://localhost:4000/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((r) => r.json())
      .then((newItem) => onAddItem(newItem));
  }

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  } 

  return (
    <div className="card">
      <Login showForm={showForm}/>
    {isLoggedIn ? <form onSubmit={handleSubmit}>
      Author:<input 
      type="text" 
      name="author" 
      value={formData.author} 
      onChange={handleChange}/><br></br>
      
      Title:<input 
      type="text" 
      name="title" 
      value={formData.title} 
      onChange={handleChange}/><br></br>

      Image URL:<input 
      type="text" 
      name="image" 
      value={formData.image} 
      onChange={handleChange}/><br></br>

      Your Blog Entry:<input 
      type="text" 
      name="content"
      style={{ width: "80%", height: "200px" }}
       
      value={formData.content} 
      onChange={handleChange}/><br></br>
      
      <button type="submit">Submit</button>
    </form> : null}
    </div>
  );
}

export default NewPost