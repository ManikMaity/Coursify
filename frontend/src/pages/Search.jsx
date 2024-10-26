import React, { useState } from 'react';
import SearchFilter from '../components/SearchFilter';
import SearchResult from '../components/SearchResult';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import fetchSearchData from '../services/fetchSearchData';
const Search = () => {

  const [difficulty, setDifficulty] = useState("");
  const [duration, setDuration] = useState("");
  const [language, setLanguage] = useState("");
  const [free, setFree] = useState(false);


  const {search} = useLocation();
  const query = new URLSearchParams(search).get('q');
  const {isLoading, isError, isFetched, data, refetch} = useQuery(["search", query], () => fetchSearchData(query, {difficulty, duration, language, free}), {
    cacheTime : 1000*60*10,
    staleTime : 1000*60*10,
  });

  console.log(data);
  

  return (
    <div className="min-h-screen p-6 bg-base-200">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <SearchFilter refetch={refetch} filterData={{difficulty, setDifficulty, duration, setDuration, language, setLanguage, free, setFree}}/>
          {data && <SearchResult coursesData={data.data}/>}
          {isError && <div>Error</div>}
          {isLoading && <div className="md:col-span-3 h-64 skeleton"></div>}
        </div>
      </div>
    </div>
  );
};

export default Search;
