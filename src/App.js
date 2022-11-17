import Navbar from './component/Navbar';
import './App.css';

import React, { Component } from 'react'
import News from './component/News';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
  
// } from "react-router-dom";
import NewsItem from './component/NewsItem';



export default class App extends Component {
  render() {
    return (
      <div>
      <Navbar/>
      <News>
        <NewsItem></NewsItem>
      </News>
      </div>
    )
  }
}
