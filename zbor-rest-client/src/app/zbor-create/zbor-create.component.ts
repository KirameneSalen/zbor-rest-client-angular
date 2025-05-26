import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ZborService } from '../zbor.service';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-zbor-create',
  template: `
    <h2>Create Zbor</h2>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <label>Destinatie: <input formControlName="destinatie"></label><br>
      <label>Data: <input type="date" formControlName="dataPlecarii"></label><br>
      <label>Ora: <input formControlName="oraPlecarii" type="time"></label><br>
      <label>Aeroport: <input formControlName="aeroport"></label><br>
      <label>Locuri disponibile: <input type="number" formControlName="nrLocuriDisponibile"></label><br>
      <button type="submit" [disabled]="form.invalid">Create</button>
    </form>
  `,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ZborCreateComponent {
  form;

  constructor(private fb: FormBuilder, private service: ZborService) {
    this.form = this.fb.group({
      destinatie: ['', Validators.required],
      dataPlecarii: ['', Validators.required],
      oraPlecarii: ['', Validators.required],
      aeroport: ['', Validators.required],
      nrLocuriDisponibile: [0, Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      const cleanData = {
        ...this.form.value,
        destinatie: this.form.value.destinatie ?? '',
        dataPlecarii: new DatePipe('en-US').transform(this.form.value.dataPlecarii, 'dd/MM/yyyy') ?? '',
        oraPlecarii: this.form.value.oraPlecarii ?? '',
        aeroport: this.form.value.aeroport ?? '',
        nrLocuriDisponibile: this.form.value.nrLocuriDisponibile ?? 0
      };
      this.service.create(cleanData).subscribe(z => {
        console.log('Created', z);
        this.form.reset();
      });
    }
  }
}