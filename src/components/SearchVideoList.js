import React from 'react';
import SearchVideo from './SearchVideo'

const SearchVideoList = (props) => {
    return (
        <div>
            {props.searchs.map(search => <SearchVideo key={search.trainingId} training={search} />)}
        </div>
    );
}

export default SearchVideoList;