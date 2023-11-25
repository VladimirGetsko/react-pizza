import { useCallback, useContext, useRef, useState } from "react";
import { SearchContext } from "../../App";
import debounce from "lodash.debounce";

import styles from "./search.module.scss";

const Search = () => {
  const [value, setValue] = useState();
  const { setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();

  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  }

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
      console.log(str);
    }, 350),
    []
  );

  const onChangeInput = e => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  }

  return (
    <div className={styles.searchWrap}>
      <span className={styles.searchIcon}>
        <svg viewBox="0 0 32 32"><title/><g id="search"><path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z"/></g></svg>
      </span>
      <input 
        placeholder="Поиск пиццы"
        value={value}
        ref={inputRef}
        onChange={onChangeInput}
        className={styles.inputSearch}
      />
      {value && 
        <span 
          className={styles.searchClose}
          onClick={() => onClickClear()}>
          <svg viewBox="0 0 20 19.84"><path d="m10.17 10 3.89-3.89a.37.37 0 1 0-.53-.53L9.64 9.43 5.75 5.54a.37.37 0 1 0-.53.53L9.11 10l-3.89 3.85a.37.37 0 0 0 0 .53.34.34 0 0 0 .26.11.36.36 0 0 0 .27-.11l3.89-3.89 3.89 3.89a.34.34 0 0 0 .26.11.35.35 0 0 0 .27-.11.37.37 0 0 0 0-.53Z"/></svg>
        </span>
        }
    </div>
    
  )
};

export default Search;
