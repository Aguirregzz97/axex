import { ChevronDownIcon, ChevronUpIcon, Icon } from "@chakra-ui/icons"
import {
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  Box,
  IconButton,
  Text,
  Select,
  Input,
  Spinner,
} from "@chakra-ui/react"
import React, { useEffect } from "react"
import { RiArrowLeftFill, RiArrowRightFill } from "react-icons/ri"
import {
  HeaderGroup,
  Row,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table"
import TableFilter from "../TableFilter"

type AxexTableProps = {
  columns: any
  data: any
  clickableRows?: boolean
  // eslint-disable-next-line no-unused-vars
  onRowClicked?: (id: string) => void
  loading: boolean
  page: number
  pageSizeProp: number
  pageCount: number
  search: string
  totalDataCount: number
  title?: string
  // eslint-disable-next-line no-unused-vars
  fetchData: (page: number, pageSize: number, search: string) => void
}

const AxexTable: React.FC<AxexTableProps> = ({
  columns,
  data,
  clickableRows = false,
  onRowClicked = () => {},
  loading,
  pageSizeProp,
  pageCount: controlledPageCount,
  fetchData,
  page: pageProp,
  search,
  totalDataCount,
  title = "",
}) => {
  if (!data) {
    return <></>
  }

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: pageProp,
        pageSize: pageSizeProp,
        globalFilter: search,
      },
      manualPagination: true,
      pageCount: controlledPageCount,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
    page,
    canNextPage,
    canPreviousPage,
    nextPage,
    previousPage,
    pageOptions,
    setPageSize,
    gotoPage,
  } = tableInstance

  const getSortingIcon = (column: HeaderGroup<Object>) => {
    if (column.isSorted) {
      return column.isSortedDesc ? (
        <ChevronDownIcon color="#f6f6f6" mr="5px" />
      ) : (
        <ChevronUpIcon color="#f6f6f6" mr="5px" />
      )
    }
    return <></>
  }

  useEffect(() => {
    fetchData(pageIndex, pageSize, globalFilter)
  }, [pageIndex, pageSize, globalFilter])

  return (
    <>
      <TableFilter
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        gotoPage={gotoPage}
        totalDataCount={totalDataCount}
        title={title}
      />
      <Box overflowX="scroll" opacity={loading ? "0.7" : ""}>
        <Table position="relative" {...getTableProps()}>
          {loading && (
            <Spinner size="lg" position="absolute" left="50%" top="50%" />
          )}
          <Thead bg="#1e6e7d">
            {headerGroups.map((headerGroup) => {
              return (
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => {
                    return (
                      <Th
                        padding="20px"
                        borderTopLeftRadius={index === 0 ? "10px" : ""}
                        borderTopRightRadius={
                          index === headerGroup.headers.length - 1 ? "10px" : ""
                        }
                        color="#f6f6f6"
                        {...column.getHeaderProps(
                          column.getSortByToggleProps(),
                        )}
                      >
                        {getSortingIcon(column)}
                        {column.render("Header")}
                      </Th>
                    )
                  })}
                </Tr>
              )
            })}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row: Row<object>, index) => {
              prepareRow(row)
              return (
                <Tr
                  bg={index % 2 === 0 ? "#edf2f7" : ""}
                  onClick={() => {
                    const rowClicked: any = row.original
                    onRowClicked(rowClicked._id)
                  }}
                  _hover={{
                    cursor: clickableRows ? "pointer" : "",
                    bg: clickableRows ? "#c3d1df !important" : "",
                  }}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => {
                    return (
                      <Td padding="10px 20px" {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </Td>
                    )
                  })}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          borderBottomRadius="10px"
          padding="14px 24px"
          bg="#1e6e7d"
        >
          <Box>
            <Select
              color="#f6f6f6"
              borderColor="#f6f6f6"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
              }}
            >
              {[7, 14, 21, 28, 35, 42, 49, 56, 63, 70].map((ps) => {
                return (
                  <option key={ps} value={ps}>
                    Show {ps}
                  </option>
                )
              })}
            </Select>
          </Box>
          <Box display="inline-block">
            <Text display="inline-block" mr="10px" color="#f6f6f6">
              Page <strong>{pageIndex + 1}</strong> of{" "}
              <strong>{pageOptions.length}</strong> | Go To Page
            </Text>
            <Box display="inline-block">
              <Input
                size="sm"
                borderColor="#f6f6f6"
                color="#f6f6f6"
                type="number"
                defaultValue={pageIndex + 1}
                onKeyPress={(e: any) => {
                  if (e.key === "Enter") {
                    const p = e.target.value ? Number(e.target.value) - 1 : 0
                    gotoPage(p)
                  }
                }}
              />
            </Box>
          </Box>
          <Box>
            <IconButton
              disabled={!canPreviousPage}
              onClick={previousPage}
              color="#f6f6f6"
              size="md"
              aria-label="Previous Page"
              marginRight="18px"
              icon={<Icon as={RiArrowLeftFill} color="#1e6e7d" w="8" h="8" />}
            />
            <IconButton
              disabled={!canNextPage}
              onClick={nextPage}
              color="#f6f6f6"
              size="md"
              aria-label="Next Page"
              icon={<Icon as={RiArrowRightFill} color="#1e6e7d" w="8" h="8" />}
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default AxexTable
