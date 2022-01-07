import { NextFunction, Request } from "express"

export type PaginationOptions = {
  page: number
  pageSize: number
  startIndex: number
  totalDataCount: number
}

export type PaginatedResponse = {
  paginationOptions: PaginationOptions
}

const paginatedOptions = (model: any, condition: any) => {
  return async (req: Request, res: any, next: NextFunction) => {
    const page = Number(req.query.page)
    const pageSize = Number(req.query.pageSize)

    const startIndex = (page - 1) * pageSize

    const queryCount = await model.count(condition).exec()

    const paginationOptions: PaginationOptions = {
      pageSize,
      startIndex,
      page,
      totalDataCount: queryCount,
    }

    res.paginationOptions = paginationOptions

    next()
  }
}

export default { paginatedOptions }
