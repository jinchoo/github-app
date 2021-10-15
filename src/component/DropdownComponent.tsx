import React, { useState, useEffect } from 'react';

type SortType = 'Best match' | 'Most stars';

interface DropdownOption {
  onClick: () => void;
  active: boolean;
  option: string;
}
function DropdownOptionComponent({ onClick, active, option }: DropdownOption) {
  return (
    <div onClick={onClick} className='group hover:bg-blue-300 px-2 py-2'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className={`h-5 w-5 inline-block ${
          active ? '' : 'group-hover:opacity-0'
        }`}
        viewBox='0 0 20 20'
        fill={active ? '#000' : '#fff'}
      >
        <path
          fillRule='evenodd'
          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
          clipRule='evenodd'
        />
      </svg>
      {option}
    </div>
  );
}

interface DropdowncomponentProps {
  onChange: (sortType: SortType) => void;
}
function DropdownComponent({ onChange }: DropdowncomponentProps) {
  const [sortType, setSortType] = useState<SortType>('Best match');
  const [showOptions, setShowOptions] = useState(false);
  const [isFirstLoad, setisFirstLoad] = useState(true);

  const toggleDropdown = () => {
    setShowOptions((v) => !v);
  };

  useEffect(() => {
    onChange(sortType);
  }, [sortType]);

  return (
    <div
      className='border py-2 px-2 rounded text-sm relative cursor-pointer'
      onClick={toggleDropdown}
    >
      Sort: <span className=' font-bold'>{sortType}</span>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-5 w-5 inline-block'
        viewBox='0 0 20 20'
        fill='currentColor'
      >
        <path
          fillRule='evenodd'
          d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
          clipRule='evenodd'
        />
      </svg>
      {showOptions && (
        <div className='absolute top-10 border right-0 bg-white'>
          <div className='px-2 py-2 '>Sort options</div>
          <DropdownOptionComponent
            onClick={() => setSortType('Best match')}
            active={sortType === 'Best match'}
            option={'Best match'}
          ></DropdownOptionComponent>
          <DropdownOptionComponent
            onClick={() => setSortType('Most stars')}
            active={sortType === 'Most stars'}
            option={'Most stars'}
          ></DropdownOptionComponent>
        </div>
      )}
    </div>
  );
}

export default DropdownComponent;
