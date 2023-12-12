import React from 'react';
import s from './search.module.scss'

const Search = ({searchValue, setSearchValue}) => {
  return (
    <div className={s.root}>
      <svg className={s.icon} fill="none" height="22" stroke="currentColor"
           stroke-linecap="round"
           stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" x2="16.65" y1="21" y2="16.65"/>
      </svg>
      <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className={s.input} type="text"
             placeholder='Поиск пиццы...'/>
      {searchValue && (
        <svg onClick={() => setSearchValue('')} className={s.clearIcon} height="18x" id="Layer_1" version="1.1"
             viewBox="0 0 512 512"
             width="18px">
          <path
            d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/>
        </svg>
      )}
    </div>
  );
};

export default Search;