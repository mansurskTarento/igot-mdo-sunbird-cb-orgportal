
import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ApprovalsService } from '../../services/approvals.service'
import moment from 'moment'
import { ITableData } from '@sunbird-cb/collection/lib/ui-org-table/interface/interfaces'
import { MatSnackBar, PageEvent } from '@angular/material'
/* tslint:disable */
import _ from 'lodash'
import { EventService } from '@sunbird-cb/utils'
import { TelemetryEvents } from '../../../../head/_services/telemetry.event.model'
import { LoaderService } from '../../../../../../../../../src/app/services/loader.service'
/* tslint:enable */
@Component({
  selector: 'ws-app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.scss'],
  providers: [LoaderService],
})
export class ApprovalsComponent implements OnInit, OnDestroy {
  data: any[] = []
  currentFilter = 'toapprove'
  discussionList!: any
  discussProfileData!: any
  departName = ''
  approvalDataTotalCount?: number | 0
  limit = 20
  pageIndex = 0
  currentOffset = 0
  tabledata: ITableData = {
    // actions: [{ name: 'Approve', label: 'Approve', icon: 'remove_red_eye', type: 'Approve' },
    // { name: 'Reject', label: 'Reject', icon: 'remove_red_eye', type: 'Reject' }],
    actions: [],
    columns: [
      { displayName: 'Full name', key: 'fullname' },
      { displayName: 'Requested on', key: 'requestedon' },
      { displayName: 'Fields', key: 'fields', isList: true },
      { displayName: 'Tags', key: 'tag', isList: true },
    ],
    needCheckBox: false,
    needHash: false,
    sortColumn: 'fullname',
    sortState: 'asc',
    needUserMenus: false,
  }
  configSvc: any

  constructor(
    private router: Router,
    private apprService: ApprovalsService,
    private activeRouter: ActivatedRoute,
    private route: ActivatedRoute,
    private events: EventService,
    private loaderService: LoaderService,
    // private telemetrySvc: TelemetryService,
    private snackbar: MatSnackBar) {
    this.configSvc = this.route.parent && this.route.parent.snapshot.data.configService
    if (this.activeRouter.parent && this.activeRouter.parent.snapshot.data.configService.unMappedUser.channel
    ) {
      this.departName = _.get(this.activeRouter, 'parent.snapshot.data.configService.unMappedUser.channel')
    }
    this.fetchApprovals()
  }

  ngOnInit() {
  }

  filter(key: string | 'timestamp' | 'best' | 'saved') {
    if (key) {
      this.currentFilter = key
      switch (key) {
        case 'toapprove':
          this.fetchApprovals()
          break
        case 'userflags':
          this.data = [{
            fullname: 'Nancy Jimenez',
            requestedon: new Date(),
            fields: 'Period,Position',
          }]
          break

        default:
          break
      }
    }
    // this.events.raiseInteractTelemetry(
    //   {
    //     type: TelemetryEvents.EnumInteractTypes.CLICK,
    //     subType: TelemetryEvents.EnumInteractSubTypes.TAB_CONTENT,
    //   }, {}
    // )
  }

  public tabTelemetry(label: string, index: number) {
    const data: TelemetryEvents.ITelemetryTabData = {
      label,
      index,
    }
    this.events.handleTabTelemetry(
      TelemetryEvents.EnumInteractSubTypes.APPROVAL_TAB,
      data,
    )
  }

  onApprovalClick(approval: any) {
    if (approval && approval.userWorkflow.userInfo) {
      this.router.navigate([`/app/approvals/${approval.userWorkflow.userInfo.wid}/to-approve`])
    }
    // this.telemetrySvc.impression()
    this.events.raiseInteractTelemetry(
      {
        type: TelemetryEvents.EnumInteractTypes.CLICK,
        subType: TelemetryEvents.EnumInteractSubTypes.CARD_CONTENT,
        id: TelemetryEvents.EnumIdtype.APPROVAL_ROW,
      },
      {
        id: approval.userWorkflow.userInfo.wid,
        type: TelemetryEvents.EnumIdtype.WORK_ORDER,
      }
    )

  }

  fetchApprovals() {
    this.loaderService.changeLoad.next(true)
    this.data = []
    if (this.departName) {
      const req = {
        serviceName: 'profile',
        applicationStatus: 'SEND_FOR_APPROVAL',
        deptName: this.departName,
        offset: this.currentOffset,
        limit: this.limit,
      }
      this.apprService.getApprovals(req).subscribe(res => {
        let currentdate: Date
        const resData = res.result.data
        this.approvalDataTotalCount = res.result.count

        // console.log('approval count', this.approvalDataTotalCount)
        resData.forEach((approval: any) => {
          let keys = ''
          approval.wfInfo.forEach((wf: any) => {
            currentdate = new Date(wf.createdOn)
            if (typeof wf.updateFieldValues === 'string') {
              const fields = JSON.parse(wf.updateFieldValues)
              if (fields.length > 0) {
                fields.forEach((field: any) => {
                  if (Object.keys(field.fromValue).length > 0) {

                    keys += `${_.first(Object.keys(field.fromValue))}, `
                  } else {
                    keys += `${_.first(Object.keys(field.toValue))}, `
                  }
                })
              }
            }
          })

          this.data.push({
            fullname: approval.userInfo ? `${approval.userInfo.first_name}` : '--',
            // fullname: approval.userInfo ? `${approval.userInfo.first_name} ${approval.userInfo.last_name}` : '--',
            requestedon: `${currentdate.getDate()}
          ${moment(currentdate.getMonth() + 1, 'MM').format('MMM')}
          ${currentdate.getFullYear()}
          ${currentdate.getHours()} :
          ${currentdate.getMinutes()} :
          ${currentdate.getSeconds()}`,
            fields: keys.slice(0, -1),
            userWorkflow: approval,
            tag: (approval.userInfo && approval.userInfo.tag) ? `${approval.userInfo.tag}` : '',
          })
        })
      })
    } else {
      this.snackbar.open('Please connect to your SPV admin, to update MDO name.')
    }
  }

  get getTableData() {
    // console.log("table data", this.data)
    return this.data
  }

  onPaginateChange(event: PageEvent) {
    this.pageIndex = event.pageIndex
    this.limit = event.pageSize
    this.currentOffset = event.pageIndex
    this.fetchApprovals()
  }

  ngOnDestroy(): void { }
}
