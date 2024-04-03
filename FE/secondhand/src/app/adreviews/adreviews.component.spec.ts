import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdreviewsComponent } from './adreviews.component';

describe('AdreviewsComponent', () => {
  let component: AdreviewsComponent;
  let fixture: ComponentFixture<AdreviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdreviewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdreviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
