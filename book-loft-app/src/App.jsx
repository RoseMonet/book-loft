import React, {useState} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SearchResultsList from './components/SearchResultsList'
import BookDetails from './components/BookDetails'

const App = () => {
  const [results, setResults] = useState([]);

  return (
    <Router>
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero setResults={setResults} />} />
        <Route path="/results" element={<SearchResultsList results={results} />} />
        <Route path="/book/:bookId" element={<BookDetails />} /> {/* Route for BookDetails */}
      </Routes>
    </div>
  </Router>
  )
}

export default App
