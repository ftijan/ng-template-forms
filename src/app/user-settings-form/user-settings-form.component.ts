import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { UserSettings } from '../data/user-settings';

@Component({
  selector: 'ngtf-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {
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

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log('in onSubmit: ', form.valid);
  }

  onBlur(field: NgModel) {
    console.log('in onBlur: ', field.valid);
  }
}
