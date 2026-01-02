import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProjectComponent } from './project.component';

describe('ProjectComponent', () => {
  let fixture: ComponentFixture<ProjectComponent>;
  let component: ProjectComponent;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectComponent, HttpClientTestingModule]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch projects on init with auth header', () => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => (key === 'token' ? 'token123' : null));

    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit

    const req = httpMock.expectOne('http://localhost:3000/projects');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token123');

    req.flush([
      { id: 1, name: 'Project A' },
      { id: 2, name: 'Project B' }
    ]);

    expect(component.projects.length).toBe(2);
    expect(component.projects[0].name).toBe('Project A');
    expect(component.loading).toBeFalse();
    expect(component.errorMessage).toBe('');
  });

  it('should render projects in the template after a successful fetch', () => {
    spyOn(localStorage, 'getItem').and.returnValue('token123');

    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const req = httpMock.expectOne('http://localhost:3000/projects');
    req.flush([
      { id: 1, name: 'Project A' },
      { id: 2, name: 'Project B' }
    ]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const items = Array.from(compiled.querySelectorAll('li')).map((li) =>
      li.textContent?.trim()
    );

    expect(items).toEqual(['1. Project A', '2. Project B']);
    expect(compiled.querySelector('.error')).toBeNull();
  });

  it('should surface an error message when the fetch fails', () => {
    spyOn(localStorage, 'getItem').and.returnValue('token123');

    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const req = httpMock.expectOne('http://localhost:3000/projects');
    expect(component.loading).toBeTrue();

    req.flush({ message: 'Unauthorized' }, { status: 401, statusText: 'Unauthorized' });
    fixture.detectChanges();

    expect(component.loading).toBeFalse();
    expect(component.errorMessage).toBe('Unauthorized');
    expect(component.projects).toEqual([]);

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.error')?.textContent).toContain('Unauthorized');
  });

  it('should set error when no token is present', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;

    component.fetchProjects();

    expect(component.errorMessage).toContain('Please login');
    httpMock.expectNone('http://localhost:3000/projects');
  });

  it('should pick a random project from the loaded projects', () => {
    spyOn(localStorage, 'getItem').and.returnValue('token123');

    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const req = httpMock.expectOne('http://localhost:3000/projects');
    req.flush([
      { id: 1, name: 'Project A' },
      { id: 2, name: 'Project B' },
      { id: 3, name: 'Project C' }
    ]);

    component.getRandomProject();

    expect(component.randomProject).toMatch(/Project A|Project B|Project C/);
  });

  it('should show "No projects available" when picking random from empty list', () => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    component.projects = [];

    component.getRandomProject();

    expect(component.randomProject).toBe('No projects available');
  });
});
