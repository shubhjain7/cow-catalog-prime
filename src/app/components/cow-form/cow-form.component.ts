
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CowService } from '../../services/cow.service';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from '@ngx-formly/core';
import { CommonModule } from '@angular/common';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';

@Component({
  selector: 'app-cow-form',
  imports: [CommonModule, FormsModule,FormlyModule,FormlyPrimeNGModule,ReactiveFormsModule],
  templateUrl: './cow-form.component.html',
  styleUrls: ['./cow-form.component.scss']
})
export class CowFormComponent {

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    { key: 'id', type: 'input', templateOptions: { label: 'Ear Tag', required: true } },
    { key: 'sex', type: 'select', templateOptions: {
        label: 'Sex', required: true,
        options: [
          { label: 'Male', value: 'Male' },
          { label: 'Female', value: 'Female' }
        ]
      }
    },
    { key: 'pen', type: 'input', templateOptions: { label: 'Pen', required: true } },
    { key: 'status', type: 'select', templateOptions: {
        label: 'Status', required: true,
        options: [
          { label: 'Active', value: 'Active' },
          { label: 'In Treatment', value: 'In Treatment' },
          { label: 'Deceased', value: 'Deceased' }
        ]
      }
    },
    { key: 'weight', type: 'input', templateOptions: { type: 'number', label: 'Weight' } },
    {
      template: '<hr><strong>Event Details</strong>'
    },
    { key: 'eventType', type: 'input', templateOptions: { label: 'Event Type', required: true }},
    { key: 'eventDate', type: 'input', templateOptions: { type: 'date', label: 'Event Date', required: true }},
    { key: 'eventDetails', type: 'input', templateOptions: { label: 'Event Details' }}
  ];

  constructor(private cowService: CowService, private router: Router) {}

  submit() {
    console.log(this.form);
    if (this.form.valid) {
      const value = this.model;
      const cow = {
        id: value.id,
        sex: value.sex,
        pen: value.pen,
        status: value.status,
        weight: value.weight,
        lastEventDate: value.eventDate,
        events: [{
          type: value.eventType,
          date: value.eventDate,
          details: value.eventDetails
        }]
      };
      this.cowService.addCow(cow);
      this.router.navigate(['/']);
    }
  }

  goBack(){
    this.router.navigate(['/']);
  }
}
