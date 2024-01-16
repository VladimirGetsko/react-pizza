import { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Categories from '../componets/categories/Categories';
import { SortPopup } from '../componets/sort/Sort';
import PizzaBlock from '../componets/pizzaBlock/PizzaBlock';
import Skeleton from '../componets/skeleton/Skeleton';
import Pagination from '../componets/pagination/Pagination';

import { useAppDispatch } from '../redux/store';

import { selectFilter } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/pizza/selectors';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const {categotyId, sort, currentPage, searchValue} = useSelector(selectFilter);

  const categoryHandler = useCallback((id: number) =>{
    dispatch(setCategoryId(id));
  }, [])

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace("-", "");
    const orderSort = sort.sortProperty.includes("-") ? "asc" : "desc";
    const categoty = categotyId > 0 ? `category=${categotyId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        sortBy,
        orderSort,
        categoty,
        search,
        currentPage: String(currentPage),
    }));

    window.scrollTo(0,0);

  }

  // Если изменили параметрьі и бьіл первьій рендер
  // useEffect(() => {
  //   if(isMounted.current) {
  //     const params = ({
  //       sortProperty: sort.sortProperty,
  //       categotyId: categotyId > 0 ? categotyId : null,
  //       currentPage,
  //     })

  //     const queryString = qs.stringify(params, {skipNulls: true})
  
  //     navigate(`/?${queryString}`);
  //   }
   
  //   if(!window.location.search) {
  //     dispatch(fetchPizzas({} as SearchPizzaParams))
  //   }
  // }, [categotyId, sort.sortProperty, searchValue, currentPage])

  // Если бьіл первьій рендер, то проверяем URL параметрьі и сохраняем в redux
  // useEffect(() => {
  //   if(window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
  //     const sort = sortList.find(obj => obj.sortProperty === params.sortBy);

  //     dispatch(setFilters({
  //       searchValue: params.search,
  //       categotyId: Number(params.categoty),
  //       currentPage: Number(params.currentPage),
  //       sort: sort || sortList[0],
  //     }));
  //   };
  //   isSearch.current = true;
  // }, []);

  // Если бьіл первьій рендер, то запрашиваем пиццьі
  useEffect(() => {
    getPizzas();
  }, [categotyId, sort.sortProperty, searchValue, currentPage]);

  const renderSkeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
  // const filteredProducts = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()));
  const renderProducts = items.map((item: any) => {
    return (
      <PizzaBlock
        key={item.id}
        {...item}
       />
    )
  });

  return (
    <div className="container">
      <div className="content__top">
        <Categories 
          value={categotyId} 
          categoryHandler={categoryHandler} 
        />
        <SortPopup value={sort} />
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