import { ClientsService } from '@/services/clients-service';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useClients(perPage = 20) {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['clients'],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => ClientsService.getAll(pageParam, perPage),
    getNextPageParam: (lastPage, allpages, lastPageParam) => {
      const totalPages = Math.ceil(lastPage.items / perPage);
      const isLastPage = allpages.length === totalPages;

      if (isLastPage) return null;


      return lastPageParam + 1;
    },
  });

  const clients = data?.pages.flatMap((page) => page.data);

  return {
    clients: clients ?? [],
    isLoading,
    nextPage: fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
}
