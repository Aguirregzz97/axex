import { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import utils from "../utils/utils"

export type PaginationResponse<T> = {
  data: {
    pageSize: number
    startIndex: number
    page: number
    totalDataCount: number
    data: T[]
  }
}

type QueryKey = [string, { queryParams?: Record<string, any> }]

const getUpdatedQueryKey = (
  queryKey: QueryKey,
  queryParams: Record<string, any>,
): QueryKey => {
  const [key, { queryParams: originalQueryParams }] = queryKey
  const updatedKey: QueryKey = [
    key,
    { queryParams: { ...originalQueryParams, ...queryParams } },
  ]
  return updatedKey
}

function usePagination<Element extends {}>(
  // eslint-disable-next-line no-unused-vars
  query: (queryParams: string) => Promise<PaginationResponse<Element>>,
  queryKey: QueryKey,
) {
  const [tableQueryParams, setTableQueryParams] = useState<Record<string, any>>(
    {
      page: 1,
      pageSize: 7,
      search: "",
    },
  )

  const {
    data: response,
    isRefetching,
    isLoading,
    error,
    isError,
  } = useQuery<
    PaginationResponse<Element>,
    AxiosError,
    PaginationResponse<Element>
  >(
    getUpdatedQueryKey(queryKey, tableQueryParams),
    ({ queryKey: [, { queryParams }] }: any) => {
      return query(utils.getQueryParamsStr(queryParams))
    },
    {
      keepPreviousData: true,
      refetchOnMount: false,
    },
  )

  useEffect(() => {
    if (isError && error) {
      // eslint-disable-next-line
      console.error(error)
    }
  }, [error, isError])

  const fetchData = (pageParam: number, pageSize: number, search: string) => {
    const page = pageParam + 1
    setTableQueryParams({ page, pageSize, search })
  }

  const pageCount = Math.ceil(
    (response?.data.totalDataCount || 0) / tableQueryParams.pageSize,
  )

  return {
    data: response?.data.data,
    loading: isLoading || isRefetching,
    pageCount,
    page: tableQueryParams.page - 1,
    pageSize: tableQueryParams.pageSize,
    search: tableQueryParams.search,
    totalDataCount: response?.data.totalDataCount || 0,
    fetchData,
  }
}

export default usePagination
