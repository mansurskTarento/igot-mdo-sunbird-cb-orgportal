import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

const API_END_POINTS = {
  GET_PUBLISHED_WAT_LIST: '/api/wat/published',
  GET_DRAFTED_WAT_LIST: '/api/wat/drafted',
  GET_ARCHIVED_WAT_LIST: '/api/wat/archived',
  GET_UNDER_REVIEW_WAT_LIST: '/api/wat/under-review',
  GET_TO_BE_SIGNED_WAT_LIST: '/api/wat/to-be-signed',
}

@Injectable({
  providedIn: 'root'
})
export class WatService {

  constructor(
    private http: HttpClient,
  ) { }

  getPublishedWATList() {
    return this.http.get(API_END_POINTS.GET_PUBLISHED_WAT_LIST)
  }
}
