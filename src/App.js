import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './header.js';
import Footer from './footer';
import Stories from './stories.js';
import Feed from './feed.js'

function App() {
  return (
    <div className="main-container" >
      <Header />
      {/* <Stories /> */}
      <Feed />
      {/* insert profile */}
      <Footer />
    </div>
  );
}

export default App;
