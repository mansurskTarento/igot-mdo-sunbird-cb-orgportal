import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { WorkAllocationToolV2RoutingModule } from './work-allocation-tool-v2-routing.module'
import { WorkAllocationToolComponent } from './components/work-allocation-tool/work-allocation-tool.component'
import { MatLegacyButtonModule } from '@angular/material/legacy-button'
import { MatLegacyCardModule } from '@angular/material/legacy-card'
import { MatIconModule } from '@angular/material/icon'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatLegacyFormFieldModule } from '@angular/material/legacy-form-field'
import { MatLegacySelectModule } from '@angular/material/legacy-select'
import { MatLegacyRadioModule } from '@angular/material/legacy-radio'
import { MatLegacyPaginatorModule } from '@angular/material/legacy-paginator'
import { CreateWorkorderComponent } from './components/create-workorder/create-workorder.component'
import { AddUsersComponent } from './components/add-users/add-users.component'
import { MapRolesActivitiesComponent } from './components/map-roles-activities/map-roles-activities.component'
import { WorkorderPreviewComponent } from './components/workorder-preview/workorder-preview.component'
import { UsersListPopupComponent } from './dialogs/users-list-popup/users-list-popup.component'
import { MatStepperModule } from '@angular/material/stepper'
import { MatLegacyInputModule } from '@angular/material/legacy-input'
import { SharedTableModule } from '../../../../common/shared-table/shared-table.module'
import { MatLegacyTabsModule } from '@angular/material/legacy-tabs'


@NgModule({
  declarations: [
    WorkAllocationToolComponent,
    CreateWorkorderComponent,
    AddUsersComponent,
    MapRolesActivitiesComponent,
    WorkorderPreviewComponent,
    UsersListPopupComponent
  ],
  imports: [
    CommonModule,
    MatLegacyInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatLegacyFormFieldModule,
    WorkAllocationToolV2RoutingModule,
    MatLegacyButtonModule,
    MatLegacyCardModule,
    MatIconModule,
    MatLegacySelectModule,
    MatLegacyRadioModule,
    MatLegacyPaginatorModule,
    MatStepperModule,
    SharedTableModule,
    MatLegacyTabsModule

  ]
})
export class WorkAllocationToolV2Module { }
