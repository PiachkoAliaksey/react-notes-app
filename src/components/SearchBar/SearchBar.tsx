import React, { useState, SetStateAction } from 'react';
import { MdSearch } from 'react-icons/md';

interface ISearchBar {
  handleSearchNote: React.Dispatch<SetStateAction<string>>
}
const SearchBar: React.FC<ISearchBar> = ({ handleSearchNote }) => {

  return (
    <div className='search-bar'>
      <MdSearch className='search-icon' size='1.3em' />
      <input onChange={(e) => handleSearchNote(e.currentTarget.value)} className='input-search-note' type='text' placeholder='type to search...' />

    </div>
  )

}

export default SearchBar;
