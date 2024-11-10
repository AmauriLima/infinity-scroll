import { useCallback, useEffect, useState } from 'react';

export function usePagination(perPage: number, initialPage = 1) {
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const page = searchParams.get('page');

    if (!page) {
      return initialPage;
    }

    return Number(page);
  });

  const totalPages = Math.ceil(totalItems / perPage);
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  useEffect(() => {
    const url = new URL(window.location.href);

    url.searchParams.set('page', String(currentPage));
    url.searchParams.set('perPage', String(perPage));

    const newUrl = url.origin + url.pathname + '?' + url.searchParams.toString();
    window.history.replaceState({}, '', newUrl);
  }, [currentPage]);

  const setPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const previousPage = useCallback(() => {
    setCurrentPage(prevState => prevState - 1);
  }, []);

  const nextPage = useCallback(() => {
    setCurrentPage(prevState => prevState + 1);
  }, []);

  return {
    currentPage,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    setTotalItems,
    setPage,
    previousPage,
    nextPage,
  };
}
