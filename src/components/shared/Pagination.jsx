"use client";

import React from "react";
import { Button } from "@heroui/react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  // Generate page numbers to show (maximum 5 buttons)
  const getPageNumbers = () => {
    const maxButtons = 5;
    let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let end = start + maxButtons - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxButtons + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
      {/* Previous Button */}
      <Button
        variant="bordered"
        isDisabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded-xl font-medium border-default-300 hover:border-danger hover:text-danger transition-colors"
      >
        Previous
      </Button>

      {/* Page Numbers */}
      {pageNumbers.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "solid" : "bordered"}
          color={page === currentPage ? "danger" : "default"}
          onClick={() => onPageChange(page)}
          className={`min-w-10 w-10 h-10 p-0 rounded-xl font-semibold transition-all ${
            page === currentPage
              ? "bg-red-600 text-white shadow-md shadow-red-500/20"
              : "border-default-300 hover:border-danger hover:text-danger text-default-600"
          }`}
        >
          {page}
        </Button>
      ))}

      {/* Next Button */}
      <Button
        variant="bordered"
        isDisabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded-xl font-medium border-default-300 hover:border-danger hover:text-danger transition-colors"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
