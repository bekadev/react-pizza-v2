import React, {useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";

const Home = ({searchValue}) => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [categoryId, setCategoryId] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [sort, setSort] = useState({
    name: 'популярности', sort: 'rating'
  })


  useEffect(() => {
    setIsLoading(true)

    const order = sort.sort.includes('-' ? 'asc' : 'desc')
    const sortBy = sort.sort.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    fetch(
      `https://65759a74b2fbb8f6509d43e8.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    ).then(res => {
      return res.json()
    })
      .then(arr => {
        setItems(arr)
        setIsLoading(false)
      })
    window.scroll(0, 0)
  }, [categoryId, sort, searchValue, currentPage])

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
        <Categories categoryId={categoryId} setCategoryId={(i) => setCategoryId(i)}/>
        <Sort setSort={(i) => setSort(i)} sort={sort}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>) : items.map(obj =>
            <PizzaBlock {...obj} key={obj.id}/>)
        }
      </div>
      <Pagination onChangePage={(n) => setCurrentPage(n)}/>
    </div>
  );
};

export default Home;