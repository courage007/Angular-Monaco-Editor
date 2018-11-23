import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoEditorsComponent } from './two-editors.component';

describe('TwoEditorsComponent', () => {
  let component: TwoEditorsComponent;
  let fixture: ComponentFixture<TwoEditorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoEditorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoEditorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
