export type PropsType = {
  thumbnail: string;
  name: string;
  onClick: () => void;
};

export interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  pageCount: number;
  paginatedItems: any[];
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (count: number) => void;
  goToPage: (page: number) => void;
}
