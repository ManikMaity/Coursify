import React from 'react';
import SearchFilter from '../components/SearchFilter';
import SearchResult from '../components/SearchResult';

const Search = () => {
  return (
    <div className="min-h-screen p-6 bg-base-200">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <SearchFilter/>
            <SearchResult/>
        </div>
      </div>
    </div>
  );
};

export default Search;
