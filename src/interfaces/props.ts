import { Video } from './video';

export type PropsType = {
  thumbnail: string;
  name: string;
  onClick: () => void;
};

export interface PaginationProp {
  currentPage: number;
  itemsPerPage: number;
  pageCount: number;
  paginatedItems: Video[];
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (count: number) => void;
  goToPage: (page: number) => void;
}
