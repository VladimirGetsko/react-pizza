import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try{
        const { data } = await axios.get('https://654f76e5358230d8f0cd58cf.mockapi.io/items/' + id);
        setPizza(data);
      } catch(error) {
        alert('Ошибка при получении пиццы')
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if(!pizza) {
    return <>'Загрузка...'</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt={pizza.title} />
      <h2>{pizza.title}</h2>
      <p>{pizza.price} ₴</p>
    </div>
  )
};

export default FullPizza;
