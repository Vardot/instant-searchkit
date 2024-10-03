import React, {useState} from 'react';
import {
  usePagination, UsePaginationProps,
} from 'react-instantsearch';

function DynamicPagination(props: UsePaginationProps) {
  const {
    pages,
    currentRefinement,
    nbPages,
    isFirstPage,
    isLastPage,
    refine,
    createURL,
  } = usePagination(props);
  const firstPageIndex = 0;
  const previousPageIndex = currentRefinement - 1;
  const nextPageIndex = currentRefinement + 1;
  const lastPageIndex = nbPages - 1;

  const scrollFunction = () => {
    const element = document.getElementById("root");
    if (element) {
      element.scrollIntoView({behavior: 'smooth'});
    }
  };

  return (nbPages > 1 ? (
    <ul className={'ais-Pagination-list pagination'}>
    <PaginationItem
      isDisabled={isFirstPage}
      isNext={false}
      isPrevious={true}
      selectedItem={false}
      href={createURL(previousPageIndex)}
      onClick={() => {
        refine(previousPageIndex);
        scrollFunction();
      }}
    >
      ‹
    </PaginationItem>

    {pages.map((page) => {
      const label = page + 1;

      return (<PaginationItem
        key={page}
        isDisabled={false}
        isPrevious={false}
        isNext={false}
        aria-label={`Page ${label}`}
        href={createURL(page)}
        onClick={() => {
          refine(page);
          scrollFunction();
        }}
        selectedItem={page === currentRefinement}
      >
        {label}
      </PaginationItem>);
    })}


    <PaginationItem
      isDisabled={isLastPage}
      isPrevious={false}
      isNext={true}
      selectedItem={false}
      href={createURL(nextPageIndex)}
      onClick={() => {
        refine(nextPageIndex);
        scrollFunction();
      }}
    >
      ›
    </PaginationItem>

  </ul>) : null);
}

type PaginationItemProps = Omit<React.ComponentProps<'a'>, 'onClick'> & {
  onClick: NonNullable<React.ComponentProps<'a'>['onClick']>;
  isDisabled: boolean;
  isPrevious: boolean;
  isNext: boolean;
  selectedItem: boolean;
};

function PaginationItem({
                          isDisabled,
                          isPrevious,
                          isNext,
                          selectedItem,
                          href,
                          onClick,
                          ...props
                        }: PaginationItemProps) {


  if (isDisabled) {
    return (<li
      className={`ais-Pagination-item page-item ais-Pagination-item--disabled ${isPrevious ? "ais-Pagination-item--previousPage" : ""}${isNext ? "ais-Pagination-item--nextPage" : ""}`}>
      <span className={'ais-Pagination-link page-link'}
            aria-label={`${isPrevious ? "Previous page" : ""} ${isNext ? "Next Page" : ""}`} {...props} />
    </li>);
  }

  return (<li
    className={`ais-Pagination-item page-item ais-Pagination-item--page ${isPrevious ? "ais-Pagination-item--previousPage" : ""}${isNext ? "ais-Pagination-item--nextPage" : ""}${selectedItem ? "is-active active" : ""}`}
  >
    <a
      className={'ais-Pagination-link page-link'}
      href={href}
      onClick={(event) => {
        if (isModifierClick(event)) {
          return;
        }

        event.preventDefault();

        onClick(event);
      }}
      {...props}
    />
  </li>);
}

function isModifierClick(event: React.MouseEvent) {
  const isMiddleClick = event.button === 1;

  return Boolean(isMiddleClick || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey);
}

export default DynamicPagination;