import React, { useEffect, useState } from 'react';
import SearchVideoList from '../components/SearchVideoList';
import Filter from '../components/Filter';
import '../css/Search.css';
import { getHttp } from '../utils/authHttpWrapper';

const Search = (props) => {

    const [searchs, setSearchs] = useState([]);

    useEffect(() => {
        let searchStr = props.location.search.slice(7)
        console.log(searchStr)
        getHttp('/trainings?search=' + searchStr)
            .then(r => {
                if (r.data._embedded !== undefined)
                    setSearchs(r.data._embedded.trainingList)
                console.log(searchs)
            }).catch(e => {
                console.log(e.response.data.message)
            });
        // eslint-disable-next-line
    }, [props.location.search])

    return (
        <div className='SearchWrapper'>
            <Filter />
            <div className='SearchVideoList'>
                <SearchVideoList searchs={searchs} />
            </div>
        </div>
    );
}

export default Search;