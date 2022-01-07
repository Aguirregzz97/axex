import { SearchIcon } from "@chakra-ui/icons"
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input"
import React, { useState } from "react"
import { useAsyncDebounce } from "react-table"

type TableFilterProps = {
  preGlobalFilteredRows: any
  globalFilter: any
  setGlobalFilter: any
}

const TableFilter: React.FC<TableFilterProps> = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length
  const [searchValue, setSearchValue] = useState(globalFilter)
  const handleOnChange = useAsyncDebounce((value) => {
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
        placeholder={`${count} records...`}
      />
    </InputGroup>
  )
}

export default TableFilter
