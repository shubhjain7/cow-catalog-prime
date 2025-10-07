import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CowSearchComponent } from './cow-search.component';

describe('CowSearchComponent', () => {
  let component: CowSearchComponent;
  let fixture: ComponentFixture<CowSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CowSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CowSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
