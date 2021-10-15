import { useEffect, useState } from 'react';

import axios from 'axios';
import RepositoryComponent from '../component/RepositoryComponent';
import { Repositories, Repository } from '../type/Repository';
import { Link, useHistory, useLocation } from 'react-router-dom';
import DropdownComponent from '../component/DropdownComponent';
type Sort = '' | 'stars' | 'forks' | 'help-wanted-issues';

function useQuery(query: string) {
  return new URLSearchParams(query);
}

function SearchPage() {
  const API_URL = 'https://api.github.com/search/repositories';
  const [sort, setSort] = useState<Sort>('stars');
  const [searchResultList, setSearchResultList] = useState<Repositories>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [totalResultCount, setTotalResultCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();
  const location = useLocation();

  const query = useQuery(location.search);
  const q = query.get('q');

  console.log(location);
  const filterLanguage = [
    'JavaScript',
    'PHP',
    'CSS',
    'HTML',
    'Java',
    'Python',
    'Ruby',
    'TypeScript',
    'C#',
    'Vue',
    'Go',
    'React',
  ];

  const onSearchTermChange = ({ target }: any) => {
    const { value } = target;

    setSearchTerm(value);
  };

  const onFilterClick = (value: string) => {
    setFilter((v) => (v === value ? '' : value));
  };

  const searchGithub = (query: string, sort = '') => {
    axios
      .get(`${API_URL}`, {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: 'token [TOKEN]',
        },
        params: { q: query, sort },
      })
      .then((response: any) => {
        console.log(response.data.items);
        setTotalResultCount(response.data.total_count);
        setSearchResultList(response.data.items);
      })
      .catch((errr) => {
        setError('Error searching for repo');
      });
  };
  const onSearchClick = () => {
    let query = searchTerm;

    history.push(`?q=${query}`);

    searchGithub(query, sort);
  };

  useEffect(() => {
    if (q) {
      setSearchTerm(q);
      searchGithub(q, sort);
    }
  }, [q, sort]);

  useEffect(() => {
    if (searchTerm) {
      if (filter) {
        searchGithub(`${searchTerm} language:${filter.toLowerCase()}`, sort);
      } else {
        searchGithub(searchTerm, sort);
      }
    }
  }, [searchTerm, filter, sort]);

  const showResult = searchResultList.length > 0 && (
    <div className='grid grid-cols-12 gap-4'>
      <div className='col-span-3 py-2 px-2 border rounded'>
        <h2 className='font-bold mb-5 px-2'>Languages</h2>
        <ul>
          {filterLanguage.map((language) => (
            <li
              key={language}
              onClick={() => onFilterClick(language)}
              className={`flex cursor-pointer rounded px-2   py-1 hover:bg-blue-300 ${
                filter === language ? 'bg-blue-500 text-white' : 'text-gray-500'
              }`}
            >
              <div className='flex-1'>{language}</div>
              {filter === language && <div>X</div>}
            </li>
          ))}
        </ul>
      </div>
      <div className=' col-span-9'>
        <div className='flex mb-3 items-center'>
          <div className='flex-1'>{totalResultCount} repository results</div>
          <div>
            <DropdownComponent
              onChange={(sort) => {
                if (sort === 'Best match') {
                  setSort('');
                } else {
                  setSort('stars');
                }
              }}
            ></DropdownComponent>
          </div>
        </div>

        <div>
          {searchResultList.map((item) => (
            <RepositoryComponent
              key={item.id}
              item={item}
            ></RepositoryComponent>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className='container mx-auto'>
      <div className='flex mt-20 mb-5 '>
        <input
          data-testid='search-input'
          value={searchTerm}
          onChange={onSearchTermChange}
          type='text'
          className='bg-gray-200 border2 border-gray-200 py-2 rounded px-4 block w-full'
          placeholder='Search Github'
        ></input>
        <button
          onClick={onSearchClick}
          className=' border-gray-200 rounded border px-3 ml-2'
        >
          Search
        </button>
      </div>

      {showResult}
      {/* {searchResultList.map((item) => (
        <div key={item.id}>
          <Repository item={item}></Repository>
        </div>
      ))} */}
      {/* {searchResultList.map((item) => {
        const name = item.name;
        // access to global in this page
        return (
          <div key={item.id}>
            <h1>{name} asdf</h1>
            <Repository item={item}></Repository>
          </div>
        );
      })} */}
      {error && (
        <div className='py-2 px-2 bg-red-300'>
          {error}
          <div className='text-right'>X</div>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
