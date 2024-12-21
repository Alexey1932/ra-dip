import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';
import CheckoutForm from './CheckoutForm';
import '../css/cart.css'; 

const Cart = () => {
    const [items, setItems] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  
    useEffect(() => {      
      const handleStorageChange = () => {
        setItems(JSON.parse(localStorage.getItem('cart')) || []);
      };
  
      window.addEventListener('storage', handleStorageChange);
  
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }, []);

    const handleRemove = (itemId) => {
        const updatedItems = items.filter(item => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(updatedItems)); 
        setItems(updatedItems); 
      };

  const handleQuantityChange = (itemId, quantity) => {
    const updatedItems = items.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: parseInt(quantity, 10) };
      }
      return item;
    });
    setItems(updatedItems);    
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const totalCost = items && items.length
    ? items.reduce((total, item) => total + (item.price * item.quantity), 0)
    : 0;

    return (
        <div className="cart-container">
          <h1 className="cart-title">Корзина</h1>
          <table className="cart-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Название</th>
                <th>Размер</th>
                <th>Кол-во</th>
                <th>Стоимость</th>
                <th>Итого</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={handleRemove}
                  onQuantityChange={handleQuantityChange}
                  index={index} // Добавляем индекс для номера строки
                />
              ))}
            </tbody>
          </table>
          <div className="total-cost">Общая стоимость: {totalCost.toLocaleString()} руб.</div>
          <h1 className="cart-title">Оформить заказ</h1>
          <CheckoutForm items={items} />
        </div>
      );
    };

export default Cart;