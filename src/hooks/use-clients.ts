import { ClientsService } from '@/services/clients-service';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { usePagination } from './use-pagination';

export function useClients(perPage = 20) {
  const pagination = usePagination(perPage);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    staleTime: Infinity,
    queryKey: ['clients', { page: pagination.currentPage, perPage }],
    queryFn: async () => {
      const response = await ClientsService.getAll(pagination.currentPage, perPage);

      pagination.setTotalItems(response.items);

      return response;
    },
  });

  useEffect(() => {
    if (pagination.hasNextPage) {
      const nextPage = pagination.currentPage + 1;

      queryClient.prefetchQuery({
        staleTime: Infinity,
        queryKey: ['clients', { page: nextPage, perPage }],
        queryFn: async () => {
          const response = await ClientsService.getAll(nextPage, perPage);

          pagination.setTotalItems(response.items);

          return response;
        },
      });
    }
  }, [pagination.currentPage, pagination.hasNextPage]);

  return {
    clients: data?.data ?? [],
    isLoading,
    pagination,
  };
}
