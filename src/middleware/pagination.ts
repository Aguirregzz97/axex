import { NextFunction, Request } from "express"

export type PaginationOptions = {
  page: number
  pageSize: number
  startIndex: number
  search: string
  totalDataCount: number
}

export type PaginatedResponse = {
  paginationOptions: PaginationOptions
}

const paginatedOptions = async (req: Request, res: any, next: NextFunction) => {
  const page = Number(req.query.page)
  const pageSize = Number(req.query.pageSize)
  const { search } = req.query as any

  const startIndex = (page - 1) * pageSize

  const paginationOptions: PaginationOptions = {
    pageSize,
    startIndex,
    page,
    search,
    totalDataCount: 0,
  }

  res.paginationOptions = paginationOptions

  next()
}

export default { paginatedOptions }
