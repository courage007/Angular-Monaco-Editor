import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatInitEditorComponent } from './format-init-editor.component';

describe('FormatInitEditorComponent', () => {
  let component: FormatInitEditorComponent;
  let fixture: ComponentFixture<FormatInitEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormatInitEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatInitEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
