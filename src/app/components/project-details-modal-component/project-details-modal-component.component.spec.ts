import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsModalComponentComponent } from './project-details-modal-component.component';

describe('ProjectDetailsModalComponentComponent', () => {
  let component: ProjectDetailsModalComponentComponent;
  let fixture: ComponentFixture<ProjectDetailsModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetailsModalComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDetailsModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
