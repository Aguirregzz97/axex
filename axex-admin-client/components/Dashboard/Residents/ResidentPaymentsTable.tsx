import { Button } from "@chakra-ui/button"
import React, { useMemo } from "react"
import { Text } from "@chakra-ui/react"
import usePaginationUserPaymentRequests from "../../../api/queries/PaymentRequests/usePaginatedUserPaymentRequests"
import AxexTable from "../../Atoms/AxexTable"

type ResidentsVisitsTableProps = {
  residentId: string
}

const ResidentPaymentsTable: React.FC<ResidentsVisitsTableProps> = ({
  residentId,
}) => {
  const tableProps = usePaginationUserPaymentRequests(residentId)

  const columns = useMemo(() => {
    return [
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Expire Date",
        accessor: "expireDate",
      },
      {
        Header: "Status",
        accessor: "payed",
        Cell: ({ row }: any) => {
          return <Text>{row.original.payed ? "Payed" : "Pending"}</Text>
        },
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
      title="Payments"
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

export default ResidentPaymentsTable
