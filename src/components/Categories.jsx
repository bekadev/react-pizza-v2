import React, {useState} from 'react';

const Categories = () => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые',]
  const [activeIndex, setActiveIndex] = useState(0)

  const onClickCategory = (index) => {
    setActiveIndex(index)
  }

  return (<div className="categories">
    <ul>
      {categories.map((val, index) => {
        return <li key={index} onClick={() => onClickCategory(index)}
                   className={activeIndex === index ? 'active' : ''}>{val}</li>
      })}
    </ul>
  </div>);
};

export default Categories;