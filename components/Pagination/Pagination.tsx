'use client';

import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={selectedItem => onChange(selectedItem.selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      pageLinkClassName=""
      activeClassName={css.active}
      previousClassName=""
      nextClassName=""
      previousLinkClassName=""
      nextLinkClassName=""
      disabledClassName={css.disabled}
      breakClassName=""
      breakLinkClassName=""
      previousLabel="←"
      nextLabel="→"
    />
  );
}
