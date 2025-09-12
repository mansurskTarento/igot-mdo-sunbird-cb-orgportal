import { Component, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { shared_table } from '../../../../../../common/shared-table/sahred-table.model'

@Component({
  selector: 'ws-app-map-roles-activities',
  templateUrl: './map-roles-activities.component.html',
  styleUrls: ['./map-roles-activities.component.scss']
})
export class MapRolesActivitiesComponent implements OnInit {
  //#region (properties)
  designation = new FormControl({ value: '', disabled: true });
  workOrderName = new FormControl({ value: '', disabled: true });
  description = new FormControl(
    '',
    Validators.compose([
      Validators.pattern(/^[a-zA-Z0-9.\-_$\/:\[\]'! ]*$/),
      Validators.maxLength(500)
    ])
  );

  rolesActivities = [
    {
      role: 'Tactical 1',
      type: 'Tactical 1',
      activities: [{
        description: 'Activity 1 description...',
        submissions: 'Submission 1'
      },
      {
        description: 'Activity 2 description...',
        submissions: 'Submission 2'
      }
      ],
    },
    {
      role: 'Tactical 2',
      type: 'Tactical 2',
      activities: [{
        description: 'Activity 1 description...',
        submissions: 'Submission 1'
      },
      {
        description: 'Activity 2 description...',
        submissions: 'Submission 2'
      }
      ],
    },
    {
      role: 'Tactical 3',
      type: 'Tactical 3',
      activities: [{
        description: 'Activity 1 description...',
        submissions: 'Submission 1'
      },
      {
        description: 'Activity 2 description...',
        submissions: 'Submission 2'
      }
      ],
    },
  ];

  competencyTableData!: shared_table.TableData
  competenciesList: any[] = []
  //#endregion (properties)

  constructor() { }

  //#region (initialization)
  ngOnInit(): void {
    this.designation.setValue('Software Engineer')
    this.workOrderName.setValue('Work Order 123')
  }

  setCompetenciesTableDate() {
    this.competencyTableData = {
      columns: [
        { displayName: 'Area', key: 'area', cellType: 'text' },
        { displayName: 'Theme', key: 'theme', cellType: 'text' },
        { displayName: 'Sub Theme', key: 'subTheme', cellType: 'text' }
      ],
      showSearchBox: false,
      showPagination: false,
      noDataMessage: 'There are no data available',
      showDisabledRowMessage: 'No data'
    }
  }

  getCompetenciesList() {
    this.competenciesList = []
  }

  //#endregion (initialization)

}
