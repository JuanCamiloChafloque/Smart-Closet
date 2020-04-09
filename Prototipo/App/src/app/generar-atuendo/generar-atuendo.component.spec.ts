import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarAtuendoComponent } from './generar-atuendo.component';

describe('GenerarAtuendoComponent', () => {
  let component: GenerarAtuendoComponent;
  let fixture: ComponentFixture<GenerarAtuendoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarAtuendoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarAtuendoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
