import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserreportingsComponent } from './userreportings.component';

describe('UserreportingsComponent', () => {
  let component: UserreportingsComponent;
  let fixture: ComponentFixture<UserreportingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserreportingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserreportingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
