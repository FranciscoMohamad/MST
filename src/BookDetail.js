import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './BookDetail.css';

function BookDetail({ book, onBack }) {
  const [content, setContent] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    fetch(book.content)
      .then(response => response.text())
      .then(text => {
        const chapterDelimiter = '# Capítulo';
        const contentChapters = text.split(chapterDelimiter).map((chapter, index) => {
          return index === 0 ? chapter : chapterDelimiter + chapter;
        });
        setChapters(contentChapters);
        setCurrentPage(1); // Start with the first chapter
        setContent(contentChapters[0]);
      });
  }, [book.content]);

  const nextPage = () => {
    if (currentPage < chapters.length - 1) {
      setCurrentPage(currentPage + 1);
      setContent(chapters[currentPage + 1]);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setContent(chapters[currentPage - 1]);
    }
  };

  return (
    <div className="book-detail">
      <button className="back-button" onClick={onBack}>Back</button>
      <h2>{book.title}</h2>
      <img src={book.image} alt={book.title} className="book-detail-image" />
      <ReactMarkdown>{content}</ReactMarkdown>
      <div className="navigation">
        <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
        <button onClick={nextPage} disabled={currentPage === chapters.length - 1}>Siguiente</button>
      </div>
    </div>
  );
}

export default BookDetail;