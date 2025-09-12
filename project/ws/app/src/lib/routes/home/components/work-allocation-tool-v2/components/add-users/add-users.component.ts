import { Component, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { MatLegacyDialog } from '@angular/material/legacy-dialog'
import { debounceTime } from 'rxjs/operators'
import { UsersListPopupComponent } from '../../dialogs/users-list-popup/users-list-popup.component'
import { shared_table } from '../../../../../../common/shared-table/sahred-table.model'

@Component({
  selector: 'ws-app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {
  //#region (properties)
  workOrderName = new FormControl('', [Validators.required])
  userSearch = new FormControl('')

  addedUserTableData?: shared_table.TableData
  addAuser: any
  addedUsersList: any
  //#endregion

  constructor(
    private dialog: MatLegacyDialog
  ) { }

  //#region (initialization)
  ngOnInit(): void {
    this.initialization()
  }

  initialization() {
    this.setTableData()
    this.valueChangeMethods()
  }

  setTableData() {
    this.addedUserTableData = {
      columns: [
        { displayName: 'User Name', key: 'name', cellType: 'text' },
        { displayName: 'Email', key: 'email', cellType: 'text' },
        { displayName: 'Published On', key: 'publishedOn', cellType: 'date' },
        { displayName: 'Published By', key: 'publishedByName', cellType: 'text' },
        { displayName: 'Created By', key: 'createdByName', cellType: 'text' }
      ],
      showSearchBox: false,
      showPagination: false,
      noDataMessage: 'There are no data available'
    }
    this.addAuser = [
      {
        name: 'Add a User',
        email: 'Add a User',
        publishedOn: 'Add a User',
        publishedByName: 'Add a User',
        createdByName: 'Add a User'
      }
    ]

  }

  valueChangeMethods() {
    if (this.userSearch) {
      this.userSearch.valueChanges.pipe(
        debounceTime(500)
      ).subscribe((value: string | null) => {
        if (value) {
          this.openUsersAddPopup(value)
        }
      })
    }
  }
  //#endregion (initialization)

  //#region (ui interactions)
  openUsersAddPopup(searchValue = '') {
    const dialogRef = this.dialog.open(UsersListPopupComponent, {
      data: {
        searchKey: searchValue
      },
      minWidth: '900px',
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addedUsersList.push(result)
      }
      this.userSearch.setValue('')
    })
  }
  //#endregion (ui interactions)

}
