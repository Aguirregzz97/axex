import { Button } from "@chakra-ui/button"
import React, { useMemo } from "react"
import usePaginationResidentVisits from "../../../api/queries/Visits/usePaginationResidentVisits"
import AxexTable from "../../Atoms/AxexTable"

type ResidentsVisitsTableProps = {
  residentId: string
}

const ResidentsVisitsTable: React.FC<ResidentsVisitsTableProps> = ({
  residentId,
}) => {
  const tableProps = usePaginationResidentVisits(residentId)

  const columns = useMemo(() => {
    return [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Visit Type",
        accessor: "visitType",
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
      title="Visits"
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

export default ResidentsVisitsTable
