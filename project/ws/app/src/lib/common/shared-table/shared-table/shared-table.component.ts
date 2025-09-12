import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'
import { PageEvent } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { debounceTime } from 'rxjs/operators'
import * as _ from 'lodash'
import { MatCheckboxChange } from '@angular/material/checkbox'
import { shared_table } from '../sahred-table.model'

@Component({
  selector: 'ws-app-shared-table',
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.scss']
})
export class SharedTableComponent {
  //#region (Properties)
  //#region (Inputs, Outputs, ViewChild)
  @ViewChild(MatSort, { static: false }) sort!: MatSort
  @Input() tableData!: shared_table.TableData
  @Input() data?: any[] = []
  @Input() paginationDetails: shared_table.Pagination = {
    startIndex: 0,
    lastIndex: 20,
    pageSize: 20,
    pageIndex: 0,
    totalCount: 20,
  }
  @Input() menuItems: shared_table.MenuItem[] = []
  @Input() showLoader = false
  @Output() actionsClick = new EventEmitter<any>()
  @Output() searchKey = new EventEmitter<string>()
  @Output() pageChange = new EventEmitter<shared_table.Pagination>()
  @Output() rowSelectionChange = new EventEmitter<any[]>()
  //#endregion (Inputs, Outputs, ViewChild)

  searchControl = new FormControl()
  showSearchBox = true
  displayedColumns: any
  dataSource!: any
  pageSizeOptions = [20, 30, 40]
  columnsList: any = []
  tableColumns = []
  noDataMessage = 'No data found'
  showPagination = true
  selectedRows: any[] = []
  //#endregion (Properties)

  constructor() {
    this.dataSource = new MatTableDataSource<any>()
  }

  //#region (Initialization)
  ngOnInit() {
    this.initializeTableData()
  }

  initializeTableData() {
    if (this.tableData) {
      this.displayedColumns = this.tableData.columns
      this.showSearchBox = _.get(this.tableData, 'showSearchBox', true)
      this.noDataMessage = _.get(this.tableData, 'noDataMessage', 'No data found')
      this.showPagination = _.get(this.tableData, 'showPagination', true)
    }
    this.searchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => this.searchKey.emit(value))
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tableData) {
      this.getFinalColumns()
    }
    if (changes.data && this.dataSource) {
      this.dataSource.data = this.data
      setTimeout(() => {
        this.dataSource.sort = this.sort
      }, 10)
    }
  }

  getFinalColumns() {
    this.columnsList = []
    const columns = JSON.parse(JSON.stringify(this.tableData.columns))
    if (this.menuItems && this.menuItems.length > 0) {
      const selectColumn = { displayName: 'Actions', key: 'menu', cellType: 'menu' }
      columns.push(selectColumn)
    }
    if (_.get(this.tableData, 'select')) {
      switch (_.get(this.tableData, 'select')) {
        case 'radioButtons':
          const radioButtonColumn = { displayName: 'Select', key: 'select', cellType: 'radio' }
          columns.unshift(radioButtonColumn)
          break
        case 'checkBox':
          const checkBoxColumn = { displayName: 'Select', key: 'select', cellType: 'checkbox' }
          columns.unshift(checkBoxColumn)
          break
        case 'selectAll':
          const selectAllColumn = { displayName: '', key: 'selectAll', cellType: 'selectAll' }
          columns.unshift(selectAllColumn)
          break
      }
    }
    this.tableColumns = columns
    this.columnsList = _.map(columns, c => c.key)
  }
  //#endregion (Initialization)

  //#region (Interactions)
  getButtonsToShow(rowData: any): any {
    if (rowData['buttonsToHide']) {
      const buttonsToShow: any[] = []
      this.menuItems.forEach((menuItem: any) => {
        if (!(rowData['buttonsToHide'].includes(menuItem.action))) {
          buttonsToShow.push(menuItem)
        }
      })
      return buttonsToShow
    }
    return this.menuItems
  }

  onCheckboxChange(event: MatCheckboxChange, rowData: any) {
    if (event.checked) {
      this.selectedRows.push(rowData)
    } else {
      this.selectedRows = this.selectedRows.filter(row => row !== rowData)
    }
    this.rowSelectionChange.emit(this.selectedRows)
  }

  onRadioSelect(row: any) {
    this.selectedRows = [row]
    this.rowSelectionChange.emit(this.selectedRows)
  }

  buttonClick(action: string, rows: any) {
    if (this.tableData) {
      this.actionsClick.emit({ action, rows })
    }
  }

  onChangePage(pe: PageEvent) {
    this.paginationDetails.startIndex = pe.pageIndex * pe.pageSize
    this.paginationDetails.lastIndex = (pe.pageIndex + 1) * pe.pageSize
    this.paginationDetails.pageSize = pe.pageSize
    this.paginationDetails.pageIndex = pe.pageIndex

    this.pageChange.emit(this.paginationDetails)
  }

  //#endregion (Interactions)

}
