import { StepperSelectionEvent } from '@angular/cdk/stepper'
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core'
import { MatStepper } from '@angular/material/stepper'
import { Router } from '@angular/router'

@Component({
  selector: 'ws-app-create-workorder',
  templateUrl: './create-workorder.component.html',
  styleUrls: ['./create-workorder.component.scss']
})
export class CreateWorkorderComponent implements OnInit, AfterViewInit {
  //#region (properties)
  @ViewChild(MatStepper) stepper: MatStepper | undefined

  currentStepperIndex = 0
  selectedStepperLabel = 'Add Users'
  //#endregion (properties)

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  //#region (Initialization)
  ngOnInit() {

  }

  ngAfterViewInit() {
    if (this.stepper) {
      this.stepper._getIndicatorType = () => 'number'
      this.cdr.detectChanges()
    }
  }
  //#endregion (Initialization)

  //#region (interaction)
  moveToNextForm() {

  }

  onSelectionChange(event: StepperSelectionEvent) {
    this.currentStepperIndex = event.selectedIndex
    if (this.stepper) {
      const selectedStep = this.stepper.steps.toArray()[this.currentStepperIndex]
      this.selectedStepperLabel = selectedStep.label
      this.cdr.detectChanges()
    }
  }

  openConfirmationPopup() {
    this.navigateBackToWorkAllocation()
  }

  navigateBackToWorkAllocation() {
    this.router.navigate(['/app/home/work-allocation'])
  }
  //#endregion (interaction)

}
