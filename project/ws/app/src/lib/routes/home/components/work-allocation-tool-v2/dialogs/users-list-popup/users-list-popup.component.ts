//#region (imports)
import { Component, Inject, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { MAT_LEGACY_DIALOG_DATA, MatLegacyDialogRef } from '@angular/material/legacy-dialog'
import * as _ from 'lodash'
import { shared_table } from '../../../../../../common/shared-table/sahred-table.model'
//#endregion (imports)

@Component({
  selector: 'ws-app-users-list-popup',
  templateUrl: './users-list-popup.component.html',
  styleUrls: ['./users-list-popup.component.scss']
})
export class UsersListPopupComponent implements OnInit {
  //#region (properties)
  userSearch = new FormControl('')

  usersTableData?: shared_table.TableData
  usersList: any
  selectedUsersList: any[] = []
  //#endregion (properties)

  constructor(
    private dialogRef: MatLegacyDialogRef<UsersListPopupComponent>,
    @Inject(MAT_LEGACY_DIALOG_DATA) data: any,
  ) {
    this.userSearch.setValue(_.get(data, 'searchKey', ''))
  }

  //#region (initialization)
  ngOnInit(): void {
    this.initialization()
  }

  initialization() {
    this.setTableData()
    this.getUsersList()
  }

  setTableData() {
    this.usersTableData = {
      columns: [
        { displayName: 'Name', key: 'name', cellType: 'text' },
        { displayName: 'Email', key: 'email', cellType: 'text' },
        { displayName: 'Mobile No', key: 'mobile', cellType: 'text' },
        { displayName: 'Designation', key: 'designation', cellType: 'text' },
        { displayName: 'Organisation', key: 'organisation', cellType: 'text' }
      ],
      showSearchBox: false,
      showPagination: false,
      noDataMessage: 'There are no data available',
      select: 'checkBox'
    }
  }

  getUsersList() {
    this.usersList = [
      { name: 'John Doe', email: 'john.doe@example.com', mobile: '1234567890', designation: 'Software Engineer', organisation: 'ABC Corp' },
      { name: 'Jane Smith', email: 'jane.smith@example.com', mobile: '0987654321', designation: 'Project Manager', organisation: 'XYZ Inc' }
    ]
  }
  //#endregion (initialization)

  //#region (ui interactions)
  onUserSearch() {
    if (this.userSearch.value) {
      const searchValue = this.userSearch.value.toLowerCase()
      this.usersList = this.usersList.filter((user: any) => user.name.toLowerCase().includes(searchValue))
    }
  }

  onRowSelectionChange(selectedRows: any[]) {
    this.selectedUsersList = selectedRows
  }

  closePopup() {
    this.dialogRef.close()
  }
  //#endregion (ui interactions)

}
