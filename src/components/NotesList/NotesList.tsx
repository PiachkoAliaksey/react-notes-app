import React, { useEffect, useState } from 'react';
import fileJSON from '../../Initial data/notes.json'
import Note from '../../components/Note/Note';
import AddNote from '../../components/AddNote/AddNote';
import SearchBar from '../../components/SearchBar/SearchBar';

interface INote {
  id: number,
  text: string,
  date: string,
  tags: string[]
}

const NotesList: React.FC = () => {
  const [notes, setNotes] = useState<INote[]>(fileJSON);
  const [searchNote, setSearchNote] = useState('');

  useEffect(() => {
    const getNotesInLocalStorage: INote[] = JSON.parse(localStorage.getItem('notes-data')!);
    if (getNotesInLocalStorage) {
      setNotes(getNotesInLocalStorage)
    }

  }, [])

  useEffect(() => {
    localStorage.setItem('notes-data', JSON.stringify(notes))

  }, [notes])

  const addNewNote = (text: string) => {
    const date = new Date();
    const arrayOfTag: string[] = [];
    const textWithoutTags = text.replace(/#[A-Za-z]+/gm, function (tag) {

      arrayOfTag.push(tag.slice(1));

      return tag;
    })
    const newNote = {
      id: notes.length,
      text: textWithoutTags,
      date: date.toLocaleDateString(),
      tags: arrayOfTag
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  }
  const deleteTag = (id: number, tag: string) => {
    const newNotes = notes.map(note => {
      if (id === note.id) {
        const tags = note.tags.filter(value => value !== tag);
        return { ...note, tags }
      }
      return note;
    })
    setNotes(newNotes);

  }

  const editNote = (id: number | null, newText: string) => {
    const editNotes = notes.map(note => {
      if (id === note.id) {
        const arrayOfTag: string[] = [];
        const text = newText.replace(/#[A-Za-z]+/gm, function (tag) {
          if (!note.tags.includes(tag.slice(1))) {
            arrayOfTag.push(tag.slice(1));
          }
          return tag;
        })

        const tags = [...note.tags, ...new Set(arrayOfTag)];
        return { ...note, text, tags }
      }
      return note
    })
    setNotes(editNotes);
  }

  const deleteNote = (id: number) => {
    const newNotesArray = notes.filter(note => note.id !== id);
    setNotes(newNotesArray);
  }

  const startSearchNote = (value: string): INote[] => {
    return notes.filter(note => note.text.toLowerCase().includes(value.toLowerCase()) || note.tags.includes(value.toLowerCase()))
  }

  return (
    <section>
      <SearchBar handleSearchNote={setSearchNote} />
      <ul className='notes-list'>
        {startSearchNote(searchNote) && startSearchNote(searchNote).map(({ id, text, date, tags }: INote) => <li key={`${id}`} className='note-item'><Note handleDeleteTag={deleteTag} handleDeleteNote={deleteNote} handleEditNote={editNote} index={id} text={text} date={date} tags={tags} /></li>)}
        <AddNote handleAddNote={addNewNote} />
      </ul>

    </section>
  )
}
export default NotesList;
