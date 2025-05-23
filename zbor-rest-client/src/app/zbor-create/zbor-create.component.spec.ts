import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZborCreateComponent } from './zbor-create.component';

describe('ZborCreateComponent', () => {
  let component: ZborCreateComponent;
  let fixture: ComponentFixture<ZborCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZborCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZborCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
