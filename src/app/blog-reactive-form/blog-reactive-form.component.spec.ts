import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogReactiveFormComponent } from './blog-reactive-form.component';

describe('BlogReactiveFormComponent', () => {
  let component: BlogReactiveFormComponent;
  let fixture: ComponentFixture<BlogReactiveFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogReactiveFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
