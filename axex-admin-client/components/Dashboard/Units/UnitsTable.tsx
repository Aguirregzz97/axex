import { Button } from "@chakra-ui/button"
import { useRouter } from "next/router"
import React, { useMemo } from "react"
import usePaginationResidencyUnits from "../../../api/queries/Units/usePaginationResidencyUnits"
import { useUser } from "../../../contexts/UserContext"
import AxexTable from "../../Atoms/AxexTable"

const UnitsTable: React.FC = () => {
  const router = useRouter()

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
      onRowClicked={(unitId: string) => {
        router.push(`/dashboard/units/${unitId}`)
      }}
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

export default UnitsTable
