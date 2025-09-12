export namespace shared_table {
  export interface TableData {
    columns: TableColumn[]
    showSearchBox: boolean
    showPagination: boolean
    noDataMessage?: string
    select?: string,
    showDisabledRowMessage?: string
  }

  export interface TableColumn {
    displayName: string
    key: string
    cellType: string
    imageKey?: string
    cellClass?: string
  }

  export interface Pagination {
    startIndex: number
    lastIndex: number
    pageSize: number
    pageIndex: number
    totalCount: number
  }

  export interface MenuItem {
    btnText: string
    action: string
    disableMenu?: boolean
  }
}