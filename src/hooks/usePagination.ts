import { useState } from 'react';
import { PaginationProps } from '../interfaces/props';

export const usePagination = (filteredItems: any[]): PaginationProps => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= pageCount) {
      setCurrentPage(page);
    }
  };

  return {
    currentPage,
    itemsPerPage,
    pageCount,
    paginatedItems,
    setCurrentPage,
    setItemsPerPage,
    goToPage,
  };
};
