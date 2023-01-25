import React from "react";

const Pagination = ({ totalElements, elementsPerPage, onBtnClick }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalElements / elementsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav
      className="flex justify-center mt-10 items-center mb-5"
      aria-label="Pagination"
    >
      {pageNumbers.map((pageNumber) => (
        <a
          href="#!"
          onClick={() => onBtnClick(pageNumber)}
          key={pageNumber}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {pageNumber}
        </a>
      ))}
    </nav>
  );
};

export default Pagination;
