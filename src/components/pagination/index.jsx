import React from "react";

function Pagination({ currentPage, totalPages = 10, onPageChange }) {
  function generateNoOfPages() {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  return (
    <div>
      <button
        className="btn-nav"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {generateNoOfPages().map((pageNo) => (
        <button
          className={`btn ${currentPage === pageNo ? "active" : ""}`}
          key={pageNo}
          onClick={() => onPageChange(pageNo)}
        >
          {pageNo}
        </button>
      ))}
      <button
        className="btn-nav"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
