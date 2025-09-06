/* eslint-disable max-len */
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { theme } from '@/styles/theme';
import usePagination from '@/hooks/usePagination';
import { memo } from 'react';
import React from 'react';
import {
  PaginationContainer,
  NaviagtionButton,
  PageNumber,
  Ellipsis,
  PaginationText,
} from './styles';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalOfData: number;
  totalPaginatedData: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * This component must receive the properties returned by the usepaginationRange hook, or backend pagination properties
 *
 * @param {number} currentPage - represent the page that is being rendered
 * @param {number} totalPages - represents the number of pages that can be paginated.
 * @param {number} totalOfData - represents the total of items.
 * @param {number} totalPaginatedData - represents the number of rows that has been paginated.
 * @param {SetStateAction} setCurrentPage - state action to update the current page as the the navigation occur.
 * @returns
 */

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalOfData,
  totalPaginatedData,
  setCurrentPage,
}) => {
  const paginationRange = usePagination(currentPage, totalPages);
  return (
    <PaginationContainer>
      <PaginationText>
        Mostrando {totalPaginatedData} de {totalOfData}
      </PaginationText>
      <NaviagtionButton
        id="previous-page"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={currentPage === 1 ? 'disabled' : ''}
      >
        <FaAngleLeft size={15} color={theme.colors.GRAY.hex_1b1b1b} />
      </NaviagtionButton>
      {paginationRange &&
        paginationRange.map((page, index) => {
          if (page === '...') {
            return <Ellipsis key={index}>...</Ellipsis>;
          }
          return (
            <PageNumber
              id={`index-${index}`}
              key={index}
              onClick={() => typeof page === 'number' && setCurrentPage(page)}
              disabled={currentPage === page}
              className={currentPage === page ? 'current' : ''}
            >
              {page}
            </PageNumber>
          );
        })}
      <NaviagtionButton
        id="next-page"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={currentPage >= totalPages ? 'disabled' : ''}
      >
        <FaAngleRight size={15} color={theme.colors.GRAY.hex_1b1b1b} />
      </NaviagtionButton>
    </PaginationContainer>
  );
};
export default memo(Pagination);
