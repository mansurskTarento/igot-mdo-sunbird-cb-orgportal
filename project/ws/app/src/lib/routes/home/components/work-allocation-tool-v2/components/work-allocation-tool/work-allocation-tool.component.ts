//#region (imports)
import { Component, OnDestroy, OnInit } from '@angular/core'
import * as _ from 'lodash'
import { shared_table } from '../../../../../../common/shared-table/sahred-table.model'
// import { WatService } from '../../services/wat.service'
//#endregion (imports)

@Component({
  selector: 'ws-app-work-allocation-tool',
  templateUrl: './work-allocation-tool.component.html',
  styleUrls: ['./work-allocation-tool.component.scss']
})
export class WorkAllocationToolComponent implements OnInit, OnDestroy {
  //#region (properties)
  selectedTabIndex = 0;
  selectedTabLabel = '';

  //#region (published tab properties)
  publishedTableData?: shared_table.TableData
  publishedWATList: any[] = [];
  publishedTablePaginationDetails?: shared_table.Pagination
  publishedMenuItems: shared_table.MenuItem[] = [];
  //#endregion (published tab properties)

  //#region (draft tab properties)
  draftTableData?: shared_table.TableData
  draftedWATList: any[] = [];
  draftTablePaginationDetails?: shared_table.Pagination
  //#endregion (draft tab properties)

  //#region (archived tab properties)
  archivedTableData?: shared_table.TableData
  archivedWATList: any[] = [];
  archivedTablePaginationDetails?: shared_table.Pagination
  //#endregion (archived tab properties)

  //#region (under review tab properties)
  underReviewTableData?: shared_table.TableData
  underReviewWATList: any[] = [];
  underReviewTablePaginationDetails?: shared_table.Pagination
  //#endregion (under review tab properties)

  //#region (to be signed tab properties)
  toBeSignedTableData?: shared_table.TableData
  toBeSignedWATList: any[] = [];
  toBeSignedTablePaginationDetails?: shared_table.Pagination
  //#endregion (to be signed tab properties)

  //#endregion (properties)

  constructor(
    // private watService: WatService
  ) { }

  //#region (initialization)
  ngOnInit() {
    this.initialization()
  }

  initialization() {
    this.setPublishedTableDetails()
    this.getPublishedWATList()

    this.setDraftTableDetails()
    this.getDraftWATList()

    this.setArchivedTableDetails()
    this.getArchivedWATList()

    this.setUnderReviewTableDetails()
    this.getUnderReviewWATList()

    this.setToBeSignedTableDetails()
    this.getToBeSignedWATList()
  }

  //#region (published tab methods)
  setPublishedTableDetails() {
    this.publishedTableData = {
      columns: [
        { displayName: 'Work Order Name', key: 'name', cellType: 'textImage', imageKey: 'formUrl', cellClass: 'text-overflow-elipse' },
        { displayName: 'Officers', key: 'officers', cellType: 'number' },
        { displayName: 'Published On', key: 'publishedOn', cellType: 'date' },
        { displayName: 'Published By', key: 'publishedByName', cellType: 'text' },
        { displayName: 'Created By', key: 'createdByName', cellType: 'text' }
      ],
      showSearchBox: true,
      showPagination: true,
      noDataMessage: 'There are no data available'
    }
    this.publishedTablePaginationDetails = {
      startIndex: 0,
      lastIndex: 20,
      pageSize: 20,
      pageIndex: 0,
      totalCount: 0,
    }
    this.publishedMenuItems = [
      {
        btnText: 'View',
        action: 'view',
      },
      {
        btnText: 'Edit',
        action: 'edit',
      },
      {
        btnText: 'Cancel',
        action: 'cancel',
      },
    ]
  }

  getPublishedWATList() {
    // this.watService.getPublishedWATList().subscribe({
    //   next: (data: any) => {
    //     this.publishedWATList = data;
    //   },
    //   error: (error) => {
    //     console.error('Error fetching published WAT list:', error);
    //   }
    // });

    this.publishedWATList = [
      { name: 'John Doe', officers: 5, mobile: '1234567890', publishedOn: '2023-06-01', publishedByName: 'John', createdByName: 'John', formUrl: '../assets/icons/govtlogo.jpg' },
      { name: 'Jane Smith', officers: 3, mobile: '0987654321', publishedOn: '2023-06-02', publishedByName: 'Jane', createdByName: 'Jane', formUrl: '../assets/icons/govtlogo.jpg' }
    ]
  }
  //#endregion (published tab methods)

  //#region (draft tab methods)
  setDraftTableDetails() {
    this.draftTableData = {
      columns: [
        { displayName: 'Work Order Name', key: 'name', cellType: 'textImage', imageKey: 'formUrl', cellClass: 'text-overflow-elipse' },
        { displayName: 'Officers', key: 'officers', cellType: 'number' },
        { displayName: 'Drafted On', key: 'draftedOn', cellType: 'date' },
        { displayName: 'Drafted By', key: 'draftedByName', cellType: 'text' },
        { displayName: 'Created By', key: 'createdByName', cellType: 'text' }
      ],
      showSearchBox: true,
      showPagination: true,
      noDataMessage: 'There are no data available'
    }
    this.draftTablePaginationDetails = {
      startIndex: 0,
      lastIndex: 20,
      pageSize: 20,
      pageIndex: 0,
      totalCount: 0,
    }
  }

  getDraftWATList() {
    this.draftedWATList = [
      { name: 'Alice Johnson', email: 'alice.johnson@example.com', mobile: '1234567890', designation: 'Business Analyst', organisation: 'ABC Corp' },
      { name: 'Bob Brown', email: 'bob.brown@example.com', mobile: '0987654321', designation: 'UX Designer', organisation: 'XYZ Inc' }
    ]
  }
  //#endregion (draft tab methods)

  //#region (archived tab methods)
  setArchivedTableDetails() {
    this.archivedTableData = {
      columns: [
        { displayName: 'Work Order Name', key: 'name', cellType: 'textImage', imageKey: 'formUrl', cellClass: 'text-overflow-elipse' },
        { displayName: 'Officers', key: 'officers', cellType: 'number' },
        { displayName: 'Archived On', key: 'archivedOn', cellType: 'date' },
        { displayName: 'Archived By', key: 'archivedByName', cellType: 'text' },
        { displayName: 'Created By', key: 'createdByName', cellType: 'text' }
      ],
      showSearchBox: true,
      showPagination: true,
      noDataMessage: 'There are no data available'
    }
    this.archivedTablePaginationDetails = {
      startIndex: 0,
      lastIndex: 20,
      pageSize: 20,
      pageIndex: 0,
      totalCount: 0,
    }
  }

  getArchivedWATList() {
    this.archivedWATList = [
      { name: 'Charlie Green', email: 'charlie.green@example.com', mobile: '1234567890', designation: 'Data Scientist', organisation: 'ABC Corp' },
      { name: 'Diana Prince', email: 'diana.prince@example.com', mobile: '0987654321', designation: 'Product Owner', organisation: 'XYZ Inc' }
    ]
  }
  //#endregion (archived tab methods)

  //#region (under review tab methods)
  setUnderReviewTableDetails() {
    this.underReviewTableData = {
      columns: [
        { displayName: 'Work Order Name', key: 'name', cellType: 'textImage', imageKey: 'formUrl', cellClass: 'text-overflow-elipse' },
        { displayName: 'Officers', key: 'officers', cellType: 'number' },
        { displayName: 'Under Review On', key: 'underReviewOn', cellType: 'date' },
        { displayName: 'Under Review By', key: 'underReviewByName', cellType: 'text' },
        { displayName: 'Created By', key: 'createdByName', cellType: 'text' }
      ],
      showSearchBox: true,
      showPagination: true,
      noDataMessage: 'There are no data available'
    }
    this.underReviewTablePaginationDetails = {
      startIndex: 0,
      lastIndex: 20,
      pageSize: 20,
      pageIndex: 0,
      totalCount: 0,
    }
  }

  getUnderReviewWATList() {
    this.underReviewWATList = [
      { name: 'Eve Adams', email: 'eve.adams@example.com', mobile: '1234567890', designation: 'QA Engineer', organisation: 'ABC Corp' },
      { name: 'Frank Castle', email: 'frank.castle@example.com', mobile: '0987654321', designation: 'DevOps Engineer', organisation: 'XYZ Inc' }
    ]
  }
  //#endregion (under review tab methods)

  //#region (to be signed tab methods)
  setToBeSignedTableDetails() {
    this.toBeSignedTableData = {
      columns: [
        { displayName: 'Work Order Name', key: 'name', cellType: 'textImage', imageKey: 'formUrl', cellClass: 'text-overflow-elipse' },
        { displayName: 'Officers', key: 'officers', cellType: 'number' },
        { displayName: 'To Be Signed On', key: 'toBeSignedOn', cellType: 'date' },
        { displayName: 'To Be Signed By', key: 'toBeSignedByName', cellType: 'text' },
        { displayName: 'Created By', key: 'createdByName', cellType: 'text' }
      ],
      showSearchBox: true,
      showPagination: true,
      noDataMessage: 'There are no data available'
    }
    this.toBeSignedTablePaginationDetails = {
      startIndex: 0,
      lastIndex: 20,
      pageSize: 20,
      pageIndex: 0,
      totalCount: 0,
    }
  }

  getToBeSignedWATList() {
    this.toBeSignedWATList = [
      { name: 'Grace Hopper', email: 'grace.hopper@example.com', mobile: '1234567890', designation: 'Software Engineer', organisation: 'ABC Corp' },
      { name: 'Hank Pym', email: 'hank.pym@example.com', mobile: '0987654321', designation: 'Systems Analyst', organisation: 'XYZ Inc' }
    ]
  }
  //#endregion (to be signed tab methods)

  //#endregion (initialization)

  //#region (interactions)
  onTabChange(event: any) {
    console.log('Tab changed:', event)
    this.selectedTabLabel = _.get(event, 'tab.textLabel', '')
  }

  onPageChange(event: shared_table.Pagination) {
    console.log('Page changed:', event)
    switch (this.selectedTabLabel) {
      case 'Published':
        if (this.publishedTablePaginationDetails) {
          this.publishedTablePaginationDetails = event
          this.getPublishedWATList()
        }
        break
      case 'Draft':
        if (this.draftTablePaginationDetails) {
          this.draftTablePaginationDetails = event
          this.getDraftWATList()
        }
        break
      case 'Archived':
        if (this.archivedTablePaginationDetails) {
          this.archivedTablePaginationDetails = event
          this.getArchivedWATList()
        }
        break
    }
  }

  onActionClick(event: any) {
    console.log('Action clicked:', event)
  }

  onSearchKey(event: any) {
    console.log('Search key:', event)
  }
  //#endregion (interactions)

  //#region (destruction)
  ngOnDestroy() {
  }

}
