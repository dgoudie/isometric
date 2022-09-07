import { useFetchJSON } from './fetch-json';
import useSWR from 'swr';

export default function useBuildId() {
  const fetcher = useFetchJSON();
  const { data } = useSWR<{ buildId?: string }>(`/api/build_id`, fetcher);
  return data?.buildId;
}
