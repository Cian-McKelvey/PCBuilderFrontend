import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchAllBuildsComponent } from './fetch-all-builds.component';

describe('FetchAllBuildsComponent', () => {
  let component: FetchAllBuildsComponent;
  let fixture: ComponentFixture<FetchAllBuildsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FetchAllBuildsComponent]
    });
    fixture = TestBed.createComponent(FetchAllBuildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
