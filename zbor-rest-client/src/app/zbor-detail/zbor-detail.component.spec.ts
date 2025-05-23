import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZborDetailComponent } from './zbor-detail.component';

describe('ZborDetailComponent', () => {
  let component: ZborDetailComponent;
  let fixture: ComponentFixture<ZborDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZborDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZborDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
