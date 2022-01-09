import { SearchIcon } from "@chakra-ui/icons"
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input"
import { Box, Heading } from "@chakra-ui/layout"
import React, { useState } from "react"
import { useAsyncDebounce } from "react-table"

type TableFilterProps = {
  totalDataCount: number
  globalFilter: any
  // eslint-disable-next-line no-unused-vars
  setGlobalFilter: (filterValue: any) => void
  // eslint-disable-next-line no-unused-vars
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void
  title?: string
}

const TableFilter: React.FC<TableFilterProps> = ({
  globalFilter,
  setGlobalFilter,
  gotoPage,
  totalDataCount,
  title = "",
}) => {
  const [searchValue, setSearchValue] = useState(globalFilter)
  const handleOnChange = useAsyncDebounce((value) => {
    gotoPage(0)
    setGlobalFilter(value || undefined)
  }, 500)

  return (
    <Box display="flex" alignItems="center" mb="10px">
      <Heading color="#1e6e7d" fontSize="24px" mr="10px">
        {title}
      </Heading>
      <InputGroup maxW="50%">
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
    </Box>
  )
}

export default TableFilter
