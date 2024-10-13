import React from 'react'
import { Link } from 'react-router-dom';  // Import Link for navigation
import "./SearchResultsList.css"

const SearchResultsList = ({results}) => {
    return (
        <div className="search-results-container">
            {results.length > 0 ? (
                results.map((book) => (
                    <div key={book.id} className="book-card">
                        <img src={book.cover || "https://via.placeholder.com/150"} alt={`${book.title} cover`}
                            className="book-cover"
                        />
                        <div className="book-info">
                            <Link to = {`/book/${book.id}`} className='book-title-link'>
                            <h3 className="book-title">{book.title}</h3>
                            </Link>
                            <p className="book-author">
                                {book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
                            </p>
                            <p className="book-publisher">
                                {book.publisher ? book.publisher[0] : 'Unknown Publisher'}
                            </p>
                            <p className="book-publish-date">
                                {book.first_publish_year ? book.first_publish_year : 'Unknown Year'}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};

export default SearchResultsList
