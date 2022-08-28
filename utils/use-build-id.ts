import useFetchWith403Redirect from './fetch-with-403-redirect';
import useSWR from 'swr';

export default function useBuildId() {
  const fetcher = useFetchWith403Redirect();
  const { data } = useSWR<{ buildId?: string }>(`/api/build_id`, fetcher);
  return data?.buildId;
}
