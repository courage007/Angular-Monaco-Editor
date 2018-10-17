import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitEditorComponent } from './init-editor.component';

describe('InitEditorComponent', () => {
  let component: InitEditorComponent;
  let fixture: ComponentFixture<InitEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
