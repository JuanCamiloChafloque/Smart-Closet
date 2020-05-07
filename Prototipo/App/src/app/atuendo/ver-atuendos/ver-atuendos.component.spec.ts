import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAtuendosComponent } from './ver-atuendos.component';

describe('VerAtuendosComponent', () => {
  let component: VerAtuendosComponent;
  let fixture: ComponentFixture<VerAtuendosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerAtuendosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerAtuendosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
