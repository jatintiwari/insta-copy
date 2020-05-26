import React from 'react';
import logo from './logo.svg';
import './App.css';
import './feed.css';
import Header from './header.js';
import Footer from './footer';
import Stories from './stories.js';
import Feed from './feed.js';
import Profile from './Profile.js';

function App() {
  return (
    <div className="main-container" >
      <Header />
      {/*<Stories /> */}
      {/*<Feed /> */}
      <Profile />
      <Footer /> 
    </div>
  );
}

export default App;
