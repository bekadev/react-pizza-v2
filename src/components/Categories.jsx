import React from 'react';

const Categories = ({categoryId, setCategoryId}) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые',]

  return (<div className="categories">
    <ul>
      {categories.map((val, i) => {
        return <li key={i} onClick={() => setCategoryId(i)}
                   className={categoryId === i ? 'active' : ''}>{val}</li>
      })}
    </ul>
  </div>);
};

export default Categories;