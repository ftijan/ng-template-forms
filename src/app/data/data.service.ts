import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserSettings } from './user-settings';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Uses the PutsReq service
  private putsReqMockUri = "https://putsreq.com/XE4KH2ggPxFa7UojgoGo";

  constructor(private http: HttpClient) { }

  getSubscriptionTypes(): Observable<string[]> {
    return of(['Annual', 'Monthly', 'Lifetime']);
  }

  postUserSettingsForm(userSettings: UserSettings): Observable<any> {
    return this.http.post(this.putsReqMockUri, userSettings);
    //return of(userSettings);
  }
}
