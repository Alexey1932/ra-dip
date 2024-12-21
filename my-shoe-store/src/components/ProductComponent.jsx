import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useItem } from './apiHooks';
import '../css/product.css';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { item, loading, error } = useItem(id);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id && cartItem.size === selectedSize);
  
    if (existingItemIndex > -1) {
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      cartItems.push({
        id: item.id,
        name: item.title,
        size: selectedSize,
        price: item.price,
        quantity,
        image: item.images[0] // Добавим изображение для отображения в корзине
      });
    }
  
    localStorage.setItem('cart', JSON.stringify(cartItems));
    navigate('/cart'); // Обновим путь на /cart, так как .html не нужен
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }

  if (!item) {
    return <div>Товар не найден.</div>;
  }

  const availableSizes = item.sizes.filter((size) => size.available);
  const hasSizes = availableSizes.length > 0; 

 return (
  <div className="product-container">
    <div className="product-image-container">
      <img src={item.images[0]} alt={item.title} className="product-image" />
    </div>
    <div className="product-details">
      <h1>{item.title}</h1>
      <table className="product-table">
        <tbody>
          <tr>
            <td>Артикул</td>
            <td>{item.sku || ''}</td>
          </tr>
          <tr>
            <td>Производитель</td>
            <td>{item.manufacturer || ''}</td>
          </tr>
          <tr>
            <td>Цвет</td>
            <td>{item.color || ''}</td>
          </tr>
          <tr>
            <td>Материалы</td>
            <td>{item.material || ''}</td>
          </tr>
          <tr>
            <td>Сезон</td>
            <td>{item.season || ''}</td>
          </tr>
          <tr>
            <td>Повод</td>
            <td>{item.reason || ''}</td>
          </tr>
        </tbody>
      </table>
      <div className="product-sizes">
        {hasSizes && availableSizes.map((size) => (
          <button
            key={size.size}
            className={`size-option ${selectedSize === size.size ? 'selected' : ''}`}
            onClick={() => handleSizeSelection(size.size)}
          >
            {size.size} US
          </button>
        ))}
      </div>
      {hasSizes && (
        <div className="quantity-selector">
          <input
            type="number"
            className="quantity-input"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Math.min(10, Number(e.target.value))))}
            min="1"
            max="10"
          />
          <button
            className="add-to-cart-button"
            onClick={handleAddToCart}
            disabled={!selectedSize || quantity < 1 || quantity > 10}
          >
            В корзину
          </button>
        </div>
      )}
    </div>
  </div>
);
};

export default Product;
