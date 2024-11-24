import PropTypes from 'prop-types';
import '../assets/ProductList.scss';

function ProductList({ products, onEdit, onDelete }) {
  return (
    <div className="product-list">
      <h2>Product List</h2>
      {products.map(product => (
        <div className="product-item" key={product.id}>
          <img className="product-image" src={product.image} alt={product.title} />
          <div className="product-details">
            <span><strong>ID:</strong> {product.id}</span>
            <span><strong>Title:</strong> {product.title}</span>
            <span><strong>Price:</strong> ${product.price.toFixed(2)}</span>
            <span><strong>Category:</strong> {product.category}</span>
          </div>
          <div className="product-actions">
            <button className="edit-btn" onClick={() => onEdit(product)}>Edit</button>
            <button className="delete-btn" onClick={() => onDelete(product.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProductList;
