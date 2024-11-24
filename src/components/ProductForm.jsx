import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import '../assets/ProductForm.scss';

function ProductForm({ onSubmit, currentProduct, clearCurrentProduct }) {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    image: '',
  });

  useEffect(() => {
    if (currentProduct) {
      setFormData({
        title: currentProduct.title,
        price: currentProduct.price,
        category: currentProduct.category,
        image: currentProduct.image,
      });
    } else {
      setFormData({
        title: '',
        price: '',
        category: '',
        image: '',
      });
    }
  }, [currentProduct]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...formData, price: parseFloat(formData.price) });
    setFormData({
      title: '',
      price: '',
      category: '',
      image: '',
    });
  };

  return (
    <div className="product-form">
      <h2>{currentProduct ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{currentProduct ? 'Update' : 'Add'}</button>
        {currentProduct && (
          <button type="button" onClick={clearCurrentProduct} className="cancel-button">
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

ProductForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentProduct: PropTypes.object,
  clearCurrentProduct: PropTypes.func.isRequired,
};

export default ProductForm;
