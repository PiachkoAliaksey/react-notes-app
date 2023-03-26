import React, { useState } from 'react';

interface IAddNote {
  handleAddNote: (text: string) => void
}

const AddNote: React.FC<IAddNote> = ({ handleAddNote }) => {
  const [noteText, setNoteText] = useState('');

  const maxLineWords: number = 200;

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setNoteText(e.currentTarget.value);
  }
  const handleSaveNote = (e: React.FormEvent<HTMLButtonElement>) => {
    if (noteText.trim().length > 0) {
      handleAddNote(noteText);
      setNoteText('');
    }
  }

  return (
    <li className='note-item new-note-item'>
      <textarea value={noteText} onChange={handleChange} className='text-writable' rows={8} cols={10} maxLength={maxLineWords} placeholder="Type to add a note..."></textarea>
      <div className='footer-note'>
        <small>{maxLineWords - noteText.length} Remaining</small>
        <button className='save-new-note' onClick={handleSaveNote}>Save</button>
      </div>
    </li>
  )
}

export default AddNote;
