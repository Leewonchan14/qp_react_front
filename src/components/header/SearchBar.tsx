import React from 'react';
import Lenses from '../../assets/Lenses.png';
import Search from '../../assets/Search.png';
import useSearchOpen from '../../hooks/search/useSearchOpen';

function SearchBar({ className }: React.AllHTMLAttributes<HTMLElement>) {
  const { isSearchPage, goSearch, handleOnChange, search } = useSearchOpen();

  return (
    <button
      onClick={goSearch}
      className={`h-20 mx-auto px-8 ${isSearchPage && 'flex-1 max-w-[80%]'} mobile:flex-1 mobile:scale-75 bg-orange-400 flex justify-center items-center text-white font-bold text-2xl relative rounded-full transition-all duration-300 ${className}`}
    >
      <LenseIcon isSearchPage={isSearchPage} />
      <InputComp
        isSearchPage={isSearchPage}
        handleOnChange={handleOnChange}
        search={search}
      />
    </button>
  );
}

function InputComp({
  search,
  isSearchPage,
  handleOnChange,
}: {
  search: string;
  isSearchPage: boolean;
  handleOnChange: ReturnType<typeof useSearchOpen>['handleOnChange'];
}) {
  return (
    <input
      value={search}
      onChange={handleOnChange}
      className={`w-full h-full rounded-full placeholder:opacity-50 bg-orange-400 placeholder:text-white text-white text-2xl font-bold outline-none ${!isSearchPage && 'text-center'}`}
      type="text"
      placeholder={'질문하기 전 검색하기'}
    />
  );
}

function LenseIcon({ isSearchPage }: { isSearchPage: boolean }) {
  return (
    <div
      className={`absolute z-10 w-28 h-full flex justify-center items-center
        ${isSearchPage ? 'left-auto right-0' : 'left-[-3.5rem]'}`}
    >
      <img
        draggable="false"
        src={Lenses}
        alt={'렌즈'}
        className={'w-full h-full object-cover overflow-visible -mb-1'}
      />
      <img
        draggable="false"
        src={Search}
        alt="검색"
        className={'absolute w-14'}
      />
    </div>
  );
}

export default SearchBar;
