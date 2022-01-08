import { SearchIcon } from "@chakra-ui/icons"
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input"
import React, { useState } from "react"
import { useAsyncDebounce } from "react-table"

type TableFilterProps = {
  totalDataCount: number
  globalFilter: any
  // eslint-disable-next-line no-unused-vars
  setGlobalFilter: (filterValue: any) => void
  // eslint-disable-next-line no-unused-vars
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void
}

const TableFilter: React.FC<TableFilterProps> = ({
  globalFilter,
  setGlobalFilter,
  gotoPage,
  totalDataCount,
}) => {
  const [searchValue, setSearchValue] = useState(globalFilter)
  const handleOnChange = useAsyncDebounce((value) => {
    gotoPage(0)
    setGlobalFilter(value || undefined)
  }, 500)

  return (
    <InputGroup maxW="50%" mb="10px">
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="gray.300" />}
      />
      <Input
        value={searchValue || ""}
        onChange={(e) => {
          setSearchValue(e.target.value)
          handleOnChange(e.target.value)
        }}
        type="tel"
        placeholder={`${totalDataCount} records...`}
      />
    </InputGroup>
  )
}

export default TableFilter
