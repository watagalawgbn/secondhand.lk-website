import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratordashboardComponent } from './moderatordashboard.component';

describe('ModeratordashboardComponent', () => {
  let component: ModeratordashboardComponent;
  let fixture: ComponentFixture<ModeratordashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModeratordashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModeratordashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
