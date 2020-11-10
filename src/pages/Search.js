import React from 'react';
import SearchVideoList from '../components/SearchVideoList';
import Filter from '../components/Filter';

function Search() {
    return (
        <div style={{ marginLeft: '16%' }}>
            <Filter />
            <div style={{marginTop:'50px'}}>
                <SearchVideoList />
            </div>
        </div>
    );
}

export default Search;