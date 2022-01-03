import { AxiosError } from "axios"
import { QueryKey, QueryFunction, UseQueryOptions, useQuery } from "react-query"

function useCustomQuery<Response, Error = AxiosError>(
  queryKey: QueryKey,
  queryFn: QueryFunction<Response>,
  options?: UseQueryOptions<Response, Error, Response>,
) {
  return useQuery<Response, Error, Response>(queryKey, queryFn, options)
}

export default useCustomQuery
