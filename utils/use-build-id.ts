import { useFetchJSONWith403Redirect } from './fetch-with-403-redirect';
import useSWR from 'swr';

export default function useBuildId() {
  const fetcher = useFetchJSONWith403Redirect();
  const { data } = useSWR<{ buildId?: string }>(`/api/build_id`, fetcher);
  return data?.buildId;
}
