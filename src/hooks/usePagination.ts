import { useState } from 'react';
import { PaginationProp } from '../interfaces/props';
import { Video } from '../interfaces/video';

export const usePagination = (filteredItems: Video[]): PaginationProp => {
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
