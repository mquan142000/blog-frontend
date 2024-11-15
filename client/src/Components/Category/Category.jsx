import React, { useEffect, useState } from 'react';
import Product from '../Product/Product.jsx';
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import Swal from "sweetalert2";
import '../Category/category.css'; // Thêm CSS ở đây

function Category({ handleClick }) {
  const [category, setCategory] = useState([]);
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('http://localhost:8089/api/categories', {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setCategory(data);
      } catch {
        Swal.fire('Lỗi', 'Không thể tải dữ liệu danh mục.', 'error');
      }
    };
    fetchCategories();
  }, []);

  const handleBtns = (categoryName) => {
    setActiveTab(categoryName);
    setQuery(categoryName === 'All' ? '' : categoryName);
  };

  return (
    <section className="container">
      {/* Search Input and Category Buttons in the same row */}
      <section className="search-category-container">
        {/* Search Input */}
        <div className="search-input-container">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search food..."
            value={query}
          />
          <FaSearch className="search-icon" />
        </div>

        {/* Category Buttons */}
        <div className="category-buttons">
          {['All', 'African', 'American', 'Chinese'].map((name) => (
            <button
              key={name}
              onClick={() => handleBtns(name)}
              className={activeTab === name ? 'active' : ''}
            >
              {name}
            </button>
          ))}
        </div>
      </section>

      {/* Displaying Products */}
      <section className="product-section">
        {category
          .filter((item) => !query || item.title.toLowerCase().includes(query.toLowerCase()))
          .map((item) => (
            <Product key={item.id} item={item} handleClick={handleClick} />
          ))}
      </section>
    </section>
  );
}

export default Category;
