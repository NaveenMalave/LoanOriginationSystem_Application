import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingdetailsComponent } from './existingdetails.component';

describe('ExistingdetailsComponent', () => {
  let component: ExistingdetailsComponent;
  let fixture: ComponentFixture<ExistingdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExistingdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
