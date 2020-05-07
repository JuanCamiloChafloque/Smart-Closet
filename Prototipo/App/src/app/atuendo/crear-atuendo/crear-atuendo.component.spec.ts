import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAtuendoComponent } from './crear-atuendo.component';

describe('CrearAtuendoComponent', () => {
  let component: CrearAtuendoComponent;
  let fixture: ComponentFixture<CrearAtuendoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearAtuendoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAtuendoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
