import { useQuery } from '@tanstack/react-query';
import userApi from '../../apis/users.api';

export default function useLoginWithKakaoCode({
  code,
  onSuccess,
}: {
  code: string;
  onSuccess?: (
    userId: number,
    accessToken: string,
    refreshToken: string,
  ) => void;
}) {
  const { isLoading, data } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const { data } = await userApi.signup(code);
      const { userId, accessToken, refreshToken } = data.result;
      if (onSuccess) onSuccess(userId, accessToken, refreshToken);
      return { userId, accessToken, refreshToken };
    },
    enabled: !!code,
  });

  return { isLoading, data };
}
