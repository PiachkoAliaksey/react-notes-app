import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, redirect, Navigate, Link } from 'react-router-dom';
import HomePage from 'pages/NotesPage';

import './sass/normalize.scss';
import './sass/style.scss';


function App() {
  return (
    <>
      <HomePage/>
    </>
  )
}

export default App;
