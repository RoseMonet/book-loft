import React, {useState} from 'react'
import {FaSearch} from "react-icons/fa"
import { useNavigate } from 'react-router-dom'; 
import './SearchBar.css'
import.meta.env

const SearchBar = ({setResults}) => {
    const [input, setInput] = useState('');
    const navigate = useNavigate();

    const fetchData = (value) => {
        if (value) {

          // Access the API key from the environment variable
         const apiKey = import.meta.env.VITE_APP_GOOGLE_BOOKS_API_KEY;

            fetch(`https://www.googleapis.com/books/v1/volumes?q=${value}&key=${apiKey}`)
            .then((response) => response.json())
            .then((json) => {
              // Make sure you are correctly accessing the docs array
              const results = json.items.map((item) => ({
                id: item.id,
                        title: item.volumeInfo.title,
                        author_name: item.volumeInfo.authors,
                        cover: item.volumeInfo.imageLinks?.thumbnail,
                        publisher: item.volumeInfo.publisher,
                        publish_date: item.volumeInfo.publishedDate,
              }));
              setResults(results); // Update the results with fetched data
              navigate('/results'); // Navigate to the search results page
            })
            .catch((error) => console.error('Error fetching data:', error));
        } else {
          setResults([]); // Clear results when the input is empty
        }
      };

      const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          fetchData(input);  // Trigger the search when "Enter" is pressed
        }
      };

    const handleChange = (value) => {
    setInput(value);

}

    return(
        <div className='search-bar-container'>
            <div className= 'input-wrapper'>
                <FaSearch id= "search-icon"/>
                <input placeholder= "Search..." value={input} onChange={(e) => handleChange(e.target.value)} onKeyDown={handleKeyPress}
                />
            </div>        
        </div>
        
    )
}
export default SearchBar