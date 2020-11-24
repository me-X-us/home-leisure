import React from 'react';
import SearchVideoList from '../components/SearchVideoList';
import Filter from '../components/Filter';
import '../css/Search.css';

function Search() {
    return (
        <div className='SearchWrapper'>
            <Filter />
            <div className='SearchVideoList'>
                <SearchVideoList />
            </div>
        </div>
    );
}

export default Search;