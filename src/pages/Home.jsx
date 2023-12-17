import React, {useContext, useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort, {list} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setFilters, setPageCount} from "../redux/slices/filterSlice";
import qs from 'qs'
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Home = () => {
  const {categoryId, sort, pageCount} = useSelector(state => state.filter)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {searchValue} = useContext(SearchContext)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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

  useEffect(() => {
    setIsLoading(true)
    const order = sort.sort.includes('-' ? 'asc' : 'desc')
    const sortBy = sort.sort.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    axios.get(`https://65759a74b2fbb8f6509d43e8.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
      .then(res => {
        setItems(res.data)
        setIsLoading(false)
      })
    window.scroll(0, 0)
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
      <div className="content__items">
        {
          isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>) : items.map(obj =>
            <PizzaBlock {...obj} key={obj.id}/>)
        }
      </div>
      <Pagination pageCount={pageCount} onChangePage={onChangePage}/>
    </div>
  );
};

export default Home;