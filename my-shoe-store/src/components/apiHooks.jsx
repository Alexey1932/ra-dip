import { useState, useEffect } from 'react';

const apiBaseUrl = 'http://localhost:7070/api';

// 
const fetchApi = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

// 
export const useTopSales = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchApi(`${apiBaseUrl}/top-sales`)
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
};

//
export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:7070/api/categories');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let data = await response.json();
        // Добавляем категорию "Все" в начало списка
        data = [{ id: null, title: 'Все' }, ...data];
        setCategories(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

// 
export const useItems = (categoryId = null, searchQuery = '', offset = 0) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        
        let url = `${apiBaseUrl}/items`;
        const params = new URLSearchParams();
        if (categoryId) params.append('categoryId', categoryId);
        if (searchQuery) params.append('q', searchQuery); 
        if (offset) params.append('offset', offset);
        if (params.toString()) url += `?${params}`;

        const data = await fetchApi(url);
        setItems(offset === 0 ? data : [...items, ...data]);
        setHasMore(data.length === 6); 
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [categoryId, searchQuery, offset]); // Перезапускаем эффект при изменении categoryId, searchQuery или offset

  return { items, loading, error, hasMore };
};

// 
export const useItem = (id) => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:7070/api/items/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setItem(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchItem(); // Запускаем запрос, только если ID предоставлен
  }, [id]);

  return { item, loading, error };
};
