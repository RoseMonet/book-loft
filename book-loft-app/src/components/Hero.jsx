import React from 'react'
import './Hero.css'
import SearchBar from './SearchBar'

const Hero = ({setResults}) => {
    return (
        <div className='hero container'>
            <div className= 'hero-text'>
                <h1>BookLoft</h1>
            </div>
            <SearchBar setResults={setResults} />
        </div>

    )
}

export default Hero