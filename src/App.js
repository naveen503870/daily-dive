import './App.css';
import React from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";

const App =()=> {
  const pageSize = 15;
    return (
      <>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<News key="home" country="in" pageSize={pageSize} />}></Route>
            <Route exact path="/sports" element={<News key="sports" country="in" pageSize={pageSize} category="sports" />}></Route>
            <Route exact path="/business" element={<News key="business" country="in" pageSize={pageSize} category="business" />}></Route>
            <Route exact path="/entertainment" element={<News key="entertainment" country="in" pageSize={pageSize} category="entertainment" />}></Route>
            <Route exact path="/general" element={<News key="general" country="in" pageSize={pageSize} category="general" />}></Route>
            <Route exact path="/science" element={<News key="science" country="in" pageSize={pageSize} category="science" />}></Route>
            <Route exact path="/technology" element={<News key="technology" country="in" pageSize={pageSize} category="technology" />}></Route>
          </Routes>
        </Router>
      </>
    )
}

export default App
