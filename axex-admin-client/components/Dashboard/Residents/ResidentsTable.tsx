import { Button } from "@chakra-ui/button"
import { useRouter } from "next/router"
import React, { useMemo } from "react"
import usePaginationResidents from "../../../api/queries/Residents/usePaginationResidents"
import { useUser } from "../../../contexts/UserContext"
import AxexTable from "../../Atoms/AxexTable"

const ResidentsTable: React.FC = () => {
  const [user] = useUser()

  const router = useRouter()

  const tableProps = usePaginationResidents(user?.residency || "")

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
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone",
        accessor: "phone",
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
      onRowClicked={(userId: string) => {
        router.push(`/dashboard/residents/${userId}`)
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

export default ResidentsTable
