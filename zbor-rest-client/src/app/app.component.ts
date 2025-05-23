import { Component } from '@angular/core';
import { ZborCreateComponent } from './zbor-create/zbor-create.component';
import { ZborListComponent } from './zbor-list/zbor-list.component';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <app-zbor-create></app-zbor-create>
      <app-zbor-list></app-zbor-list>
    </div>
  `,
  imports: [ZborCreateComponent, ZborListComponent]
})
export class AppComponent {}
