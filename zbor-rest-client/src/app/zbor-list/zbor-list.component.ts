import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ZborService, Zbor } from '../zbor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zbor-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './zbor-list.component.html'
})
export class ZborListComponent implements OnInit {
  zboruri: Zbor[] = [];
  destinatie = '';
  dataPlecarii = '';
  newZborNotifications: Zbor[] = [];

  constructor(
    private service: ZborService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.loadAll();

    this.service.subscribeNewZbor().subscribe(newZbor => {
      this.zone.run(() => {
        console.log('New Zbor pushed to UI:', newZbor);
        this.zboruri = [...this.zboruri, newZbor];
        this.newZborNotifications = [...this.newZborNotifications, newZbor];
        this.cdr.detectChanges();
      });
    });
  }

  loadAll() {
    if (this.destinatie && this.dataPlecarii) {
      this.service.filter(this.destinatie, this.dataPlecarii)
        .subscribe(data => {
          this.zone.run(() => {
            this.zboruri = data;
            this.cdr.detectChanges();
          });
        });
    } else {
      this.service.getAll().subscribe(data => {
        this.zone.run(() => {
          this.zboruri = data;
          this.cdr.detectChanges();
        });
      });
    }
  }

  forceUpdate() {
    this.zone.run(() => {
      this.cdr.detectChanges();
    });
  }
}
