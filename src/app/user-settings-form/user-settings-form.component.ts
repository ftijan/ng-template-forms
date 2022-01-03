import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from '../data/data.service';
import { UserSettings } from '../data/user-settings';

@Component({
  selector: 'ngtf-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit, OnDestroy {
  originalUserSettings: UserSettings = {
    name: 'Milton',
    emailOffers: true,
    interfaceStyle: 'dark',
    subscriptionType: 'Annual',
    notes: 'here are some notes...'
  }

  // Prevent overwriting original data on cancel or back navigation.
  // Would need deep cloning on highly nested data hierarchy:
  userSettings: UserSettings = { ...this.originalUserSettings };

  sub: Subscription | undefined;
  public postError = false;
  public postErrorMessage = '';

  constructor(private dataService: DataService) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onSubmit(form: NgForm) {
    console.log('in onSubmit: ', form.valid);

    this.postError = false;
    this.postErrorMessage = '';

    if(form.valid) {
      this.sub = this.dataService.postUserSettingsForm(this.userSettings).subscribe({
        next: userSettings => console.log('success: ', userSettings),
        error: errorResponse => this.onHttpError(errorResponse)     
      });
    } else {
      this.postError = true;
      this.postErrorMessage = 'Please fix above errors';
    }    
  }

  onBlur(field: NgModel) {
    console.log('in onBlur: ', field.valid);
  }

  onHttpError(errorResponse: any) {    
    console.error('error: ', errorResponse);    
    this.postError = true;
    this.postErrorMessage = errorResponse.message;
  }
}
