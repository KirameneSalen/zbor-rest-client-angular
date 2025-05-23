import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZborListComponent } from './zbor-list.component';

describe('ZborListComponent', () => {
  let component: ZborListComponent;
  let fixture: ComponentFixture<ZborListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZborListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZborListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
