import { Button } from "@chakra-ui/button"
import React, { useMemo } from "react"
import usePaginationResidencyUnits from "../../../api/queries/Units/usePaginationResidencyUnits"
import { useUser } from "../../../contexts/UserContext"
import AxexTable from "../../Atoms/AxexTable"

const ResidentsTable: React.FC = () => {
  const [user] = useUser()

  const tableProps = usePaginationResidencyUnits(user?.residency || "")

  const columns = useMemo(() => {
    return [
      {
        Header: "Floor",
        accessor: "floor",
      },
      {
        Header: "Room #",
        accessor: "roomNumber",
      },
      {
        Header: "Monthly Payment",
        accessor: "monthlyAmount",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        id: "Edit",
        Header: "Edit",
        Cell: (row: any) => {
          return (
            <Button
              colorScheme="teal"
              onClick={() => {
                return console.log(row.row)
              }}
            >
              Edit
            </Button>
          )
        },
      },
    ]
  }, []) as any

  return (
    <AxexTable
      loading={tableProps.loading}
      clickableRows
      data={tableProps.data}
      columns={columns}
      pageSizeProp={tableProps.pageSize}
      pageCount={tableProps.pageCount}
      page={tableProps.page}
      fetchData={tableProps.fetchData}
      search={tableProps.search}
      totalDataCount={tableProps.totalDataCount}
    />
  )
}

export default ResidentsTable
