import { useMemo } from 'react';

/**
 * Custom hook to generate a pagination range for a given current page and total pages.
 *
 * This hook generates a pagination range that includes the current page, its neighbors, and ellipses for large page sets.
 * @param {number} currentPage - The current active page.
 * @param {number} totalPages - The total number of pages available.
 * @returns {Array<number | string>} An array representing the pagination range.
 */
const usePagination = (currentPage: number, totalPages: number) => {
  const displayPages = 3;

  const paginationRange = useMemo(() => {
    const range = [];

    if (totalPages <= displayPages + 2) {
      // Show all pages if total pages are less than or equal to displayPages + 2
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else if (currentPage <= displayPages) {
      // Show first displayPages pages, ellipsis, and last page
      for (let i = 1; i <= displayPages; i++) {
        range.push(i);
      }
      range.push('...');
      range.push(totalPages);
    } else if (currentPage > totalPages - displayPages) {
      // Show first page, ellipsis, and last displayPages pages
      range.push(1);
      range.push('...');
      for (let i = totalPages - displayPages + 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      // Show first page, ellipsis, current page and neighbors, ellipsis, and last page
      range.push(1);
      range.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        range.push(i);
      }
      range.push('...');
      range.push(totalPages);
    }

    return range;
  }, [currentPage, totalPages]);

  return paginationRange;
};

export default usePagination;
