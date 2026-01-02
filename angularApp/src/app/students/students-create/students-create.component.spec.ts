import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsCreateComponent } from './students-create.component';

describe('StudentsCreateComponent', () => {
  let component: StudentsCreateComponent;
  let fixture: ComponentFixture<StudentsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
