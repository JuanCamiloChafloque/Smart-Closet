import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmarioComponent } from './armario.component';

describe('ArmarioComponent', () => {
  let component: ArmarioComponent;
  let fixture: ComponentFixture<ArmarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArmarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
