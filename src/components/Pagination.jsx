import PropTypes from 'prop-types';
import '../assets/Pagination.scss';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      {pageNumbers.map(page => (
        <button key={page} onClick={() => onPageChange(page)}
          className={page === currentPage ? 'active' : ''} >
          {page}
        </button>
      ))}
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
