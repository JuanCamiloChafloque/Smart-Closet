import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VestidosComponent } from './vestidos.component';

describe('VestidosComponent', () => {
  let component: VestidosComponent;
  let fixture: ComponentFixture<VestidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VestidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VestidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
