import { useState, useEffect, useContext, useRef } from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import Categories from '../componets/categories/Categories';
import { Sort, sortList } from '../componets/sort/Sort';
import PizzaBlock from '../componets/pizzaBlock/PizzaBlock';
import Skeleton from '../componets/skeleton/Skeleton';
import Pagination from '../componets/pagination/Pagination';

import { SearchContext } from '../App';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector(state => state.pizza);
  const {categotyId, sort, currentPage} = useSelector(state => state.filter);
  
  const {searchValue} = useContext(SearchContext);

  const categoryHandler = (id) =>{
    dispatch(setCategoryId(id));
  }

  const onChangePage = number => {
    dispatch(setCurrentPage(number))
  };

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace("-", "");
    const orderSort = sort.sortProperty.includes("-") ? "asc" : "desc";
    const categoty = categotyId > 0 ? `category=${categotyId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(fetchPizzas({
      sortBy,
      orderSort,
      categoty,
      search,
      currentPage
    }));

    window.scrollTo(0,0);

  }

  // Если изменили параметрьі и бьіл первьій рендер
  useEffect(() => {
    if(isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categotyId,
        currentPage,
      })
  
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categotyId, sort.sortProperty, searchValue, currentPage])

  // Если бьіл первьій рендер, то проверяем URL параметрьі и сохраняем в redux
  useEffect(() => {
    if(window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort
        })
      )
    };
    isSearch.current = true;
  }, []);

  // Если бьіл первьій рендер, то запрашиваем пиццьі
  useEffect(() => {
    getPizzas();
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
      {
        status === 'error' ? 
        (
          <div className='content__error-info'>
            <h2>Произошла ошибка!</h2>
            <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
          </div>
        ) :
        (<div className="content__items">{status === 'loading' ? renderSkeletons : renderProducts}</div>)
      }
      

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;