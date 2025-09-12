import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedTableComponent } from './shared-table/shared-table.component'
import { MatTableModule } from '@angular/material/table'
import { MatLegacyPaginatorModule } from '@angular/material/legacy-paginator'
import { MatSortModule } from '@angular/material/sort'
import { ReactiveFormsModule } from '@angular/forms'
import { MatLegacyCheckboxModule } from '@angular/material/legacy-checkbox'
import { MatLegacyTooltipModule } from '@angular/material/legacy-tooltip'
import { MatIconModule } from '@angular/material/icon'
import { MatLegacyRadioModule } from '@angular/material/legacy-radio'
import { MatLegacyMenuModule } from '@angular/material/legacy-menu'



@NgModule({
  declarations: [
    SharedTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatLegacyPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    MatLegacyCheckboxModule,
    MatLegacyTooltipModule,
    MatIconModule,
    MatLegacyRadioModule,
    MatLegacyMenuModule
  ],
  exports: [
    SharedTableComponent
  ]
})
export class SharedTableModule { }
