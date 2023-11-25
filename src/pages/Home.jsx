import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId } from '../redux/slices/filterSlice';
import Categories from '../componets/categories/Categories';
import Sort from '../componets/sort/Sort';
import PizzaBlock from '../componets/pizzaBlock/PizzaBlock';
import Skeleton from '../componets/skeleton/Skeleton';
import Pagination from '../componets/pagination/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const dispatch = useDispatch();
  const {categotyId, sort} = useSelector(state => state.filter);
  
  const {searchValue} = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const categoryHandler = (id) =>{
    dispatch(setCategoryId(id));
  }

  useEffect(() => {
    setIsLoading(true);

    const valueId = categotyId > 0 ? `category=${categotyId}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const orderSort = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    // fetch(`https://654f76e5358230d8f0cd58cf.mockapi.io/items?page=${currentPage}&limit=4&${valueId}&sortBy=${sortBy}&order=${orderSort}${search}`)
    // .then(res => res.json())
    // .then(data => {
    //   setItems(data);
    //   setIsLoading(false);
    // })

    axios.get(`https://654f76e5358230d8f0cd58cf.mockapi.io/items?page=${currentPage}&limit=4&${valueId}&sortBy=${sortBy}&order=${orderSort}${search}`)
    .then(res => {
      setItems(res.data);
      setIsLoading(false);
    })

      window.scrollTo(0,0)
    }, [categotyId, sort.sortProperty, searchValue, currentPage]);

  const renderSkeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
  // const filteredProducts = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()));
  const renderProducts = items.map(item => <PizzaBlock key={item.id} {...item} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories 
          value={categotyId} 
          categoryHandler={categoryHandler} 
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? renderSkeletons
          : renderProducts
        }
      </div>

      <Pagination onChangePage={number => setCurrentPage(number)} />
    </div>
  );
}

export default Home;