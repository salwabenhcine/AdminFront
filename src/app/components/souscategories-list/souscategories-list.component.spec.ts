import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SouscategoriesListComponent } from './souscategories-list.component';

describe('SouscategoriesListComponent', () => {
  let component: SouscategoriesListComponent;
  let fixture: ComponentFixture<SouscategoriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SouscategoriesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SouscategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
