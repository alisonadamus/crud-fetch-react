import { useEffect, useState } from 'react';
import Pagination from './components/Pagination';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [currentProduct, setCurrentProduct] = useState(null);

  // GET
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => {
        console.log('GET /products, status:', response.status);
        return response.json();
      })
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const totalPages = Math.ceil(products.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentProducts = products.slice(startIndex, startIndex + pageSize);

  const handleSubmit = product => {
    if (currentProduct) {
      // PUT
      fetch(`https://fakestoreapi.com/products/${currentProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      })
        .then(response => {
          console.log(`PUT /products/${currentProduct.id}, status:`, response.status);
          return response.json();
        })
        .then(updatedProduct => {
          setProducts(products.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
          setCurrentProduct(null);
        })
        .catch(err => console.error('Error updating product:', err));
    } else {
      // POST
      fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      })
        .then(response => {
          console.log('POST /products,5 status:', response.status);
          return response.json();
        })
        .then(newProduct => {
          setProducts([...products, newProduct]);
          setCurrentPage(totalPages);
        })
        .catch(err => console.error('Error adding product:', err));
    }
  };

  // DELETE
  const handleDelete = id => {
    fetch(`https://fakestoreapi.com/products/${id}`, { method: 'DELETE' })
      .then(response => {
        console.log(`DELETE /products/${id} status:`, response.status);
      })
      .then(() => {
        setProducts(products.filter(p => p.id !== id));
        if (currentPage > 1 && currentProducts.length === 1) {
          setCurrentPage(currentPage - 1);
        }
      })
      .catch(err => console.error('Error deleting product:', err));
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  return (
    <div>
      <ProductForm
        onSubmit={handleSubmit}
        currentProduct={currentProduct}
        clearCurrentProduct={() => setCurrentProduct(null)}
      />
      <ProductList
        products={currentProducts}
        onEdit={setCurrentProduct}
        onDelete={handleDelete}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
