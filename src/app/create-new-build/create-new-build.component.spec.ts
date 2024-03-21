import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewBuildComponent } from './create-new-build.component';

describe('CreateNewBuildComponent', () => {
  let component: CreateNewBuildComponent;
  let fixture: ComponentFixture<CreateNewBuildComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNewBuildComponent]
    });
    fixture = TestBed.createComponent(CreateNewBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
