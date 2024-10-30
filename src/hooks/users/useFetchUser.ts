import { useQuery } from '@tanstack/react-query';
import userApi from '../../apis/users.api';

export function USER_QUERY_KEY(userId: number): ['users', number] {
  return ['users', userId];
}

export default function useFetchUser(userId: number | null) {
  const { isFetching, isLoading, data, isSuccess } = useQuery({
    queryKey: USER_QUERY_KEY(userId!),
    queryFn: async () => {
      const { data } = await userApi.findUser(userId!);
      return data.result;
    },
    enabled: !!userId,
    retry: 0,
    staleTime: 1000 * 60 * 60,
  });

  return { isFetching, isLoading, data, isSuccess };
}
