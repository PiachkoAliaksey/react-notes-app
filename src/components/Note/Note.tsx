import React, { useState } from 'react';
import { MdDeleteForever } from 'react-icons/md'
import Highlighter from "react-highlight-words";
import Tags from '../Tags/Tags';


interface INote {
  index: number,
  text: string,
  date: string,
  handleDeleteNote: (id: number) => void,
  handleDeleteTag: (id: number, tag: string) => void,
  handleEditNote: (id: number | null, text: string) => void
  tags: Array<string>
}

const Note: React.FC<INote> = ({ index, text, date, handleDeleteNote, tags, handleDeleteTag, handleEditNote }) => {
  const [editNoteId, setEditNoteId] = useState<number | null>(null);
  const [editNoteText, setEditNoteText] = useState(text);
  const [editTags, setEditTags] = useState(['']);

  const handelEdit = (id: number | null, newText: string) => {
    setEditNoteId(id);
    setEditNoteText(newText);
    handleEditNote(index, newText);
  }

  const handelChangeEditTextNote = (e: React.FormEvent<HTMLTextAreaElement>) => {
    let arrTags: string[] = [];

    e.currentTarget.value.replace(/#[^ ]+/gm, function (x) {
      if (!arrTags.includes(x.slice(1))) {
        arrTags.push(x.slice(1))
      }
      return x
    });
    setEditTags(arrTags);
    setEditNoteText(e.currentTarget.value);
  }

  return (
    <>
      {editNoteId === index ? <div className='list-edit-text-note'>
        <textarea value={editNoteText} onChange={handelChangeEditTextNote} className='text-edit-note' rows={8} cols={10}>
        </textarea>
        <Highlighter
          className="noteHighlight"
          highlightClassName="HighlightClass"
          searchWords={editTags}
          autoEscape={true}
          textToHighlight={editNoteText}
        />

      </div>
        : <span className='text-of-note'>{text}</span>}

      {tags.length > 0 ? <ul className='list-tags'><Tags handleDeleteTag={handleDeleteTag} index={index} tags={tags} /></ul> : ''}

      <div className='footer-note'>
        {editNoteId === index ?
          <button className='edit-button' onClick={() => handelEdit(null, editNoteText)}>Done</button>
          : <button className='edit-button' onClick={() => handelEdit(index, text)}>Edit</button>}
        <small className='date-small'>{date}</small>
        <MdDeleteForever onClick={() => handleDeleteNote(index)} className='delete-icon' size='1.3em' />
      </div>
    </>
  )
}
export default Note;
