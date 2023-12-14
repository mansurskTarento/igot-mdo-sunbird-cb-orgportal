import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core'
import { TrainingPlanDataSharingService } from '../../services/training-plan-data-share.service'
@Component({
  selector: 'ws-app-standard-card',
  templateUrl: './standard-card.component.html',
  styleUrls: ['./standard-card.component.scss'],
})
export class StandardCardComponent implements OnInit {
  @Input() cardSize: any
  @Input() checkboxVisibility: any = true
  @Input() contentData: any[] = [];
  @Input() showDeleteFlag = false;
  @Output() handleSelectedChips = new EventEmitter();
  selectedContent: any[] = [];
  constructor(private trainingPlanDataSharingService: TrainingPlanDataSharingService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log('contentData', this.contentData)
  }

  selectContentItem(event: any, item: any) {
    if (event.checked) {
      // this.selectedContent.push(item);
      this.trainingPlanDataSharingService.trainingPlanContentData.data.content.map((sitem: any, index: any) => {
        if (sitem.identifier === item.identifier) {
          sitem['selected'] = true
          this.trainingPlanDataSharingService.trainingPlanContentData.data.content.splice(index, 1)
          this.trainingPlanDataSharingService.trainingPlanContentData.data.content.unshift(sitem)
        }
      })

      if (this.trainingPlanDataSharingService.trainingPlanStepperData['contentList']) {
        this.trainingPlanDataSharingService.trainingPlanStepperData['contentList'].push(item.identifier)
      }

    } else {
      // this.selectedContent = this.selectedContent.filter( sitem  => sitem.identifier !== item.identifier)
      this.trainingPlanDataSharingService.trainingPlanContentData.data.content.map((sitem: any) => {
        if (sitem.identifier === item.identifier) {
          sitem['selected'] = false
        }
      })
      this.trainingPlanDataSharingService.trainingPlanStepperData['contentList'].filter((identifier: any, index: any) => {
        if (identifier === item.identifier) {
          this.trainingPlanDataSharingService.trainingPlanStepperData['contentList'].splice(index, 1)
        }
      })
    }
    console.log(' this.trainingPlanDataSharingService.trainingPlanStepperData', this.trainingPlanDataSharingService.trainingPlanStepperData)
    this.handleSelectedChips.emit(true)
  }

  deleteItem(item:any) {
    console.log('item', item);
    this.trainingPlanDataSharingService.trainingPlanContentData.data.content.map((sitem: any) => {
      if (sitem.identifier === item.identifier) {
        sitem['selected'] = false
      }
    })
    this.contentData.filter((sitem: any, index:any) => {
      if (sitem.identifier === item.identifier) {
        this.contentData.splice(index,1);
      }
    })
    console.log('result-->', this.trainingPlanDataSharingService.trainingPlanContentData.data.content);
    this.trainingPlanDataSharingService.trainingPlanStepperData['contentList'].filter((identifier: any, index: any) => {
      if (identifier === item.identifier) {
        this.trainingPlanDataSharingService.trainingPlanStepperData['contentList'].splice(index, 1)
      }
    })
  }

}