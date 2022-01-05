import { Button } from "@chakra-ui/button"
import { Spinner } from "@chakra-ui/spinner"
import React, { useMemo } from "react"
import useResidents from "../../../api/queries/Residents/useResidents"
import { useUser } from "../../../contexts/UserContext"
import AxexTable from "../../Atoms/AxexTable"

const ResidentsTable: React.FC = () => {
  const [user] = useUser()

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

  const { data: residents, isLoading } = useResidents(user?.residency || "")

  if (isLoading && !residents) {
    return <Spinner />
  }

  return <AxexTable clickableRows data={residents} columns={columns} />
}

export default ResidentsTable
