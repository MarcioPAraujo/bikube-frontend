import { useMemo } from 'react';

/**
 * Custom hook to generate a pagination range based on the current page and total pages.
 * It displays a limited number of pages around the current page, with ellipses for skipped pages.
 * @param currentPage - The current page number.
 * @param totalPages - The total number of pages.
 * @returns An array representing the pagination range.
 *
 * @example
 * const pagination = usePagination(3, 10);
 * // Returns [1, '...', 2, 3, 4, '...', 10]
 */
const usePagination = (currentPage: number, totalPages: number) => {
  const displayPages = 3;

  const getRange = (start: number, end: number) => {
    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  const paginationRange = useMemo(() => {
    if (totalPages <= displayPages + 2) {
      return getRange(1, totalPages);
    }

    if (currentPage === displayPages) {
      // Show first displayPages + 1 pages, ellipsis, and last page
      return [...getRange(1, displayPages + 1), '...', totalPages];
    }

    if (currentPage < displayPages) {
      return [...getRange(1, displayPages + 1), '...', totalPages];
    }

    if (currentPage > totalPages - displayPages) {
      return [1, '...', ...getRange(totalPages - displayPages, totalPages)];
    }

    return [
      1,
      '...',
      ...getRange(currentPage - 1, currentPage + 1),
      '...',
      totalPages,
    ];
  }, [currentPage, totalPages]);

  return paginationRange;
};

export default usePagination;
