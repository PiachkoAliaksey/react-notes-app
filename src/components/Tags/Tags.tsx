import React, { Component } from 'react';
import { MdClose } from 'react-icons/md'

interface ITags {
  tags: Array<string>,
  handleDeleteTag: (id: number, tag: string) => void,
  index: number
}
const Tags: React.FC<ITags> = ({ tags, handleDeleteTag, index }) => {

  return (
    <>
      {tags.map((tag: string) => <li key={tag} className='tag-item'>{tag}<MdClose className='icon-delete-tag' onClick={() => handleDeleteTag(index, tag)} /></li>)}
    </>
  )
}

export default Tags;
