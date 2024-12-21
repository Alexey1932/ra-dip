import React, { useState } from 'react';
import '../css/checkoutform.css'; 

const CheckoutForm = ({ items }) => {
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [agree, setAgree] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const order = {
      owner: {
        phone,
        address,
      },
      items: items.map(item => ({
        id: item.id,
        price: item.price,
        count: item.quantity,
      })),
    };

    try {
      const response = await fetch('http://localhost:7070/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        // Очищаем корзину
        setPhone('');
        setAddress('');
        localStorage.removeItem('cart');
        // Отображаем сообщение об успехе
        alert('Ваш заказ успешно оформлен!');
      }
    } catch (error) {
      console.error('Ошибка при оформлении заказа: ', error);
    }
  };

  return (
      <form onSubmit={handleSubmit}>
      <h5>Телефон</h5>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Ваш телефон"
        required
      />
      <h5>Адрес доставки</h5>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Адрес доставки"
        required
      />
      <div className="checkbox-container">
        <input
          type="checkbox"
          id="agree-checkbox"
          checked={agree}
          onChange={() => setAgree(!agree)}
          required
        />
        <label htmlFor="agree-checkbox">Согласен с правилами доставки</label>
      </div>
      <button type="submit">Оформить</button>
    </form>
  );
};

export default CheckoutForm;
