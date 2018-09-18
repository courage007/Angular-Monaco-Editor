import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularMonacoEditorComponent } from './angular-monaco-editor.component';

describe('AngularMonacoEditorComponent', () => {
  let component: AngularMonacoEditorComponent;
  let fixture: ComponentFixture<AngularMonacoEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularMonacoEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularMonacoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
