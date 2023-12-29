import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSort, setSort } from "../../redux/slices/filterSlice";

type SortItem = {
  name: string;
  sortProperty: string;
};

export const sortList: SortItem[] = [
  {name: 'популярности (desc)', sortProperty: 'rating' },
  {name: 'популярности (asc)', sortProperty: '-rating' },
  {name: 'цене (desc)', sortProperty: 'price'},
  {name: 'цене (asc)', sortProperty: '-price'},
  {name: 'алфавиту (desc)', sortProperty: 'title'},
  {name: 'алфавиту (asc)', sortProperty: '-title'},
];

export const Sort: React.FC = () => {
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);
  const sortRef = useRef<HTMLDivElement>(null);

  const [openPopap, setOpenPopap] = useState(false);

  const filterSelectionHandler = (obj: SortItem) => {
    dispatch(setSort(obj));
    setOpenPopap(false);
  }

  const openPopapHandler = () => {
    setOpenPopap(!openPopap);
  }

  const sortLabelClazz = openPopap ? 'sort__label open' : 'sort__label';

  // Закрьіваем попап по клику вне области
  useEffect(() => {
    const handlerClickOutsite = (e: any) => {
      if(!e.composedPath().includes(sortRef.current)) {
        setOpenPopap(false);
      }
    }

    document.body.addEventListener('click', handlerClickOutsite);

    return () => document.body.removeEventListener('click', handlerClickOutsite);
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className={sortLabelClazz}>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => openPopapHandler()}>{sort.name}</span>
      </div>
      {
        openPopap && (
          <div className="sort__popup">
            <ul>
              {
                sortList.map((obj, i) => {
                  return (
                    <li 
                      key={i}
                      onClick={() => filterSelectionHandler(obj)}
                      className={sort.sortProperty === obj.sortProperty ? 'active' : ''}
                    >
                      {obj.name}
                    </li>
                  )
                })
              }
            </ul>
          </div>
        )
      }
    </div>
  )
}
