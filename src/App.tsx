import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, redirect, Navigate, Link } from 'react-router-dom';
import NotesPage from './pages/NotesPage/NotesPage';


import './sass/style.scss';


function App() {
  return (
    <>
      <NotesPage />
    </>
  )
}

export default App;
