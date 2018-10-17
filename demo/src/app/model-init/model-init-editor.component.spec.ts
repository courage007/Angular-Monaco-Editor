import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelInitEditorComponent } from './model-init-editor.component';

describe('ModelInitEditorComponent', () => {
  let component: ModelInitEditorComponent;
  let fixture: ComponentFixture<ModelInitEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelInitEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelInitEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
