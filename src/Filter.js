import React from 'react';
import './Filter.css';

function Filter({ genres, selectedGenre, onGenreChange }) {
  return (
    <div>
      <nav className="filter-sidebar">
        <ul>
          <li onClick={() => onGenreChange('')} className={!selectedGenre ? 'active' : ''}>All</li>
          {genres.map(genre => (
            <li key={genre} onClick={() => onGenreChange(genre)} className={selectedGenre === genre ? 'active' : ''}>
              {genre}
            </li>
          ))}
        </ul>
      </nav>
      <div className="filter-dropdown">
        <select id="genre" value={selectedGenre} onChange={e => onGenreChange(e.target.value)}>
          <option value="">All</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Filter;