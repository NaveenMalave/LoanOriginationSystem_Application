import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewallapplicationsComponent } from './viewallapplications.component';

describe('ViewallapplicationsComponent', () => {
  let component: ViewallapplicationsComponent;
  let fixture: ComponentFixture<ViewallapplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewallapplicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewallapplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
