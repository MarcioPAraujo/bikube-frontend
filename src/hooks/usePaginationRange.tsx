/* eslint-disable comma-spacing */
/* eslint-disable prettier/prettier */
import { useState } from 'react';

/**
 * Custom hook to manage pagination for a given dataset.
 *
 * @param {T[]} data - The dataset to paginate.
 * @param {number} rowsPerPage - The number of rows per page.
 * @returns {Object} An object containing pagination state and methods.
 */
const usePaginationRange = <T,>(data: T[], rowsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startRow = (currentPage - 1) * rowsPerPage;
  const paginatedRows = Math.min(startRow + rowsPerPage, data.length);
  const currentRows = data.slice(startRow, paginatedRows);
  return {
    setCurrentPage,
    paginatedRows,
    currentPage,
    totalPages,
    currentRows,
  };
};

export default usePaginationRange;
