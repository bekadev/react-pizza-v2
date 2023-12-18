import React, {useEffect} from 'react';
import Categories from "../components/Categories";
import Sort, {list} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setFilters, setPageCount} from "../redux/slices/filterSlice";
import qs from 'qs'
import {Link, useNavigate} from "react-router-dom";
import {fetchPizzas} from "../redux/slices/pizzasSlice";

const Home = () => {
  const {categoryId, sort, pageCount, searchValue} = useSelector(state => state.filter)
  const {items, status} = useSelector(state => state.pizza)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }
  const onChangePage = (p) => {
    dispatch(setPageCount(p))
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = list.find(obj => obj.sort === params.sort)
      dispatch(setFilters({...params, sort}))
    }
  }, [])

  const getPizzas = async () => {
    const order = sort.sort.includes('-' ? 'asc' : 'desc')
    const sortBy = sort.sort.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    dispatch(fetchPizzas({
      order, sortBy, category, search, pageCount
    }))

    window.scroll(0, 0)
  }

  useEffect(() => {
    if (window.location.search) {
      getPizzas()
    }
  }, [categoryId, sort.sort, searchValue, pageCount])

  useEffect(() => {
    const queryString = qs.stringify({
      sort: sort.sort,
      categoryId,
      pageCount
    })

    navigate(`?${queryString}`)
  }, [categoryId, sort.sort, pageCount]);

  // js variant search functional

  // const pizzas = items.filter(obj => {
  //   if (obj.title.toLowerCase().includes(searchValue)) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }).map(obj => <PizzaBlock {...obj} key={obj.id}/>)
  // const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

  return (
    <div className='container'>
      <div className="content__top">
        <Categories categoryId={categoryId} setCategoryId={onChangeCategory}/>
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {
        status === 'error' ? <div>
          <h2>Произошла ошибка 😕</h2>
          <p>Не удалось получить пиццы.</p>
        </div> : <div className="content__items">
          {
            status === 'loading'
              ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
              : items.map(obj => <Link key={obj.id} to={`/pizza/${obj.id}`}><PizzaBlock {...obj}/></Link>)
          }
        </div>
      }
      <Pagination pageCount={pageCount} onChangePage={onChangePage}/>
    </div>
  );
};

export default Home;