import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { WorkAllocationToolComponent } from './components/work-allocation-tool/work-allocation-tool.component'
import { CreateWorkorderComponent } from './components/create-workorder/create-workorder.component'

const routes: Routes = [
  {
    path: '',
    component: WorkAllocationToolComponent,
    pathMatch: 'full',
  }, {
    path: 'create-workorder',
    component: CreateWorkorderComponent,
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkAllocationToolV2RoutingModule { }
