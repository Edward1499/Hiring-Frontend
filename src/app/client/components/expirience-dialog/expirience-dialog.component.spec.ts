import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpirienceDialogComponent } from './expirience-dialog.component';

describe('ExpirienceDialogComponent', () => {
  let component: ExpirienceDialogComponent;
  let fixture: ComponentFixture<ExpirienceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpirienceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpirienceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
