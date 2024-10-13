import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Import useParams to get the book key from the URL
import './BookDetails.css'


const BookDetails = () => {
    const { bookId } = useParams();  // Retrieve the book key from the URL
    const [book, setBook] = useState(null);

    useEffect(() => {

         // Access the API key from the environment variable
         const apiKey = import.meta.env.VITE_APP_GOOGLE_BOOKS_API_KEY;

        // Fetch detailed data for the selected book
        fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`)
            .then((response) => response.json())
            .then((json) => {
                setBook({
                    title: json.volumeInfo.title,
                    author: json.volumeInfo.authors?.join(', '),
                    description: json.volumeInfo.description,
                    publicationDate: json.volumeInfo.publishedDate,
                    isbn: json.volumeInfo.industryIdentifiers?.[0]?.identifier,
                    pageCount: json.volumeInfo.pageCount,
                    subjects: json.volumeInfo.categories?.join(', '),
                    cover: json.volumeInfo.imageLinks?.thumbnail
                });
            })
            .catch((error) => console.error('Error fetching book details:', error));
    }, [bookId]);

    // Display loading message while fetching data
    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className="book-details">
        <img src={book.cover || "https://via.placeholder.com/150"} alt={`${book.title} cover`} />
        <h2>{book.title}</h2>
        <p><strong>Author:</strong> {book.author || 'Unknown Author'}</p>
        <p><strong>Description:</strong> {book.description || 'No description available.'}</p>
        <p><strong>Publication Date:</strong> {book.publicationDate || 'Unknown'}</p>
        <p><strong>ISBN:</strong> {book.isbn || 'N/A'}</p>
        <p><strong>Page Count:</strong> {book.pageCount || 'N/A'}</p>
        <p><strong>Subjects:</strong> {book.subjects || 'N/A'}</p>
    </div>
    );
};

export default BookDetails;