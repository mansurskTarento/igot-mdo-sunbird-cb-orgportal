import { Component, OnInit } from '@angular/core'
import * as _ from 'lodash'
import { ITableData } from '@sunbird-cb/collection/lib/ui-org-table/interface/interfaces'
import { DesignationsService } from '../../services/designations.service'
import { FormControl } from '@angular/forms'
import { delay } from 'rxjs/operators'
import { HttpErrorResponse } from '@angular/common/http'
import { MatDialog, MatSnackBar } from '@angular/material'
import { ConformationPopupComponent } from '../../dialog-boxes/conformation-popup/conformation-popup.component'
import { ActivatedRoute } from '@angular/router'
import { environment } from '../../../../../../../../../../../src/environments/environment'

@Component({
  selector: 'ws-app-designations',
  templateUrl: './designations.component.html',
  styleUrls: ['./designations.component.scss'],
})
export class DesignationsComponent implements OnInit {

  environment: any
  designationConfig: any
  configSvc: any
  loaderMsg = ''
  showCreateLoader = false
  searchControl = new FormControl()
  frameworkDetails: any = {}
  organisationsList: any = []
  selectedOrganisation = ''
  designationsList: any = []
  filteredDesignationsList: any = []
  tableData!: ITableData
  showLoader = false
  actionMenuItem: {
    name: string,
    icon: string,
    key: string,
    isMdoLeader: boolean
  }[] = []
  orgId = ''
  showTopSection = false

  constructor(
    private designationsService: DesignationsService,
    private dialog: MatDialog,
    private activateRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.initialization()
  }

  //#region (intial actions)
  initialization() {
    this.initializeDefaultValues()
    this.valueChangeSubscribers()
    this.getRoutesData()
  }

  initializeDefaultValues() {
    this.configSvc = this.activateRoute.snapshot.data['configService']
    this.designationsService.setUserProfile(_.get(this.configSvc, 'userProfileV2'))
    this.orgId = _.get(this.configSvc, 'userProfile.rootOrgId')
    this.actionMenuItem = [
      // {
      //   name: 'Edit',
      //   icon: 'edit',
      //   key: 'edit',
      //   isMdoLeader: true //ws-widget-org-user-table library has conditions
      // },
      // {
      //   name: 'View',
      //   icon: 'remove_red_eye',
      //   key: 'view',
      //   isMdoLeader: true
      // }
      {
        name: 'Remove',
        icon: 'delete',
        key: 'remove',
        isMdoLeader: true,
      },
    ]

    this.tableData = {
      columns: [
        { displayName: 'Designation', key: 'name' },
        { displayName: 'Imported by', key: 'importedByName' },
        { displayName: 'Imported on', key: 'importedOn' },
      ],
      needCheckBox: false,
      needHash: false,
      needUserMenus: false,
      actions: [],
      actionColumnName: 'Action',
      cbpPlanMenu: true,
    }
  }

  getRoutesData() {
    this.environment = environment
    this.activateRoute.data.subscribe(data => {
      this.designationConfig = data.pageData.data
    })

    // console.log('this.configSvc', this.configSvc.orgReadData)
    if (this.configSvc.orgReadData && this.configSvc.orgReadData.frameworkid) {
      // this.environmentVal.frameworkName = this.configSvc.orgReadData.frameworkid
      this.getFrameworkInfo(this.configSvc.orgReadData.frameworkid)
    } else {
      this.createFreamwork()
    }
  }

  createFreamwork() {
    this.showCreateLoader = true
    this.loaderMsg = this.designationConfig.frameworkCreationMSg
    const departmentName = _.get(this.configSvc, 'userProfile.departmentName')
    const masterFrameWorkName = this.environment.ODCSMasterFramework
    this.designationsService.createFrameWork(masterFrameWorkName, this.orgId, departmentName).subscribe((res: any) => {
      if (res) {
        this.getOrgReadData()
      }
      // console.log('frameworkCreated: ', res)
    })
  }

  getOrgReadData() {
    this.designationsService.getOrgReadData(this.orgId).subscribe((res: any) => {
      if (_.get(res, 'frameworkid')) {
        this.showLoader = true
        this.showCreateLoader = false
        this.environment.frameworkName = _.get(res, 'frameworkid')
        this.getFrameworkInfo(res.frameworkid)
      } else {
        setTimeout(() => {
          this.getOrgReadData()
        },         10000)
      }
      // console.log('orgFramework Details', res)
    })
  }

  getFrameworkInfo(frameworkid: string) {
    this.showLoader = true
    this.environment.frameworkName = frameworkid
    this.designationsService.getFrameworkInfo(frameworkid).subscribe(
      {
        next: res => {
          this.showLoader = false
          this.frameworkDetails = _.get(res, 'result.framework')
          this.designationsService.setFrameWorkInfo(this.frameworkDetails)

          this.getOrganisations()
        },
        error: (error: HttpErrorResponse) => {
          this.showLoader = false
          const errorMessage = _.get(error, 'error.message', 'Some thing went wrong')
          this.openSnackbar(errorMessage)
        },

      })
  }

  valueChangeSubscribers() {
    if (this.searchControl) {
      this.searchControl.valueChanges.pipe(delay(500)).subscribe({
        next: response => {
          this.filterDesignations(response)
        },
      })
    }
  }

  getOrganisations() {
    this.organisationsList = this.getTermsByCode('org')
    this.selectedOrganisation = _.get(this.organisationsList, '[0].identifier', '')
    this.getDesignations()
  }

  getDesignations() {
    this.designationsList = _.get(this.organisationsList, '[0].children')
    this.designationsService.setCurrentOrgDesignationsList(this.designationsList)
    this.filterDesignations()
  }

  // to get list from categories like designations, organisations
  getTermsByCode(code: string) {
    const selectedCatagori = this.categoriesOfFramework.filter((catagori: any) => catagori.code === code)
    return _.get(selectedCatagori, '[0].terms', [])
  }

  // to get different categories list
  get categoriesOfFramework() {
    return _.get(this.frameworkDetails, 'categories', [])
  }

  //#endregion

  filterDesignations(key?: string) {
    if (key) {
      this.filteredDesignationsList = this.designationsList
        .filter((designation: any) => designation.name.toLowerCase().includes(key.toLowerCase()))
    } else {
      const filteredData: any = this.designationsList.sort((a: any, b: any) => {
        const timestampA = a.additionalProperties && a.additionalProperties.timeStamp ?
          new Date(Number(a.additionalProperties.timeStamp)).getTime() : 0
        const timestampB = b.additionalProperties && b.additionalProperties.timeStamp ?
          new Date(Number(b.additionalProperties.timeStamp)).getTime() : 0

        return timestampB - timestampA

      })
      this.filteredDesignationsList = filteredData
    }
  }

  //#region (ui interactions like click)

  // openDesignationCreatPopup(event?: any) {
  //   console.log('event', event)
  //   const dialogData = {
  //     mode: 'create',
  //     columnInfo: {
  //       code: 'designation',
  //       name: 'Designation',
  //       children: this.designationsList,
  //     },
  //     frameworkId: 'organisation_fw',
  //     selectedDesignation: null
  //   }
  //   if (event && event.action) {
  //     dialogData.mode = event.action
  //     dialogData.selectedDesignation = event.row
  //   }
  // }

  // upload() { }

  menuSelected(event: any) {
    switch (event.action) {
      // case 'edit':
      //   this.openDesignationCreatPopup(event)
      //   break
      // case 'view':
      //   this.openDesignationCreatPopup(event)
      //   break
      case 'remove':
        this.openConformationPopup(event)
        break
    }
  }

  openConformationPopup(event: any) {
    // console.log('envent data', event)
    const dialogData = {
      dialogType: 'warning',
      descriptions: [
        {
          header: 'Are you sure you want to remove this designation from My designation master?',
          headerClass: 'flex items-center justify-center text-blue',
          messages: [
            {
              msgClass: '',
              msg: `Please note that doing so will result in the loss of role mapping.`,
            },
          ],
        },
      ],
      footerClass: 'items-center justify-center',
      buttons: [
        {
          btnText: 'No',
          btnClass: 'btn-outline',
          response: false,
        },
        {
          btnText: 'Yes',
          btnClass: 'btn-full-success',
          response: true,
        },
      ],
    }
    const dialogRef = this.dialog.open(ConformationPopupComponent, {
      data: dialogData,
      autoFocus: false,
      width: '615px',
      maxWidth: '80vw',
      maxHeight: '90vh',
      disableClose: true,
    })
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.removeDesignation(event.row)
      }
    })
  }

  removeDesignation(designation: any) {
    if (designation) {
      const requestBody = {
        request: {
          contentIds: [
            _.get(designation, 'code'),
          ],
        },
      }
      this.showLoader = true
      this.designationsService.deleteDesignation(this.frameworkDetails.code, 'designation', requestBody).subscribe({
        next: res => {
          if (res) {
            this.publishFrameWork('delete')
          } else {
            this.showLoader = false
          }
        },
        error: (error: HttpErrorResponse) => {
          this.showLoader = false
          const errorMessage = _.get(error, 'error.message', 'Some thing went wrong')
          this.openSnackbar(errorMessage)
        },
      })
    }
  }

  publishFrameWork(action?: string) {
    const frameworkName = _.get(this.frameworkDetails, 'code')
    this.designationsService.publishFramework(frameworkName).subscribe({
      next: response => {
        if (response) {
          setTimeout(() => {
            this.getFrameworkInfo(this.frameworkDetails.code)
            if (action && action === 'delete') {
              this.openSnackbar('Deleted Successfully')
            }
          },         10000)
        }
      },
      error: (error: HttpErrorResponse) => {
        this.showLoader = false
        const errorMessage = _.get(error, 'error.message', 'Some thing went wrong')
        this.openSnackbar(errorMessage)
      },
    })
  }

  private openSnackbar(primaryMsg: any, duration: number = 5000) {
    this.snackBar.open(primaryMsg, 'X', {
      duration,
    })
  }

  //#endregion

  // openVideoPopup() { }

}
