import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSavedComponent } from './list-saved.component';

describe('ListSavedComponent', () => {
  let component: ListSavedComponent;
  let fixture: ComponentFixture<ListSavedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSavedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
