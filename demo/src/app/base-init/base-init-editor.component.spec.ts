import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseInitEditorComponent } from './base-init-editor.component';

describe('BaseInitEditorComponent', () => {
  let component: BaseInitEditorComponent;
  let fixture: ComponentFixture<BaseInitEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseInitEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseInitEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
