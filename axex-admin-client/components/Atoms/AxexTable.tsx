import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons"
import { Table, Tbody, Thead, Tr, Th, Td } from "@chakra-ui/react"
import React, { useMemo } from "react"
import { HeaderGroup, useGlobalFilter, useSortBy, useTable } from "react-table"
import TableFilter from "../TableFilter"

type AxexTableProps = {
  columns: any
  data: any
  clickableRows?: boolean
}

const AxexTable: React.FC<AxexTableProps> = ({
  columns,
  data,
  clickableRows = false,
}) => {
  const memoizedData = useMemo(() => {
    return [...data]
  }, [data])

  const tableInstance = useTable(
    {
      columns,
      data: memoizedData,
    },
    useGlobalFilter,
    useSortBy,
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    preGlobalFilteredRows,
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

  const handleOnClickRow = (row: any) => {
    if (clickableRows) {
      console.log(row.original)
    }
  }

  return (
    <>
      <TableFilter
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
        preGlobalFilteredRows={preGlobalFilteredRows}
      />
      <Table {...getTableProps()}>
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
                      {...column.getHeaderProps(column.getSortByToggleProps())}
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
          {rows.map((row, index) => {
            prepareRow(row)
            return (
              <Tr
                bg={index % 2 === 0 ? "#edf2f7" : ""}
                onClick={() => {
                  handleOnClickRow(row)
                }}
                _hover={{
                  cursor: clickableRows ? "pointer" : "",
                  bg: clickableRows ? "#c3d1df !important" : "",
                }}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </>
  )
}

export default AxexTable
