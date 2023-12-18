import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const FullPizza = () => {
  const [pizza, setPizza] = useState()
  const {id} = useParams()
  const {navigate} = useNavigate()

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const {data} = await axios.get('https://65759a74b2fbb8f6509d43e8.mockapi.io/items/' + id)
        setPizza(data)
      } catch (error) {
        alert('Error')
        navigate()
      }
    }

    fetchPizza()
  }, [])

  if (!pizza) {
    return 'Loading...'
  }

  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt=""/>
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
};

export default FullPizza;