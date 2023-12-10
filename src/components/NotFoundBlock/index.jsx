import React from 'react';
import s from './index.module.scss'

const NotFoundBlock = () => {

  return (
    <div className={s.root}>
      <h1>
        <span>😕</span>
        <br/>
        <h1>Ничего не найдено!</h1>
        <p>к сожаление данная страница отсутствует в нашем интернет-магазине</p>
      </h1>
    </div>
  );
};

export default NotFoundBlock;