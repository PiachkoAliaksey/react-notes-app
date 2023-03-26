import React, { Component } from 'react';
import NotesList from '../../components/NotesList/NotesList';




const NotesPage: React.FC = () => {

  return (
    <>
      <main className='notes-page'>
        <h2 className='header-notes-page'>Notes Application</h2>
        <NotesList />
      </main>
    </>
  )

}

export default NotesPage;
