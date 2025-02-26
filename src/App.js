import React, { useState, useEffect } from 'react';
import './App.css';
import storiesData from './data/stories.json';
import Filter from './Filter';
import BookDetail from './BookDetail';

function App() {
  const [stories, setStories] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    setStories(storiesData);
  }, []);

  const genres = [...new Set(storiesData.map(story => story.genre))];

  const filteredStories = selectedGenre
    ? stories.filter(story => story.genre === selectedGenre)
    : stories;

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleBackClick = () => {
    setSelectedBook(null);
  };

  return (
    <div className="App">
      {!selectedBook && (
        <div className="App-sidebar">
          <img src="./img/MST.jpg" alt="Logo" className="App-logo" />
          <h2>MST</h2>
          <Filter genres={genres} selectedGenre={selectedGenre} onGenreChange={setSelectedGenre} />
        </div>
      )}
      <header className="App-header">
        <h1>{selectedGenre || 'All Books'}</h1>
      </header>
      <div className="App-body">
        <main className="App-main">
          {selectedBook ? (
            <BookDetail book={selectedBook} onBack={handleBackClick} />
          ) : (
            <div className="book-list">
              {filteredStories.map(story => (
                <div key={story.id} className="book-item">
                  <h2>{story.title}</h2>
                  <div className="book-image-container">
                    <img src={story.image} alt={story.title} className="book-image" />
                    <div className="book-description">
                      <p>{story.description}</p>
                    </div>
                  </div>
                  <button onClick={() => handleBookClick(story)}>Read</button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;