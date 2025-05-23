import { Component, Input, OnChanges } from '@angular/core';
import { ZborService, Zbor } from '../zbor.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zbor-detail',
  templateUrl: './zbor-detail.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ZborDetailComponent implements OnChanges {
  @Input() id!: number;
  zbor?: Zbor;

  constructor(private service: ZborService) {}

  ngOnChanges() {
    if (this.id) {
      this.service.getById(this.id).subscribe(z => this.zbor = z);
    }
  }
}